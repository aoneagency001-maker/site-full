import { NextResponse } from "next/server";

/**
 * Простой тестовый endpoint для проверки работы API
 * GET /api/track-visitor/test
 */
export async function GET() {
  const telegramToken = process.env.TELEGRAM_BOT_TOKEN;
  const telegramChatId = process.env.TELEGRAM_CHAT_ID;

  return NextResponse.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    telegram: {
      hasToken: !!telegramToken,
      hasChatId: !!telegramChatId,
      tokenLength: telegramToken?.length || 0,
      chatId: telegramChatId || "not set",
    },
    message: "API is working. Check telegram credentials above.",
  });
}

