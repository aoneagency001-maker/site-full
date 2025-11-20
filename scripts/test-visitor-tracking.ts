/**
 * Скрипт для тестирования системы отслеживания посетителей
 * Запуск: npx tsx scripts/test-visitor-tracking.ts
 *
 * Примечание: Переменные окружения должны быть установлены в системе
 * или загружены через .env.local (Next.js загружает их автоматически)
 */

// Попытка загрузить переменные окружения из .env.local (опционально)
try {
  // Если dotenv установлен, используем его
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const dotenv = require("dotenv");
  const path = require("path");
  dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });
  dotenv.config({ path: path.resolve(process.cwd(), ".env") });
} catch {
  // dotenv не установлен, используем переменные из окружения
  // Это нормально, если переменные установлены в системе или через Next.js
}

const API_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

async function testVisitorTracking() {
  console.log("🧪 Тестирование системы отслеживания посетителей\n");
  console.log(`📍 API URL: ${API_URL}\n`);

  // Проверка переменных окружения
  console.log("📋 Проверка переменных окружения:");
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken) {
    console.error("❌ TELEGRAM_BOT_TOKEN не установлен");
    return;
  } else {
    console.log("✅ TELEGRAM_BOT_TOKEN установлен");
  }

  if (!chatId) {
    console.error("❌ TELEGRAM_CHAT_ID не установлен");
    return;
  } else {
    console.log(`✅ TELEGRAM_CHAT_ID установлен: ${chatId}`);
  }

  console.log("\n📤 Отправка тестового запроса на отслеживание...\n");

  // Тестовые данные посетителя
  const testVisitorData = {
    page: "/",
    landingPage: "/",
    referrer: "https://google.com",
    screenResolution: "1920x1080",
    sessionId: `test-session-${Date.now()}`,
    utmSource: "test",
    utmCampaign: "test-campaign",
  };

  try {
    const response = await fetch(`${API_URL}/api/track-visitor`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
      body: JSON.stringify(testVisitorData),
    });

    const data = await response.json();

    console.log(`📥 Статус ответа: ${response.status}`);
    console.log(`📦 Данные ответа:`, JSON.stringify(data, null, 2));

    if (data.tracked) {
      console.log(
        "\n✅ Успешно! Посетитель отслежен и уведомление должно быть отправлено в Telegram"
      );
      console.log(`🆔 Visitor ID: ${data.visitorId}`);
    } else {
      console.log("\n❌ Посетитель не был отслежен");
      console.log(`📝 Причина: ${data.reason || "неизвестна"}`);
    }
  } catch (error) {
    console.error("\n❌ Ошибка при отправке запроса:", error);
    if (error instanceof Error) {
      console.error("Сообщение:", error.message);
    }
  }

  // Проверка сохраненных данных
  console.log("\n📊 Проверка сохраненных данных...");
  try {
    const getResponse = await fetch(`${API_URL}/api/track-visitor`, {
      method: "GET",
    });

    const getData = await getResponse.json();
    if (getData.success) {
      console.log(`✅ Всего посетителей в базе: ${getData.count}`);
      if (getData.visitors && getData.visitors.length > 0) {
        const lastVisitor = getData.visitors[getData.visitors.length - 1];
        console.log(`📝 Последний посетитель:`, {
          id: lastVisitor.id,
          page: lastVisitor.page,
          city: lastVisitor.city,
          country: lastVisitor.country,
          timestamp: lastVisitor.timestamp,
        });
      }
    }
  } catch (error) {
    console.error("❌ Ошибка при получении данных:", error);
  }
}

// Запуск теста
testVisitorTracking()
  .then(() => {
    console.log("\n✅ Тест завершен");
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n❌ Критическая ошибка:", error);
    process.exit(1);
  });
