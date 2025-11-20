// Telegram Bot Integration
// Отправка уведомлений в Telegram

interface TelegramMessage {
  chat_id: string;
  text: string;
  parse_mode?: 'HTML' | 'Markdown';
}

/**
 * Отправка сообщения в Telegram
 * @param message - Текст сообщения
 * @param chatId - ID чата (опционально, берется из env)
 */
export async function sendToTelegram(
  message: string,
  chatId?: string
): Promise<{ success: boolean; error?: string }> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const defaultChatId = process.env.TELEGRAM_CHAT_ID;
  
  const targetChatId = chatId || defaultChatId;

  if (!botToken) {
    console.error('TELEGRAM_BOT_TOKEN не установлен');
    return { success: false, error: 'Bot token не настроен' };
  }

  if (!targetChatId) {
    console.error('TELEGRAM_CHAT_ID не установлен');
    return { success: false, error: 'Chat ID не настроен' };
  }

  try {
    const telegramMessage: TelegramMessage = {
      chat_id: targetChatId,
      text: message,
      parse_mode: 'HTML',
    };

    const response = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(telegramMessage),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error('Ошибка отправки в Telegram:', data);
      return { 
        success: false, 
        error: data.description || 'Неизвестная ошибка' 
      };
    }

    return { success: true };
  } catch (error) {
    console.error('Ошибка при отправке в Telegram:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Неизвестная ошибка' 
    };
  }
}

/**
 * Форматирование сообщения о новой заявке с формы контактов
 */
export function formatContactMessage(data: {
  name: string;
  email: string;
  message: string;
  phone?: string;
}): string {
  return `
🆕 <b>Новая заявка с сайта!</b>

👤 <b>Имя:</b> ${escapeHtml(data.name)}
📧 <b>Email:</b> ${escapeHtml(data.email)}
${data.phone ? `📞 <b>Телефон:</b> ${escapeHtml(data.phone)}\n` : ''}
💬 <b>Сообщение:</b>
${escapeHtml(data.message)}

📅 Дата: ${new Date().toLocaleString('ru-RU', { timeZone: 'Asia/Almaty' })}
  `.trim();
}

/**
 * Форматирование сообщения о прохождении квиза
 */
export function formatQuizMessage(data: {
  name?: string;
  phone?: string;
  email?: string;
  answers: Record<string, unknown>;
  estimatedBudget?: string;
}): string {
  let message = '🎯 <b>Новый результат квиза!</b>\n\n';

  if (data.name) {
    message += `👤 <b>Имя:</b> ${escapeHtml(data.name)}\n`;
  }
  if (data.phone) {
    message += `📞 <b>Телефон:</b> ${escapeHtml(data.phone)}\n`;
  }
  if (data.email) {
    message += `📧 <b>Email:</b> ${escapeHtml(data.email)}\n`;
  }

  message += '\n<b>Ответы:</b>\n';
  for (const [question, answer] of Object.entries(data.answers)) {
    message += `• ${escapeHtml(question)}: ${escapeHtml(String(answer))}\n`;
  }

  if (data.estimatedBudget) {
    message += `\n💰 <b>Примерный бюджет:</b> ${escapeHtml(data.estimatedBudget)}`;
  }

  message += `\n\n📅 Дата: ${new Date().toLocaleString('ru-RU', { timeZone: 'Asia/Almaty' })}`;

  return message.trim();
}

/**
 * Экранирование HTML для безопасной отправки в Telegram
 */
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

