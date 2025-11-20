import fs from "fs";
import path from "path";
import { type NextRequest, NextResponse } from "next/server";

const dataDir = path.join(process.cwd(), "data");
const visitorsDataFile = path.join(dataDir, "visitors.json");

// Получение существующих данных
function getExistingData() {
  if (!fs.existsSync(visitorsDataFile)) {
    return [];
  }
  const fileContent = fs.readFileSync(visitorsDataFile, "utf-8");
  return JSON.parse(fileContent);
}

// Сохранение данных
function saveData(data: unknown[]) {
  fs.writeFileSync(visitorsDataFile, JSON.stringify(data, null, 2), "utf-8");
}

// Обновление данных посетителя
export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      visitorId: string;
      timeOnSite?: number;
      clicks?: number;
      conversions?: string[];
      pagesViewed?: number;
      clickEvents?: Array<{ element: string; type: string; timestamp: string }>;
      conversionEvents?: Array<{ type: string; data?: Record<string, unknown>; timestamp: string }>;
    };

    if (!body.visitorId) {
      return NextResponse.json({ error: "visitorId обязателен" }, { status: 400 });
    }

    const visitors = getExistingData();
    const visitorIndex = visitors.findIndex((v: { id: string }) => v.id === body.visitorId);

    if (visitorIndex === -1) {
      return NextResponse.json({ error: "Посетитель не найден" }, { status: 404 });
    }

    const visitor = visitors[visitorIndex] as {
      id: string;
      timeOnSite?: number;
      clicks?: number;
      conversions?: string[];
      pagesViewed?: number;
      clickEvents?: Array<{ element: string; type: string; timestamp: string }>;
      conversionEvents?: Array<{ type: string; data?: Record<string, unknown>; timestamp: string }>;
      behaviorUpdatedAt?: string;
    };

    // Обновляем данные
    if (body.timeOnSite !== undefined) {
      visitor.timeOnSite = Math.max(visitor.timeOnSite || 0, body.timeOnSite);
    }
    if (body.clicks !== undefined) {
      visitor.clicks = body.clicks;
    }
    if (body.conversions) {
      visitor.conversions = [...new Set([...(visitor.conversions || []), ...body.conversions])];
    }
    if (body.pagesViewed !== undefined) {
      visitor.pagesViewed = body.pagesViewed;
    }
    if (body.clickEvents) {
      visitor.clickEvents = [...(visitor.clickEvents || []), ...body.clickEvents];
    }
    if (body.conversionEvents) {
      visitor.conversionEvents = [...(visitor.conversionEvents || []), ...body.conversionEvents];
    }
    visitor.behaviorUpdatedAt = new Date().toISOString();

    visitors[visitorIndex] = visitor;
    saveData(visitors);

    // Если есть новые конверсии, отправляем обновление в Telegram
    if (body.conversionEvents && body.conversionEvents.length > 0) {
      await sendConversionUpdate(visitor, body.conversionEvents);
    }

    return NextResponse.json({
      success: true,
      visitor: {
        id: visitor.id,
        timeOnSite: visitor.timeOnSite,
        clicks: visitor.clicks,
        conversions: visitor.conversions,
        pagesViewed: visitor.pagesViewed,
      },
    });
  } catch (error) {
    console.error("Update visitor error:", error);
    return NextResponse.json({ error: "Внутренняя ошибка сервера" }, { status: 500 });
  }
}

// Отправка обновления о конверсии в Telegram
async function sendConversionUpdate(
  visitor: {
    id: string;
    city?: string;
    country?: string;
    page?: string;
    utm_source?: string;
    utm_campaign?: string;
  },
  conversionEvents: Array<{ type: string; data?: Record<string, unknown>; timestamp: string }>
) {
  const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    return;
  }

  const conversions = conversionEvents
    .map((e) => {
      if (e.type.startsWith("form_")) {
        return `📝 Заполнил форму: ${e.type.replace("form_", "")}`;
      }
      if (e.type === "quiz_completed") {
        return "🎯 Прошел квиз";
      }
      if (e.type === "cta_clicked") {
        return `🖱️ Кликнул CTA: ${e.data?.element || "кнопка"}`;
      }
      return `✅ Конверсия: ${e.type}`;
    })
    .join("\n");

  const message = `
🎉 <b>Конверсия на сайте!</b>

👤 <b>Посетитель:</b>
📍 ${visitor.city || "Unknown"}, ${visitor.country || "Unknown"}
📄 Страница: ${visitor.page || "/"}

${conversions}

⏱ Время: ${new Date(conversionEvents[0].timestamp).toLocaleString("ru-RU", { timeZone: "Asia/Almaty" })}
  `.trim();

  try {
    await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: "HTML",
      }),
    });
  } catch (error) {
    console.error("Telegram send error:", error);
  }
}
