#!/usr/bin/env node

/**
 * Скрипт для отправки отчета из Yandex.Metrika в Telegram
 *
 * Использование:
 *   npx tsx scripts/send-yandex-report.ts
 *   npx tsx scripts/send-yandex-report.ts --date1=2025-01-01 --date2=2025-01-31
 */

const YANDEX_METRIKA_OAUTH_TOKEN = process.env.YANDEX_METRIKA_OAUTH_TOKEN;
const COUNTER_ID = process.env.NEXT_PUBLIC_YM_ID;
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

if (!YANDEX_METRIKA_OAUTH_TOKEN || !COUNTER_ID) {
  console.error("❌ Ошибка: Yandex.Metrika не настроен");
  console.error("   Добавьте в .env.local:");
  console.error("   YANDEX_METRIKA_OAUTH_TOKEN=ваш_токен");
  console.error("   NEXT_PUBLIC_YM_ID=ваш_id_счетчика");
  process.exit(1);
}

if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
  console.error("❌ Ошибка: Telegram не настроен");
  process.exit(1);
}

// Парсим аргументы командной строки
const args = process.argv.slice(2);
const date1 = args.find((arg) => arg.startsWith("--date1="))?.split("=")[1];
const date2 = args.find((arg) => arg.startsWith("--date2="))?.split("=")[1];

async function sendReport() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const url = `${baseUrl}/api/analytics/yandex`;

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        date1,
        date2,
        sendToTelegram: true,
      }),
    });

    const data = (await response.json()) as { success: boolean; error?: string; report?: string };

    if (data.success) {
      console.log("✅ Отчет успешно отправлен в Telegram!");
      if (data.report) {
        console.log("\n📊 Отчет:");
        console.log(data.report);
      }
    } else {
      console.error("❌ Ошибка:", data.error);
      process.exit(1);
    }
  } catch (error) {
    console.error("❌ Ошибка отправки отчета:", error);
    process.exit(1);
  }
}

sendReport();
