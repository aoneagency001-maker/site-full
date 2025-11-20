# 📱 Модуль отправки уведомлений в Telegram

## 📋 Содержание

1. [Общее описание](#общее-описание)
2. [Архитектура системы](#архитектура-системы)
3. [Компоненты и файлы](#компоненты-и-файлы)
4. [Взаимосвязи между компонентами](#взаимосвязи-между-компонентами)
5. [Технологии и зависимости](#технологии-и-зависимости)
6. [Логика работы](#логика-работы)
7. [Настройка и конфигурация](#настройка-и-конфигурация)
8. [Формат уведомлений](#формат-уведомлений)
9. [Примеры использования](#примеры-использования)
10. [Диагностика и отладка](#диагностика-и-отладка)

---

## 🎯 Общее описание

Модуль автоматически отслеживает посетителей сайта и отправляет уведомления в Telegram при каждом посещении. Система собирает максимальную информацию о посетителе: устройство, источник трафика (UTM-метки), IP-адрес, геолокацию, поведение на сайте.

### Основные возможности:

- ✅ **Отслеживание всех посетителей** (не только первых)
- ✅ **Фильтрация ботов** (исключение поисковых роботов и автоматизированных систем)
- ✅ **Сбор UTM-меток** для атрибуции трафика
- ✅ **Определение устройства** (мобильное/планшет/десктоп)
- ✅ **Геолокация по IP** (город, страна)
- ✅ **Интеграция с формами** (контактная форма, квиз)
- ✅ **Сохранение данных** в локальный JSON файл
- ✅ **Интеграция с аналитикой** (Yandex.Metrika, Google Analytics)

---

## 🏗️ Архитектура системы

```
┌─────────────────────────────────────────────────────────────┐
│                    КЛИЕНТСКАЯ ЧАСТЬ                         │
│  (Browser - React Component)                                │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ POST /api/track-visitor
                            ▼
┌─────────────────────────────────────────────────────────────┐
│              СЕРВЕРНАЯ ЧАСТЬ (Next.js API)                  │
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │  /api/track-visitor/route.ts                      │    │
│  │  - Валидация (боты, IP)                           │    │
│  │  - Парсинг User-Agent                             │    │
│  │  - Геолокация по IP                               │    │
│  │  - Сохранение в data/visitors.json                │    │
│  │  - Отправка в Telegram                             │    │
│  └────────────────────────────────────────────────────┘    │
│                            │                                │
│                            │ sendToTelegram()               │
│                            ▼                                │
│  ┌────────────────────────────────────────────────────┐    │
│  │  lib/telegram.ts                                   │    │
│  │  - sendToTelegram()                                │    │
│  │  - formatContactMessage()                          │    │
│  │  - formatQuizMessage()                             │    │
│  └────────────────────────────────────────────────────┘    │
│                            │                                │
│                            │ HTTP POST                      │
│                            ▼                                │
┌─────────────────────────────────────────────────────────────┐
│              TELEGRAM BOT API                               │
│  https://api.telegram.org/bot{TOKEN}/sendMessage            │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│              TELEGRAM ЧАТ                                    │
│  Уведомления о посетителях, формах, квизах                  │
└─────────────────────────────────────────────────────────────┘
```

---

## 📁 Компоненты и файлы

### 1. **Клиентский компонент**

**Файл:** `components/analytics/visitor-tracker.tsx`

**Назначение:** React-компонент, который работает в браузере и собирает данные о посетителе.

**Основные функции:**
- Генерация/получение `sessionId` из `sessionStorage`
- Сбор UTM-меток из URL
- Определение landing page
- Отслеживание посещенных страниц
- Отправка данных на сервер через `fetch()`
- Интеграция с Yandex.Metrika и Google Analytics
- Отслеживание кликов и конверсий

**Ключевые части кода:**

```typescript
// Генерация session ID
let sessionId = sessionStorage.getItem("session_id");
if (!sessionId) {
  sessionId = uuidv4();
  sessionStorage.setItem("session_id", sessionId);
}

// Сбор UTM-меток
const urlParams = new URLSearchParams(window.location.search);
const utmData = {
  utmSource: urlParams.get("utm_source"),
  utmMedium: urlParams.get("utm_medium"),
  utmCampaign: urlParams.get("utm_campaign"),
  utmTerm: urlParams.get("utm_term"),
  utmContent: urlParams.get("utm_content"),
};

// Отправка на сервер
fetch("/api/track-visitor", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(visitorData),
})
```

**Интеграция в приложение:**

Компонент подключается в корневом layout:

```typescript
// app/[locale]/layout.tsx
import { VisitorTracker } from "@/components/analytics/visitor-tracker";

export default async function LocaleLayout({ children, params }) {
  return (
    <body>
      <VisitorTracker />
      {children}
    </body>
  );
}
```

---

### 2. **API Route для отслеживания посетителей**

**Файл:** `app/api/track-visitor/route.ts`

**Назначение:** Серверный endpoint, который обрабатывает данные о посетителе и отправляет уведомления.

**Основные функции:**

#### 2.1. **Фильтрация ботов**

```typescript
const BOT_USER_AGENTS = [
  "googlebot", "bingbot", "yandexbot", "baiduspider",
  "facebookexternalhit", "twitterbot", "linkedinbot",
  "slackbot", "discordbot", "whatsapp", "telegrambot",
  "crawl", "spider", "bot", "headless", "phantom",
  "selenium", "puppeteer", "playwright", "webdriver",
  "curl", "wget", "python-requests", "go-http-client", "java/"
];

function isBot(userAgent: string): boolean {
  if (!userAgent) return true;
  const ua = userAgent.toLowerCase();
  const botPatterns = BOT_USER_AGENTS.filter((bot) => bot !== "http");
  return botPatterns.some((bot) => ua.includes(bot));
}
```

#### 2.2. **Геолокация по IP**

```typescript
async function getGeoLocation(ip: string) {
  try {
    const response = await fetch(`http://ip-api.com/json/${ip}?lang=ru`);
    const data = await response.json();
    if (data.status === "success") {
      return {
        country: data.country || "Unknown",
        city: data.city || "Unknown",
        region: data.regionName || "Unknown",
        timezone: data.timezone || "Unknown",
        isp: data.isp || "Unknown",
      };
    }
  } catch (error) {
    console.error("Geo location error:", error);
  }
  return { country: "Unknown", city: "Unknown", ... };
}
```

#### 2.3. **Парсинг User-Agent**

Используется библиотека `ua-parser-js`:

```typescript
import { UAParser } from "ua-parser-js";

const parser = new UAParser(userAgent);
const uaResult = parser.getResult();

const visitorData = {
  device: uaResult.device.type || "desktop",
  browser: `${uaResult.browser.name} ${uaResult.browser.version}`,
  os: `${uaResult.os.name} ${uaResult.os.version}`,
  // ...
};
```

#### 2.4. **Сохранение данных**

Данные сохраняются в локальный JSON файл:

```typescript
const dataDir = path.join(process.cwd(), "data");
const visitorsDataFile = path.join(dataDir, "visitors.json");

function saveData(data: unknown) {
  try {
    const existingData = getExistingData();
    existingData.push(data);
    fs.writeFileSync(visitorsDataFile, JSON.stringify(existingData, null, 2), "utf-8");
  } catch (error) {
    // На некоторых платформах файловая система может быть read-only
    // Это не критично - данные все равно отправляются в Telegram
    console.warn("[SAVE] ⚠️ Could not save to file:", error);
  }
}
```

#### 2.5. **Отправка в Telegram**

```typescript
async function sendToTelegram(visitorData: {
  id: string;
  city: string;
  country: string;
  ip: string;
  device: string;
  os: string;
  browser: string;
  screen_resolution: string;
  referrer: string | null;
  utm_source: string | null;
  utm_medium?: string | null;
  utm_campaign: string | null;
  utm_term: string | null;
  utm_content?: string | null;
  page: string;
  timestamp: string;
  isFirstVisit?: boolean;
  metrikaData?: { ... } | null;
}) {
  const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.error("[TELEGRAM] ❌ Telegram credentials not configured");
    return;
  }

  // Формирование сообщения...
  const message = `...`;

  const response = await fetch(
    `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: "HTML",
      }),
    }
  );
}
```

**Основной обработчик POST:**

```typescript
export async function POST(request: NextRequest) {
  const requestId = Math.random().toString(36).substring(7);
  
  // 1. Получение данных из запроса
  const body = await request.json();
  const userAgent = request.headers.get("user-agent") || "";
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || 
             request.headers.get("x-real-ip") || "unknown";

  // 2. Проверка на бота
  if (isBot(userAgent)) {
    return NextResponse.json({ tracked: false, reason: "bot", requestId });
  }

  // 3. Проверка IP
  if (!isValidIP(ip)) {
    return NextResponse.json({ tracked: false, reason: "invalid_ip", requestId });
  }

  // 4. Получение геолокации
  const geoData = await getGeoLocation(ip);

  // 5. Парсинг User-Agent
  const parser = new UAParser(userAgent);
  const uaResult = parser.getResult();

  // 6. Сбор данных посетителя
  const visitorData = { /* ... */ };

  // 7. Получение данных из Yandex.Metrika (опционально)
  const metrikaData = await getYandexMetrikaVisitorData(
    visitorData.referrer,
    visitorData.utm_source
  );

  // 8. Сохранение в файл
  saveData(visitorData);

  // 9. Отправка в Telegram (при каждом посещении)
  await sendToTelegram({
    ...visitorData,
    isFirstVisit: body.isFirstVisit !== false,
    metrikaData,
  });

  return NextResponse.json({
    tracked: true,
    visitorId: visitorData.id,
    requestId,
  });
}
```

---

### 3. **Библиотека Telegram**

**Файл:** `lib/telegram.ts`

**Назначение:** Утилиты для отправки сообщений в Telegram и форматирования сообщений.

**Функции:**

#### 3.1. **sendToTelegram()**

Универсальная функция для отправки сообщений:

```typescript
export async function sendToTelegram(
  message: string,
  chatId?: string
): Promise<{ success: boolean; error?: string }> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const defaultChatId = process.env.TELEGRAM_CHAT_ID;
  const targetChatId = chatId || defaultChatId;

  if (!botToken || !targetChatId) {
    return { success: false, error: "Bot token or Chat ID not configured" };
  }

  const response = await fetch(
    `https://api.telegram.org/bot${botToken}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: targetChatId,
        text: message,
        parse_mode: "HTML",
      }),
    }
  );

  const data = await response.json();
  return response.ok && data.ok
    ? { success: true }
    : { success: false, error: data.description || "Unknown error" };
}
```

#### 3.2. **formatContactMessage()**

Форматирование сообщения о заявке с контактной формы:

```typescript
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
${data.phone ? `📞 <b>Телефон:</b> ${escapeHtml(data.phone)}\n` : ""}
💬 <b>Сообщение:</b>
${escapeHtml(data.message)}

📅 Дата: ${new Date().toLocaleString("ru-RU", { timeZone: "Asia/Almaty" })}
  `.trim();
}
```

#### 3.3. **formatQuizMessage()**

Форматирование сообщения о прохождении квиза:

```typescript
export function formatQuizMessage(data: {
  name?: string;
  phone?: string;
  email?: string;
  answers: Record<string, unknown>;
  estimatedBudget?: string;
}): string {
  let message = "🎯 <b>Новый результат квиза!</b>\n\n";
  // ... форматирование ответов ...
  return message.trim();
}
```

#### 3.4. **escapeHtml()**

Экранирование HTML для безопасной отправки:

```typescript
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
```

---

### 4. **API Routes для форм**

#### 4.1. **Контактная форма**

**Файл:** `app/api/contact/route.ts`

**Назначение:** Обработка отправки контактной формы и отправка уведомления в Telegram.

```typescript
export async function POST(request: NextRequest) {
  const body = await request.json();

  // Валидация
  if (!body.name || !body.message) {
    return NextResponse.json({ error: "Имя и сообщение обязательны" }, { status: 400 });
  }

  // Сохранение в файл
  const submission = {
    id: Date.now().toString(),
    ...body,
    type: "contact-form",
    submittedAt: new Date().toISOString(),
    ip: request.headers.get("x-forwarded-for") || "unknown",
    userAgent: request.headers.get("user-agent") || "unknown",
  };
  saveData(submission);

  // Отправка в Telegram
  const telegramMessage = formatContactMessage({
    name: body.name,
    email: body.email,
    phone: body.phone,
    message: body.message,
  });

  const telegramResult = await sendToTelegram(telegramMessage);

  return NextResponse.json({
    success: true,
    message: "Сообщение успешно отправлено",
    id: submission.id,
    telegramSent: telegramResult.success,
  });
}
```

#### 4.2. **Квиз**

**Файл:** `app/api/quiz/route.ts`

**Назначение:** Обработка отправки квиза и отправка уведомления в Telegram.

Аналогично контактной форме, но с форматированием ответов квиза.

---

## 🔗 Взаимосвязи между компонентами

### Схема потока данных:

```
1. Пользователь заходит на сайт
   ↓
2. VisitorTracker (клиент) собирает данные:
   - sessionId (из sessionStorage или генерирует новый)
   - UTM-метки (из URL)
   - referrer (из document.referrer)
   - screenResolution (из window.screen)
   - landingPage (из sessionStorage или текущий путь)
   ↓
3. VisitorTracker отправляет POST /api/track-visitor
   ↓
4. API Route обрабатывает запрос:
   a. Проверяет на бота (isBot)
   b. Валидирует IP (isValidIP)
   c. Получает геолокацию (getGeoLocation)
   d. Парсит User-Agent (UAParser)
   e. Собирает данные посетителя
   f. Получает данные из Yandex.Metrika (опционально)
   g. Сохраняет в data/visitors.json (saveData)
   h. Отправляет в Telegram (sendToTelegram)
   ↓
5. sendToTelegram формирует сообщение и отправляет в Telegram Bot API
   ↓
6. Уведомление приходит в Telegram чат
```

### Интеграция с формами:

```
1. Пользователь заполняет форму (contact/quiz)
   ↓
2. Форма отправляет POST /api/contact или /api/quiz
   ↓
3. API Route:
   a. Валидирует данные
   b. Сохраняет в data/contact-submissions.json или data/quiz-submissions.json
   c. Форматирует сообщение (formatContactMessage / formatQuizMessage)
   d. Отправляет в Telegram (sendToTelegram из lib/telegram.ts)
   ↓
4. Уведомление приходит в Telegram чат
```

---

## 🛠️ Технологии и зависимости

### Основные библиотеки:

1. **Next.js 15.5.2** - React фреймворк
2. **React** - UI библиотека
3. **TypeScript** - Типизация
4. **ua-parser-js** - Парсинг User-Agent
   ```bash
   npm install ua-parser-js
   ```
5. **uuid** - Генерация уникальных ID
   ```bash
   npm install uuid
   ```
6. **ip-api.com** - Бесплатный сервис геолокации по IP (без установки, используется через fetch)

### Внешние сервисы:

1. **Telegram Bot API** - Отправка уведомлений
   - Endpoint: `https://api.telegram.org/bot{TOKEN}/sendMessage`
   - Метод: POST
   - Формат: JSON

2. **ip-api.com** - Геолокация по IP
   - Endpoint: `http://ip-api.com/json/{IP}?lang=ru`
   - Метод: GET
   - Лимит: 45 запросов/минуту (бесплатно)

3. **Yandex.Metrika** (опционально) - Дополнительные данные о трафике
   - Требуется OAuth токен и Counter ID

---

## ⚙️ Логика работы

### 1. **Определение первого/повторного посещения**

**На клиенте (visitor-tracker.tsx):**

```typescript
const isFirstVisit = !sessionStorage.getItem("visitor_tracked");
if (isFirstVisit) {
  sessionStorage.setItem("visitor_tracked", "true");
}
```

**На сервере (route.ts):**

```typescript
function isNewVisitor(ip: string): boolean {
  if (ip === "unknown" || !ip) return true;
  const existingData = getExistingData();
  const hasVisitedBefore = existingData.some((v: { ip?: string }) => v.ip === ip);
  return !hasVisitedBefore;
}
```

**Важно:** Уведомления отправляются при **каждом посещении**, независимо от того, первое это посещение или повторное. Флаг `isFirstVisit` используется только для статистики и отображения в сообщении.

### 2. **Фильтрация ботов**

Система проверяет User-Agent на наличие известных паттернов ботов:

```typescript
const BOT_USER_AGENTS = [
  "googlebot", "bingbot", "yandexbot", "baiduspider",
  "facebookexternalhit", "twitterbot", "linkedinbot",
  "slackbot", "discordbot", "whatsapp", "telegrambot",
  "crawl", "spider", "bot", "headless", "phantom",
  "selenium", "puppeteer", "playwright", "webdriver",
  "curl", "wget", "python-requests", "go-http-client", "java/"
];
```

**Исключение:** Паттерн "http" исключен из проверки, так как он слишком широкий и может ловить нормальные браузеры.

### 3. **Сбор UTM-меток**

UTM-метки собираются из URL при первом посещении и сохраняются в `sessionStorage`:

```typescript
const urlParams = new URLSearchParams(window.location.search);
const utmData = {
  utmSource: urlParams.get("utm_source"),
  utmMedium: urlParams.get("utm_medium"),
  utmCampaign: urlParams.get("utm_campaign"),
  utmTerm: urlParams.get("utm_term"),
  utmContent: urlParams.get("utm_content"),
};

if (utmData.utmSource) {
  sessionStorage.setItem("utm_data", JSON.stringify(utmData));
}
```

Это позволяет сохранить UTM-метки для всех страниц в сессии, даже если они были только на landing page.

### 4. **Отслеживание при навигации**

Компонент `VisitorTracker` отслеживает изменения пути через `usePathname()`:

```typescript
useEffect(() => {
  const timer = setTimeout(() => {
    trackVisitor();
  }, 100);
  return () => clearTimeout(timer);
}, [pathname]);
```

При каждой смене страницы отправляется новый запрос на сервер, что позволяет отслеживать поведение посетителя на сайте.

### 5. **Обработка ошибок**

- **Ошибки сохранения в файл:** Не блокируют отправку в Telegram (файловая система может быть read-only на некоторых платформах)
- **Ошибки отправки в Telegram:** Логируются, но не блокируют сохранение данных
- **Ошибки сети:** Обрабатываются gracefully, не влияют на работу сайта

---

## 🔧 Настройка и конфигурация

### 1. **Создание Telegram бота**

1. Откройте [@BotFather](https://t.me/BotFather) в Telegram
2. Отправьте команду `/newbot`
3. Следуйте инструкциям и создайте бота
4. Сохраните токен бота (например: `123456789:ABCdefGHIjklMNOpqrsTUVwxyz`)

### 2. **Получение Chat ID**

1. Напишите вашему боту любое сообщение (например `/start`)
2. Откройте в браузере: `https://api.telegram.org/bot<ВАШ_ТОКЕН>/getUpdates`
3. Найдите в ответе `"chat":{"id":123456789}`
4. Сохраните этот ID

### 3. **Настройка переменных окружения**

Создайте файл `.env.local` в корне проекта:

```env
# Telegram Bot Configuration
TELEGRAM_BOT_TOKEN=123456789:ABCdefGHIjklMNOpqrsTUVwxyz
TELEGRAM_CHAT_ID=123456789

# Опционально: Yandex.Metrika (для дополнительных данных о трафике)
YANDEX_METRIKA_OAUTH_TOKEN=your_oauth_token
NEXT_PUBLIC_YM_ID=your_counter_id

# Опционально: Google Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Опционально: URL сайта (для Yandex.Metrika API)
NEXT_PUBLIC_SITE_URL=https://your-site.com
```

**Важно:** Файл `.env.local` не должен попадать в Git (добавлен в `.gitignore`).

### 4. **Проверка конфигурации**

Создан тестовый endpoint для проверки:

```bash
curl http://localhost:3000/api/track-visitor/test
```

Или откройте в браузере: `http://localhost:3000/api/track-visitor/test`

Ответ должен содержать:
```json
{
  "telegramConfigured": true,
  "hasToken": true,
  "hasChatId": true
}
```

---

## 📨 Формат уведомлений

### Уведомление о новом посетителе

```
🆕 Новый посетитель на сайте!

👤 Информация:
📍 Местоположение: Алматы, Казахстан
🌐 IP: 123.45.67.89

💻 Устройство:
📱 Мобильное
🖥️ ОС: iOS 17.0
🌍 Браузер: Chrome 120.0
📱 Разрешение: 1920x1080

🔗 Источник трафика:
💰 Платная реклама
📊 Source: yandex
📢 Medium: cpc
📋 Campaign: summer2024
🔑 Term: таргетолог алматы
📝 Content: banner_1

📄 Поведение:
📖 Страница: /ru
⏱ Время визита: 21.11.2025, 03:55:00
```

### Уведомление о повторном визите

```
🔄 Повторный визит

👤 Информация:
📍 Местоположение: Алматы, Казахстан
🌐 IP: 123.45.67.89

💻 Устройство:
🖥️ Десктоп
🖥️ ОС: Windows 11
🌍 Браузер: Chrome 120.0
📱 Разрешение: 1920x1080

🔗 Источник трафика:
🌐 Прямой заход / Другое
🔗 Прямой заход

📄 Поведение:
📖 Страница: /ru/services
⏱ Время визита: 21.11.2025, 04:10:00

🔄 Это повторное посещение в этой сессии
```

### Уведомление о заявке с формы

```
🆕 Новая заявка с сайта!

👤 Имя: Иван Иванов
📧 Email: ivan@example.com
📞 Телефон: +7 777 123 45 67

💬 Сообщение:
Хочу заказать разработку сайта для моего бизнеса.

📅 Дата: 21.11.2025, 04:15:00
```

### Уведомление о прохождении квиза

```
🎯 Новый результат квиза!

👤 Имя: Мария Петрова
📞 Телефон: +7 777 123 45 67
📧 Email: maria@example.com

Ответы:
• Цель: Разработка сайта
• Ниша: Интернет-магазин
• Бюджет: 500 000 - 1 000 000 ₸
• Платформы: Web, Mobile

💰 Примерный бюджет: 500 000 - 1 000 000 ₸

📅 Дата: 21.11.2025, 04:20:00
```

---

## 💡 Примеры использования

### 1. **Отслеживание кликов на кнопки**

Компонент автоматически отслеживает клики на CTA-кнопки:

```typescript
// В visitor-tracker.tsx
const handleClick = (e: MouseEvent) => {
  const button = target.closest('button, a[href*="#"], a[href*="tel:"], a[href*="mailto:"]');
  if (button && window.visitorTracker) {
    const isCTA = buttonText.toLowerCase().includes("заказать") || 
                  buttonText.toLowerCase().includes("узнать");
    if (isCTA) {
      window.visitorTracker.trackClick(buttonText, buttonType);
    }
  }
};
```

### 2. **Отслеживание конверсий**

Автоматически отслеживаются отправки форм:

```typescript
const handleSubmit = (e: Event) => {
  const form = e.target as HTMLFormElement;
  if (window.visitorTracker && form) {
    window.visitorTracker.trackConversion(`form_${form.id}`, {
      formId: form.id,
      formClass: form.className,
    });
  }
};
```

### 3. **Ручное отслеживание событий**

Можно использовать глобальный объект `window.visitorTracker`:

```typescript
// Отслеживание клика
window.visitorTracker?.trackClick("Кнопка 'Заказать'", "button");

// Отслеживание конверсии
window.visitorTracker?.trackConversion("phone_call", {
  phone: "+7 777 123 45 67",
});

// Обновление поведения
window.visitorTracker?.updateBehavior({
  timeOnSite: 120,
  clicks: 5,
  conversions: ["form_submit", "phone_call"],
});
```

### 4. **Интеграция с аналитикой**

Автоматически отправляются события в Yandex.Metrika и Google Analytics:

```typescript
// Yandex.Metrika
if (typeof window.ym !== "undefined" && ymId) {
  window.ym(ymId, "reachGoal", "visitor_tracked", {
    visitor_id: data.visitorId,
  });
}

// Google Analytics
if (typeof window.gtag !== "undefined") {
  window.gtag("event", "visitor_tracked", {
    visitor_id: data.visitorId,
  });
}
```

---

## 🔍 Диагностика и отладка

### 1. **Логирование**

Система использует подробное логирование с префиксами:

- `[VISITOR-TRACKER]` - Клиентская часть
- `[TRACK-xxx]` - Серверная часть (xxx - уникальный ID запроса)
- `[TELEGRAM]` - Отправка в Telegram
- `[SAVE]` - Сохранение данных
- `[CONTACT]` - Обработка контактной формы
- `[QUIZ]` - Обработка квиза

### 2. **Проверка работы системы**

#### Шаг 1: Проверка конфигурации

```bash
curl http://localhost:3000/api/track-visitor/test
```

#### Шаг 2: Проверка сохранения данных

```bash
cat data/visitors.json
```

#### Шаг 3: Проверка логов в консоли браузера

Откройте DevTools (F12) → Console, ищите сообщения с префиксом `[VISITOR-TRACKER]`.

#### Шаг 4: Проверка логов на сервере

В терминале, где запущен `npm run dev`, ищите сообщения с префиксами `[TRACK-xxx]`, `[TELEGRAM]`.

### 3. **Частые проблемы**

#### Проблема: Уведомления не приходят

**Решение:**
1. Проверьте переменные окружения: `TELEGRAM_BOT_TOKEN` и `TELEGRAM_CHAT_ID`
2. Проверьте логи на сервере: `[TELEGRAM] ❌`
3. Убедитесь, что бот не заблокирован
4. Проверьте, что Chat ID правильный (может быть отрицательным для групп)

#### Проблема: Боты не фильтруются

**Решение:**
1. Проверьте User-Agent в логах: `[TRACK-xxx] User-Agent: ...`
2. Добавьте паттерн бота в `BOT_USER_AGENTS` в `route.ts`

#### Проблема: IP показывает "unknown"

**Решение:**
- Это нормально для некоторых прокси/CDN
- Система разрешает "unknown" IP для работы с прокси
- Геолокация будет "Unknown" для таких IP

#### Проблема: UTM-метки не сохраняются

**Решение:**
1. Проверьте, что UTM-метки есть в URL: `?utm_source=yandex&utm_medium=cpc`
2. Проверьте `sessionStorage` в DevTools: `sessionStorage.getItem("utm_data")`
3. Убедитесь, что UTM-метки передаются в POST запросе (проверьте Network tab)

### 4. **Тестовый скрипт**

Создан скрипт для тестирования системы:

```bash
npx tsx scripts/test-visitor-tracking.ts
```

Скрипт отправляет тестовый запрос и проверяет все этапы работы системы.

---

## 📊 Структура данных

### Данные посетителя (visitorData)

```typescript
{
  id: string;                    // UUID
  ip: string;                     // IP-адрес
  user_agent: string;             // User-Agent браузера
  
  // Геолокация
  country: string;                // Страна
  city: string;                   // Город
  region: string;                 // Регион
  timezone: string;               // Часовой пояс
  isp: string;                    // Провайдер
  
  // Устройство
  device: string;                 // "mobile" | "tablet" | "desktop"
  browser: string;                // "Chrome 120.0"
  os: string;                     // "Windows 11"
  screen_resolution: string;      // "1920x1080"
  
  // Источник трафика
  referrer: string | null;        // Referrer URL
  utm_source: string | null;      // UTM Source
  utm_medium: string | null;      // UTM Medium
  utm_campaign: string | null;    // UTM Campaign
  utm_term: string | null;        // UTM Term
  utm_content: string | null;    // UTM Content
  
  // Поведение
  page: string;                   // Текущая страница
  landing_page: string;           // Первая страница в сессии
  timeOnSite: number;             // Время на сайте (секунды)
  clicks: number;                 // Количество кликов
  conversions: string[];          // Массив конверсий
  pagesViewed: number;            // Количество просмотренных страниц
  clickEvents: Array<{            // События кликов
    element: string;
    type: string;
    timestamp: string;
  }>;
  conversionEvents: Array<{       // События конверсий
    type: string;
    data: Record<string, unknown>;
    timestamp: string;
  }>;
  
  timestamp: string;              // ISO timestamp
  session_id: string | null;      // Session ID
}
```

### Данные формы (contact/quiz)

```typescript
{
  id: string;                     // Timestamp ID
  name: string;                  // Имя
  email?: string;                // Email (опционально)
  phone?: string;                // Телефон (опционально)
  message?: string;              // Сообщение (для contact)
  answers?: Record<string, unknown>; // Ответы (для quiz)
  type: string;                  // "contact-form" | "quiz"
  submittedAt: string;           // ISO timestamp
  ip: string;                    // IP-адрес
  userAgent: string;             // User-Agent
}
```

---

## 🎓 Заключение

Модуль отправки уведомлений в Telegram представляет собой комплексную систему отслеживания посетителей с автоматической отправкой уведомлений. Система спроектирована с учетом:

- ✅ Надежности (обработка ошибок, fallback механизмы)
- ✅ Производительности (асинхронная обработка, оптимизация запросов)
- ✅ Безопасности (фильтрация ботов, валидация данных)
- ✅ Расширяемости (легко добавить новые типы уведомлений)
- ✅ Удобства использования (подробное логирование, диагностика)

Система готова к использованию в production и может быть легко расширена для дополнительных функций.

---

**Дата создания:** 2025-11-21  
**Версия:** 1.0  
**Автор:** AI Assistant (Auto)

