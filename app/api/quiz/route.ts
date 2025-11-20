import fs from "node:fs";
import path from "node:path";
import { type NextRequest, NextResponse } from "next/server";
import { sendToTelegram, formatQuizMessage } from "@/lib/telegram";

// Создаем директорию для данных, если её нет
const dataDir = path.join(process.cwd(), "data");
const quizDataFile = path.join(dataDir, "quiz-submissions.json");

// Инициализация файла с данными
function initDataFile() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  if (!fs.existsSync(quizDataFile)) {
    fs.writeFileSync(quizDataFile, JSON.stringify([]), "utf-8");
  }
}

// Получение существующих данных
function getExistingData() {
  initDataFile();
  const fileContent = fs.readFileSync(quizDataFile, "utf-8");
  return JSON.parse(fileContent);
}

// Сохранение новых данных
function saveData(data: {
  id: string;
  name: string;
  phone: string;
  email?: string;
  goal?: string;
  niche?: string;
  budget?: string;
  platforms?: string[];
  submittedAt: string;
  ip: string;
  userAgent: string;
}) {
  try {
    const existingData = getExistingData();
    existingData.push(data);
    fs.writeFileSync(quizDataFile, JSON.stringify(existingData, null, 2), "utf-8");
  } catch (error) {
    // На некоторых платформах файловая система может быть read-only
    // Это не критично - данные все равно отправляются в Telegram
    console.warn("[QUIZ] ⚠️ Could not save to file (may be read-only filesystem):", error);
    // Не бросаем ошибку, чтобы не блокировать отправку в Telegram
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Валидация обязательных полей
    if (!body.name || !body.phone) {
      return NextResponse.json({ error: "Имя и телефон обязательны" }, { status: 400 });
    }

    // Добавляем ID и timestamp
    const submission = {
      id: Date.now().toString(),
      ...body,
      submittedAt: new Date().toISOString(),
      ip: request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown",
      userAgent: request.headers.get("user-agent") || "unknown",
    };

    // Сохраняем в файл (JSON)
    saveData(submission);

    // Отправляем в Telegram
    const telegramMessage = formatQuizMessage({
      name: submission.name,
      phone: submission.phone,
      email: submission.email,
      answers: {
        Цель: submission.goal || "Не указана",
        Ниша: submission.niche || "Не указана",
        Бюджет: submission.budget || "Не указан",
        Платформы: submission.platforms?.join(", ") || "Не указаны",
      },
      estimatedBudget: submission.budget,
    });

    const telegramResult = await sendToTelegram(telegramMessage);

    if (!telegramResult.success) {
      console.error("Не удалось отправить в Telegram:", telegramResult.error);
      // Продолжаем работу даже если Telegram не работает
    }

    // TODO: В будущем можно добавить отправку в amoCRM
    // await sendToAmoCRM(submission);

    return NextResponse.json(
      {
        success: true,
        message: "Заявка успешно отправлена",
        id: submission.id,
        telegramSent: telegramResult.success,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing quiz submission:", error);
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
    console.error("Error fetching quiz data:", error);
    return NextResponse.json({ error: "Внутренняя ошибка сервера" }, { status: 500 });
  }
}
