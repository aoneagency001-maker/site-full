import fs from "node:fs";
import path from "node:path";
import { type NextRequest, NextResponse } from "next/server";
import { sendToTelegram, formatContactMessage } from "@/lib/telegram";

// Создаем директорию для данных, если её нет
const dataDir = path.join(process.cwd(), "data");
const contactDataFile = path.join(dataDir, "contact-submissions.json");

// Инициализация файла с данными
function initDataFile() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  if (!fs.existsSync(contactDataFile)) {
    fs.writeFileSync(contactDataFile, JSON.stringify([]), "utf-8");
  }
}

// Получение существующих данных
function getExistingData() {
  initDataFile();
  const fileContent = fs.readFileSync(contactDataFile, "utf-8");
  return JSON.parse(fileContent);
}

// Сохранение новых данных
function saveData(data: Record<string, unknown>) {
  try {
    const existingData = getExistingData();
    existingData.push(data);
    fs.writeFileSync(contactDataFile, JSON.stringify(existingData, null, 2), "utf-8");
  } catch (error) {
    // На некоторых платформах файловая система может быть read-only
    // Это не критично - данные все равно отправляются в Telegram
    console.warn("[CONTACT] ⚠️ Could not save to file (may be read-only filesystem):", error);
    // Не бросаем ошибку, чтобы не блокировать отправку в Telegram
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Валидация обязательных полей
    if (!body.name || !body.message) {
      return NextResponse.json({ error: "Имя и сообщение обязательны" }, { status: 400 });
    }

    // Проверяем наличие хотя бы одного контакта (email или phone)
    if (!body.email && !body.phone) {
      return NextResponse.json({ error: "Укажите email или телефон" }, { status: 400 });
    }

    // Добавляем ID и timestamp
    const submission = {
      id: Date.now().toString(),
      ...body,
      type: "contact-form",
      submittedAt: new Date().toISOString(),
      ip: request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown",
      userAgent: request.headers.get("user-agent") || "unknown",
    };

    // Сохраняем в файл (JSON)
    saveData(submission);

    // Отправляем в Telegram
    const telegramMessage = formatContactMessage({
      name: body.name,
      email: body.email,
      phone: body.phone,
      message: body.message,
    });

    const telegramResult = await sendToTelegram(telegramMessage);

    if (!telegramResult.success) {
      console.error("Не удалось отправить в Telegram:", telegramResult.error);
      // Продолжаем работу даже если Telegram не работает
    }

    return NextResponse.json(
      {
        success: true,
        message: "Сообщение успешно отправлено",
        id: submission.id,
        telegramSent: telegramResult.success,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing contact submission:", error);
    return NextResponse.json({ error: "Внутренняя ошибка сервера" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const data = getExistingData();

    return NextResponse.json(
      {
        success: true,
        count: data.length,
        submissions: data,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching contact data:", error);
    return NextResponse.json({ error: "Внутренняя ошибка сервера" }, { status: 500 });
  }
}
