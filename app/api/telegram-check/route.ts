import { NextResponse } from "next/server";

/**
 * Тестовый endpoint для проверки конфигурации Telegram
 * Используйте: GET /api/telegram-check
 */
export async function GET() {
  const hasToken = !!process.env.TELEGRAM_BOT_TOKEN;
  const hasChatId = !!process.env.TELEGRAM_CHAT_ID;
  const tokenLength = process.env.TELEGRAM_BOT_TOKEN?.length || 0;
  const chatIdValue = process.env.TELEGRAM_CHAT_ID || "not set";

  // Проверяем формат токена (обычно начинается с цифр и содержит двоеточие)
  const tokenFormatValid = hasToken && /^\d+:[A-Za-z0-9_-]+$/.test(process.env.TELEGRAM_BOT_TOKEN || "");

  return NextResponse.json(
    {
      configured: hasToken && hasChatId,
      details: {
        hasToken,
        hasChatId,
        tokenLength,
        tokenFormatValid,
        chatIdValue: chatIdValue.length > 20 ? `${chatIdValue.substring(0, 10)}...` : chatIdValue,
      },
      message: hasToken && hasChatId
        ? "✅ Telegram настроен правильно"
        : "❌ Telegram не настроен. Установите TELEGRAM_BOT_TOKEN и TELEGRAM_CHAT_ID в переменных окружения",
      instructions: {
        vercel: "Settings → Environment Variables → Add",
        digitalocean: "App Settings → Environment Variables → Add",
        local: "Создайте файл .env.local с переменными",
      },
    },
    { status: 200 }
  );
}

