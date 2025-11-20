import fs from "fs";
import path from "path";
import { type NextRequest, NextResponse } from "next/server";
import { UAParser } from "ua-parser-js";
import { v4 as uuidv4 } from "uuid";

// Создаем директорию для данных, если её нет
const dataDir = path.join(process.cwd(), "data");
const visitorsDataFile = path.join(dataDir, "visitors.json");

// Инициализация файла с данными
function initDataFile() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  if (!fs.existsSync(visitorsDataFile)) {
    fs.writeFileSync(visitorsDataFile, JSON.stringify([]), "utf-8");
  }
}

// Получение существующих данных
function getExistingData() {
  initDataFile();
  const fileContent = fs.readFileSync(visitorsDataFile, "utf-8");
  return JSON.parse(fileContent);
}

// Сохранение новых данных
function saveData(data: unknown) {
  try {
    const existingData = getExistingData();
    existingData.push(data);
    fs.writeFileSync(visitorsDataFile, JSON.stringify(existingData, null, 2), "utf-8");
  } catch (error) {
    // На некоторых платформах (Vercel, некоторые серверы) файловая система может быть read-only
    // Это не критично - данные все равно отправляются в Telegram
    console.warn("[SAVE] ⚠️ Could not save to file (may be read-only filesystem):", error);
    // Не бросаем ошибку, чтобы не блокировать отправку в Telegram
  }
}

// Список известных ботов (User-Agent)
const BOT_USER_AGENTS = [
  "googlebot",
  "bingbot",
  "yandexbot",
  "baiduspider",
  "facebookexternalhit",
  "twitterbot",
  "linkedinbot",
  "slackbot",
  "discordbot",
  "whatsapp",
  "telegrambot",
  "crawl",
  "spider",
  "bot",
  "headless",
  "phantom",
  "selenium",
  "puppeteer",
  "playwright",
  "webdriver",
  "curl",
  "wget",
  "python-requests",
  "go-http-client",
  "java/",
  "http",
];

// Функция определения бота
function isBot(userAgent: string): boolean {
  if (!userAgent) {
    console.log("[TRACK] Bot detected: empty user-agent");
    return true;
  }

  const ua = userAgent.toLowerCase();
  // Исключаем "http" из проверки, так как это слишком широко
  const botPatterns = BOT_USER_AGENTS.filter((bot) => bot !== "http");
  const isBotDetected = botPatterns.some((bot) => ua.includes(bot));

  if (isBotDetected) {
    console.log(`[TRACK] Bot detected: ${userAgent.substring(0, 100)}`);
  }

  return isBotDetected;
}

// Функция получения геолокации по IP
async function getGeoLocation(ip: string) {
  try {
    // Используем бесплатный сервис ip-api.com
    const response = await fetch(`http://ip-api.com/json/${ip}?lang=ru`);
    const data = (await response.json()) as {
      status: string;
      country?: string;
      city?: string;
      regionName?: string;
      timezone?: string;
      isp?: string;
    };

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

  return {
    country: "Unknown",
    city: "Unknown",
    region: "Unknown",
    timezone: "Unknown",
    isp: "Unknown",
  };
}

// Функция проверки IP на приватный/локальный
function isValidIP(ip: string): boolean {
  // Если IP неизвестен, разрешаем (может быть прокси/CDN)
  if (ip === "unknown" || !ip) {
    console.log("[TRACK] IP is unknown, allowing tracking");
    return true;
  }

  // Проверка на приватные IP (localhost, локальная сеть)
  const privateIPRegex = /^(10\.|172\.(1[6-9]|2[0-9]|3[01])\.|192\.168\.|127\.|::1|localhost)/i;
  if (privateIPRegex.test(ip)) {
    console.log(`[TRACK] Private IP detected: ${ip}, allowing for development`);
    // Разрешаем даже приватные IP, так как это может быть разработка или прокси
    return true;
  }

  return true; // IP валидный
}

// Функция получения данных из Yandex.Metrika для посетителя
async function getYandexMetrikaVisitorData(referrer: string | null, utmSource: string | null) {
  const oauthToken = process.env.YANDEX_METRIKA_OAUTH_TOKEN;
  const counterId = process.env.NEXT_PUBLIC_YM_ID;

  if (!oauthToken || !counterId) {
    return null;
  }

  try {
    // Пытаемся получить данные об источнике из Metrika
    const today = new Date().toISOString().split("T")[0];
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split("T")[0];

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/api/analytics/yandex/traffic?date1=${yesterdayStr}&date2=${today}&includeSearch=true`
    );

    if (response.ok) {
      const data = (await response.json()) as {
        paidTraffic?: { sources: Array<{ sourceName: string; referer?: string }> };
        organicTraffic?: { sources: Array<{ searchEngine: string }> };
        searchQueries?: Array<{ query: string; searchEngine: string; visits: number }>;
      };

      // Ищем совпадение по referrer или UTM
      if (utmSource && data.paidTraffic) {
        const matchingSource = data.paidTraffic.sources.find(
          (s) => s.referer?.includes(utmSource) || s.sourceName.includes(utmSource)
        );
        if (matchingSource) {
          return {
            trafficType: "paid" as const,
            source: matchingSource.sourceName,
            referer: matchingSource.referer,
          };
        }
      }

      // Ищем поисковый запрос если это органический трафик
      if (referrer && (referrer.includes("google.com") || referrer.includes("yandex.ru"))) {
        if (data.searchQueries && data.searchQueries.length > 0) {
          // Берем самый популярный запрос за период
          const topQuery = data.searchQueries.sort((a, b) => b.visits - a.visits)[0];
          return {
            trafficType: "organic" as const,
            searchEngine: referrer.includes("google.com") ? "Google" : "Yandex",
            searchQuery: topQuery.query,
          };
        }
      }
    }
  } catch (error) {
    console.error("Error fetching Yandex.Metrika data:", error);
  }

  return null;
}

// Функция отправки в Telegram
/**
 * Проверяет, был ли уже такой посетитель (по IP)
 * Возвращает true если это новый посетитель, false если повторный
 */
function isNewVisitor(ip: string): boolean {
  try {
    // Пропускаем проверку для неизвестных IP (CDN, прокси)
    if (ip === "unknown" || !ip || ip === "") {
      return true; // Считаем новым, если IP неизвестен
    }
    
    const existingData = getExistingData();
    // Проверяем, есть ли уже запись с таким IP
    const hasVisitedBefore = existingData.some((v: { ip?: string }) => v.ip === ip);
    return !hasVisitedBefore;
  } catch (error) {
    // Если не можем проверить, считаем новым
    console.warn("[TELEGRAM] Could not check visitor history, assuming new:", error);
    return true;
  }
}

async function sendToTelegram(visitorData: {
  id: string;
  city: string;
  country: string;
  ip: string;
  referrer: string | null;
  utm_source: string | null;
  utm_campaign: string | null;
  utm_term: string | null;
  page: string;
  timestamp: string;
  metrikaData?: {
    trafficType: "paid" | "organic";
    source?: string;
    referer?: string;
    searchQuery?: string;
    searchEngine?: string;
  } | null;
}) {
  const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.error("[TELEGRAM] ❌ Telegram credentials not configured");
    console.error(`[TELEGRAM] BOT_TOKEN: ${TELEGRAM_BOT_TOKEN ? "✅ Set" : "❌ Missing"}`);
    console.error(`[TELEGRAM] CHAT_ID: ${TELEGRAM_CHAT_ID ? "✅ Set" : "❌ Missing"}`);
    return;
  }

  // Определяем, новый это посетитель или повторный
  const isNew = isNewVisitor(visitorData.ip);
  const visitType = isNew ? "🆕 <b>Новый посетитель</b>" : "🔄 <b>Повторный визит</b>";

  console.log(`[TELEGRAM] 📤 Sending notification for visitor: ${visitorData.id} (${isNew ? "new" : "returning"})`);

  // Определяем тип источника трафика
  const metrikaData = visitorData.metrikaData;

  const isPaidTraffic =
    metrikaData?.trafficType === "paid" ||
    (visitorData.utm_source &&
      (visitorData.utm_source.includes("yandex") || visitorData.utm_source.includes("google")));

  const isOrganicTraffic =
    metrikaData?.trafficType === "organic" ||
    (!visitorData.utm_source &&
      visitorData.referrer &&
      (visitorData.referrer.includes("google.com") || visitorData.referrer.includes("yandex.ru")));

  // Получаем source из metrikaData (может быть в source или referer)
  const metrikaSource = metrikaData?.source || metrikaData?.referer;

  const trafficType = isPaidTraffic
    ? "💰 Платная реклама"
    : isOrganicTraffic
      ? "🔍 Органический поиск (SEO)"
      : "🌐 Прямой заход / Другое";

  // Формируем информацию об источнике (только важное)
  let sourceInfo = "";
  if (isPaidTraffic) {
    if (visitorData.utm_campaign) {
      sourceInfo += `📋 Кампания: ${visitorData.utm_campaign}\n`;
    }
    if (visitorData.utm_term) {
      sourceInfo += `🔑 Ключевое слово: ${visitorData.utm_term}\n`;
    }
    if (metrikaSource) {
      sourceInfo += `📢 Источник: ${metrikaSource}`;
    } else if (visitorData.referrer) {
      sourceInfo += `🔗 ${visitorData.referrer}`;
    }
  } else if (isOrganicTraffic) {
    const searchEngine = metrikaData?.searchEngine || 
      (visitorData.referrer?.includes("google") ? "Google" : 
       visitorData.referrer?.includes("yandex") ? "Yandex" : "Другая");
    sourceInfo += `🔍 ${searchEngine}`;
    if (metrikaData?.searchQuery) {
      sourceInfo += `\n🔎 Запрос: ${metrikaData.searchQuery}`;
    }
  } else {
    sourceInfo = visitorData.referrer || "Прямой заход";
  }

  // Упрощенное сообщение - только важная информация
  const message = `
${visitType}

📍 ${visitorData.city}, ${visitorData.country}
📄 Страница: ${visitorData.page}

🔗 <b>Источник:</b> ${trafficType}
${sourceInfo ? `${sourceInfo}\n` : ""}
⏱ ${new Date(visitorData.timestamp).toLocaleString("ru-RU", { timeZone: "Asia/Almaty" })}
  `.trim();

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

    const result = await response.json();

    if (response.ok && result.ok) {
      console.log(`[TELEGRAM] ✅ Notification sent successfully for visitor: ${visitorData.id}`);
    } else {
      console.error(`[TELEGRAM] ❌ Failed to send notification:`, result);
      console.error(`[TELEGRAM] Response status: ${response.status}`);
      console.error(`[TELEGRAM] Error description: ${result.description || "Unknown error"}`);
    }
  } catch (error) {
    console.error("[TELEGRAM] ❌ Error sending notification:", error);
    if (error instanceof Error) {
      console.error("[TELEGRAM] Error message:", error.message);
      console.error("[TELEGRAM] Error stack:", error.stack);
    }
  }
}

// Главная функция API Route
export async function POST(request: NextRequest) {
  const requestId = Math.random().toString(36).substring(7);
  console.log(`[TRACK-${requestId}] 📥 New tracking request received`);
  console.log(`[TRACK-${requestId}] Headers:`, {
    "user-agent": request.headers.get("user-agent")?.substring(0, 50),
    "x-forwarded-for": request.headers.get("x-forwarded-for"),
    "x-real-ip": request.headers.get("x-real-ip"),
  });

  try {
    const body = (await request.json()) as {
      page?: string;
      landingPage?: string;
      referrer?: string;
      screenResolution?: string;
      sessionId?: string;
      utmSource?: string;
      utmMedium?: string;
      utmCampaign?: string;
      utmTerm?: string;
      utmContent?: string;
      isFirstVisit?: boolean;
    };

    console.log(`[TRACK-${requestId}] Page: ${body.page || "/"}`);
    console.log(`[TRACK-${requestId}] Session ID: ${body.sessionId || "none"}`);
    console.log(`[TRACK-${requestId}] Body data:`, JSON.stringify(body, null, 2));

    // Получаем данные из заголовков
    const userAgent = request.headers.get("user-agent") || "";
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    console.log(`[TRACK-${requestId}] IP: ${ip}`);
    console.log(`[TRACK-${requestId}] User-Agent: ${userAgent.substring(0, 100)}`);

    // 1. Проверка на бота
    if (isBot(userAgent)) {
      console.log(`[TRACK-${requestId}] ❌ Request rejected: bot detected`);
      return NextResponse.json({ tracked: false, reason: "bot", requestId });
    }

    // 2. Проверка IP
    if (!isValidIP(ip)) {
      console.log(`[TRACK-${requestId}] ❌ Request rejected: invalid IP`);
      return NextResponse.json({ tracked: false, reason: "invalid_ip", requestId });
    }

    console.log(`[TRACK-${requestId}] ✅ Request passed validation, processing...`);

    // 3. Получаем геолокацию
    const geoData = await getGeoLocation(ip);

    // 4. Парсим User-Agent
    const parser = new UAParser(userAgent);
    const uaResult = parser.getResult();

    // 5. Собираем данные посетителя
    const visitorData = {
      id: uuidv4(),
      // Basic info
      ip,
      user_agent: userAgent,

      // Geo
      country: geoData.country,
      city: geoData.city,
      region: geoData.region,
      timezone: geoData.timezone,
      isp: geoData.isp,

      // Device
      device: uaResult.device.type || "desktop",
      browser:
        uaResult.browser.name && uaResult.browser.version
          ? `${uaResult.browser.name} ${uaResult.browser.version}`
          : "Unknown",
      os:
        uaResult.os.name && uaResult.os.version
          ? `${uaResult.os.name} ${uaResult.os.version}`
          : "Unknown",
      screen_resolution: body.screenResolution || "unknown",

      // Traffic source
      referrer: body.referrer || null,
      utm_source: body.utmSource || null,
      utm_medium: body.utmMedium || null,
      utm_campaign: body.utmCampaign || null,
      utm_term: body.utmTerm || null,
      utm_content: body.utmContent || null,

      // Behavior (инициализация)
      page: body.page || "/",
      landing_page: body.landingPage || "/",
      timeOnSite: 0,
      clicks: 0,
      conversions: [],
      pagesViewed: 1,
      clickEvents: [],
      conversionEvents: [],

      timestamp: new Date().toISOString(),

      // Session
      session_id: body.sessionId || null,
    };

    // 6. Получаем дополнительные данные из Yandex.Metrika (если настроено)
    const metrikaData = await getYandexMetrikaVisitorData(
      visitorData.referrer,
      visitorData.utm_source
    );

    // 7. Сохраняем в базу данных (файл JSON)
    console.log(`[TRACK-${requestId}] 💾 Saving visitor data: ${visitorData.id}`);
    try {
      saveData(visitorData);
      console.log(`[TRACK-${requestId}] ✅ Visitor data saved`);
    } catch (saveError) {
      console.error(`[TRACK-${requestId}] ❌ Error saving data:`, saveError);
      // Продолжаем работу даже если сохранение не удалось (может быть проблема с файловой системой)
    }

    // 8. Отправляем в Telegram ТОЛЬКО при первом посещении в сессии
    const isFirstVisit = body.isFirstVisit !== false; // Определяем для статистики
    
    const hasToken = !!process.env.TELEGRAM_BOT_TOKEN;
    const hasChatId = !!process.env.TELEGRAM_CHAT_ID;
    
    console.log(`[TRACK-${requestId}] Telegram credentials check:`, {
      hasToken,
      hasChatId,
      isFirstVisit,
      willSendNotification: isFirstVisit && hasToken && hasChatId,
    });

    if (!hasToken || !hasChatId) {
      console.error(`[TRACK-${requestId}] ⚠️ WARNING: Telegram credentials not configured!`);
      console.error(`[TRACK-${requestId}] ⚠️ Set TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID in environment variables`);
      console.error(`[TRACK-${requestId}] ⚠️ Visitor tracked but notification NOT sent to Telegram`);
    } else if (isFirstVisit) {
      // Отправляем уведомление ТОЛЬКО при первом посещении в сессии
      console.log(`[TRACK-${requestId}] 📤 Sending Telegram notification (first visit in session)...`);
      await sendToTelegram({
        id: visitorData.id,
        city: visitorData.city,
        country: visitorData.country,
        ip: visitorData.ip,
        referrer: visitorData.referrer,
        utm_source: visitorData.utm_source,
        utm_campaign: visitorData.utm_campaign,
        utm_term: visitorData.utm_term,
        page: visitorData.page,
        timestamp: visitorData.timestamp,
        metrikaData,
      });
    } else {
      console.log(`[TRACK-${requestId}] ⏭️ Skipping Telegram notification (subsequent visit in session)`);
    }

    console.log(`[TRACK-${requestId}] ✅ Visitor tracked successfully: ${visitorData.id}`);
    return NextResponse.json({
      tracked: true,
      visitorId: visitorData.id,
      requestId,
    });
  } catch (error) {
    console.error(`[TRACK-${requestId}] ❌ Error tracking visitor:`, error);
    if (error instanceof Error) {
      console.error(`[TRACK-${requestId}] Error message:`, error.message);
      console.error(`[TRACK-${requestId}] Error stack:`, error.stack);
    }
    return NextResponse.json(
      {
        error: "Internal error",
        requestId,
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const data = getExistingData();

    return NextResponse.json(
      {
        success: true,
        count: data.length,
        visitors: data,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching visitors data:", error);
    return NextResponse.json({ error: "Внутренняя ошибка сервера" }, { status: 500 });
  }
}
