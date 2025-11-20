#!/usr/bin/env node

/**
 * Скрипт для отправки тестового уведомления в Telegram
 */

// Загрузка переменных окружения из .env.local
import { config } from 'dotenv';
import { resolve } from 'path';

config({ path: resolve(process.cwd(), '.env.local') });
config({ path: resolve(process.cwd(), '.env') });

const TELEGRAM_BOT_TOKEN_TEST = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID_TEST = process.env.TELEGRAM_CHAT_ID;

if (!TELEGRAM_BOT_TOKEN_TEST || !TELEGRAM_CHAT_ID_TEST) {
  console.error("❌ Ошибка: TELEGRAM_BOT_TOKEN и TELEGRAM_CHAT_ID не установлены");
  console.error("   Добавьте их в .env.local или передайте через переменные окружения");
  process.exit(1);
}

const message = `
🔔 <b>Тестовое уведомление!</b>

✅ Система отслеживания посетителей работает!

👤 <b>Информация:</b>
📍 Местоположение: Алматы, Казахстан
🌐 IP: 192.168.1.1
💻 Устройство: desktop (macOS 14.0)
🌍 Браузер: Chrome 120.0
📱 Разрешение: 1920x1080

🔗 <b>Источник:</b>
📊 Откуда: Прямой заход
🔎 UTM Source: нет
📢 UTM Campaign: нет

📄 <b>Поведение:</b>
📖 Страница: /
⏱ Время визита: ${new Date().toLocaleString("ru-RU", { timeZone: "Asia/Almaty" })}

🎉 Это тестовое сообщение для проверки работы системы!
`.trim();

async function sendTestNotification() {
  try {
    const response = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN_TEST}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID_TEST,
          text: message,
          parse_mode: "HTML",
        }),
      }
    );

    const data = (await response.json()) as { ok: boolean; description?: string };

    if (data.ok) {
      console.log("✅ Тестовое уведомление успешно отправлено в Telegram!");
    } else {
      console.error("❌ Ошибка отправки:", data.description || JSON.stringify(data, null, 2));
    }
  } catch (error) {
    console.error("❌ Ошибка:", error);
  }
}

sendTestNotification();
