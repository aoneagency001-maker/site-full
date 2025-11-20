#!/usr/bin/env node

/**
 * Скрипт для получения Chat ID из Telegram Bot API
 * Использование: npm run get-chat-id
 *
 * Перед запуском:
 * 1. Напишите вашему боту любое сообщение (например /start)
 * 2. Запустите этот скрипт
 */

const BOT_TOKEN =
  process.env.TELEGRAM_BOT_TOKEN || "8117404134:AAG_owRPtVGY5WDRzYlUK7y-uJJ8ak2MBWk";

async function getChatId() {
  try {
    const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/getUpdates`);
    const data = (await response.json()) as {
      ok: boolean;
      result: Array<{
        message?: {
          chat: {
            id: number;
            first_name?: string;
            username?: string;
            type: string;
          };
          text?: string;
        };
      }>;
    };

    if (!data.ok) {
      console.error("❌ Ошибка API:", data);
      return;
    }

    if (data.result.length === 0) {
      console.log(
        "⚠️  Пока нет сообщений. Напишите боту любое сообщение (например /start) и попробуйте снова."
      );
      return;
    }

    // Берем последнее сообщение
    const lastUpdate = data.result[data.result.length - 1];
    const chat = lastUpdate.message?.chat;

    if (!chat) {
      console.log("⚠️  Не найдено сообщений с chat ID");
      return;
    }

    console.log("\n✅ Chat ID найден!\n");
    console.log("📋 Информация:");
    console.log(`   Chat ID: ${chat.id}`);
    console.log(`   Имя: ${chat.first_name || "Не указано"}`);
    console.log(`   Username: @${chat.username || "Не указано"}`);
    console.log(`   Тип: ${chat.type}`);
    console.log(`   Текст сообщения: ${lastUpdate.message?.text || "Нет текста"}`);
    console.log("\n💾 Добавьте в .env.local:");
    console.log(`   TELEGRAM_BOT_TOKEN=${BOT_TOKEN}`);
    console.log(`   TELEGRAM_CHAT_ID=${chat.id}`);
    console.log("\n");
  } catch (error) {
    console.error("❌ Ошибка:", error);
  }
}

getChatId();
