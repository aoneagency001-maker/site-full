#!/usr/bin/env ts-node

/**
 * Тестовый скрипт для проверки отправки сообщений в Telegram
 * 
 * Использование:
 * 1. Добавьте TELEGRAM_BOT_TOKEN и TELEGRAM_CHAT_ID в .env.local
 * 2. Запустите: npm run test:telegram
 */

import { sendToTelegram, formatContactMessage, formatQuizMessage } from '../lib/telegram';

async function testTelegramIntegration() {
  console.log('🚀 Тестирование Telegram интеграции...\n');

  // Проверяем наличие переменных окружения
  if (!process.env.TELEGRAM_BOT_TOKEN) {
    console.error('❌ TELEGRAM_BOT_TOKEN не установлен в .env.local');
    process.exit(1);
  }

  if (!process.env.TELEGRAM_CHAT_ID) {
    console.error('❌ TELEGRAM_CHAT_ID не установлен в .env.local');
    process.exit(1);
  }

  console.log('✅ Переменные окружения найдены');
  console.log(`📱 Chat ID: ${process.env.TELEGRAM_CHAT_ID}\n`);

  // Тест 1: Простое сообщение
  console.log('Тест 1: Отправка простого сообщения...');
  const simpleResult = await sendToTelegram('🧪 Тестовое сообщение от AOneAgency.kz');
  
  if (simpleResult.success) {
    console.log('✅ Простое сообщение отправлено\n');
  } else {
    console.error('❌ Ошибка:', simpleResult.error);
    process.exit(1);
  }

  // Тест 2: Сообщение о заявке с формы
  console.log('Тест 2: Отправка сообщения о заявке с формы...');
  const contactMessage = formatContactMessage({
    name: 'Тестовый Клиент',
    email: 'test@example.com',
    phone: '+7 747 385 4493',
    message: 'Это тестовое сообщение для проверки интеграции с Telegram',
  });

  const contactResult = await sendToTelegram(contactMessage);
  
  if (contactResult.success) {
    console.log('✅ Сообщение о заявке отправлено\n');
  } else {
    console.error('❌ Ошибка:', contactResult.error);
    process.exit(1);
  }

  // Тест 3: Сообщение о прохождении квиза
  console.log('Тест 3: Отправка сообщения о прохождении квиза...');
  const quizMessage = formatQuizMessage({
    name: 'Тестовый Клиент',
    phone: '+7 747 385 4493',
    email: 'test@example.com',
    answers: {
      'Цель': 'Увеличение заявок',
      'Ниша': 'E-commerce',
      'Бюджет': 'От 200,000 ₸/месяц',
      'Платформы': 'Instagram, TikTok',
    },
    estimatedBudget: 'От 200,000 ₸/месяц',
  });

  const quizResult = await sendToTelegram(quizMessage);
  
  if (quizResult.success) {
    console.log('✅ Сообщение о квизе отправлено\n');
  } else {
    console.error('❌ Ошибка:', quizResult.error);
    process.exit(1);
  }

  console.log('🎉 Все тесты пройдены успешно!');
  console.log('✅ Telegram бот работает корректно');
}

// Запускаем тесты
testTelegramIntegration().catch((error) => {
  console.error('❌ Критическая ошибка:', error);
  process.exit(1);
});

