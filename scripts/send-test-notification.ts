#!/usr/bin/env node

/**
 * Скрипт для отправки тестового уведомления в Telegram
 */

const TELEGRAM_BOT_TOKEN =
  process.env.TELEGRAM_BOT_TOKEN || "8117404134:AAG_owRPtVGY5WDRzYlUK7y-uJJ8ak2MBWk";
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || "280192618";

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
    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: "HTML",
      }),
    });

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
