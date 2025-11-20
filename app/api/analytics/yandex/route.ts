import { type NextRequest, NextResponse } from "next/server";

/**
 * API Route для получения данных из Yandex.Metrika
 *
 * Использует Yandex.Metrika Reporting API для получения статистики
 *
 * Требуется:
 * - YANDEX_METRIKA_OAUTH_TOKEN - OAuth токен для доступа к API
 * - NEXT_PUBLIC_YM_ID - ID счетчика Metrika
 */

const YANDEX_METRIKA_API_BASE = "https://api-metrika.yandex.net/stat/v1/data";

interface YandexMetrikaResponse {
  query: {
    ids: number[];
    dimensions: string[];
    metrics: string[];
    date1: string;
    date2: string;
  };
  data: Array<{
    dimensions: Array<{ name: string; id: string }>;
    metrics: number[];
  }>;
  totals: number[];
}

// Функция получения данных из Yandex.Metrika
async function getYandexMetrikaData(
  counterId: string,
  oauthToken: string,
  metrics: string[],
  dimensions: string[] = [],
  date1?: string,
  date2?: string
) {
  // По умолчанию - данные за сегодня
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const startDate = date1 || yesterday.toISOString().split("T")[0];
  const endDate = date2 || today.toISOString().split("T")[0];

  const params = new URLSearchParams({
    ids: counterId,
    metrics: metrics.join(","),
    date1: startDate,
    date2: endDate,
  });

  if (dimensions.length > 0) {
    params.append("dimensions", dimensions.join(","));
  }

  try {
    const response = await fetch(`${YANDEX_METRIKA_API_BASE}?${params.toString()}`, {
      headers: {
        Authorization: `OAuth ${oauthToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Yandex.Metrika API error: ${response.status} - ${errorText}`);
    }

    const data = (await response.json()) as YandexMetrikaResponse;
    return data;
  } catch (error) {
    console.error("Yandex.Metrika API error:", error);
    throw error;
  }
}

// Основные метрики для получения
const COMMON_METRICS = [
  "ym:s:visits", // Визиты
  "ym:s:pageviews", // Просмотры страниц
  "ym:s:users", // Пользователи
  "ym:s:bounceRate", // Показатель отказов
  "ym:s:avgVisitDurationSeconds", // Средняя длительность визита
];

// Метрики для источников трафика
const TRAFFIC_SOURCE_METRICS = ["ym:s:visits", "ym:s:users", "ym:s:pageviews"];

// Группировки для источников
const TRAFFIC_SOURCE_DIMENSIONS = [
  "ym:s:trafficSource", // Источник трафика
  "ym:s:searchEngine", // Поисковая система
  "ym:s:referer", // Реферер
];

// Группировки для поисковых запросов
const SEARCH_DIMENSIONS = [
  "ym:s:searchPhrase", // Поисковый запрос
  "ym:s:searchEngine", // Поисковая система
];

// GET - получение статистики
export async function GET(request: NextRequest) {
  try {
    const oauthToken = process.env.YANDEX_METRIKA_OAUTH_TOKEN;
    const counterId = process.env.NEXT_PUBLIC_YM_ID;

    if (!oauthToken) {
      return NextResponse.json(
        { error: "YANDEX_METRIKA_OAUTH_TOKEN не настроен" },
        { status: 400 }
      );
    }

    if (!counterId) {
      return NextResponse.json({ error: "NEXT_PUBLIC_YM_ID не настроен" }, { status: 400 });
    }

    const { searchParams } = new URL(request.url);
    const date1 = searchParams.get("date1");
    const date2 = searchParams.get("date2");
    const metrics = searchParams.get("metrics")?.split(",") || COMMON_METRICS;
    const dimensions = searchParams.get("dimensions")?.split(",") || [];
    const reportType = searchParams.get("type"); // 'traffic' | 'search' | 'default'

    let finalMetrics = metrics;
    let finalDimensions = dimensions;

    // Специальные отчеты
    if (reportType === "traffic") {
      // Отчет по источникам трафика
      finalMetrics = TRAFFIC_SOURCE_METRICS;
      finalDimensions = TRAFFIC_SOURCE_DIMENSIONS;
    } else if (reportType === "search") {
      // Отчет по поисковым запросам
      finalMetrics = ["ym:s:visits", "ym:s:users"];
      finalDimensions = SEARCH_DIMENSIONS;
    }

    const data = await getYandexMetrikaData(
      counterId,
      oauthToken,
      finalMetrics,
      finalDimensions,
      date1 || undefined,
      date2 || undefined
    );

    // Обработка данных для удобного формата
    let processedData: unknown = data.data;
    if (reportType === "traffic") {
      processedData = processTrafficSourceData(data.data);
    } else if (reportType === "search") {
      processedData = processSearchData(data.data);
    }

    return NextResponse.json({
      success: true,
      counterId,
      reportType: reportType || "default",
      period: {
        date1: data.query.date1,
        date2: data.query.date2,
      },
      metrics: data.query.metrics,
      dimensions: data.query.dimensions,
      totals: data.totals,
      data: processedData,
    });
  } catch (error) {
    console.error("Yandex.Metrika API error:", error);
    return NextResponse.json(
      {
        error: "Ошибка получения данных из Yandex.Metrika",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// Обработка данных по источникам трафика
function processTrafficSourceData(data: YandexMetrikaResponse["data"]) {
  return data.map((item) => {
    const source = item.dimensions.find((d) => d.name === "ym:s:trafficSource");
    const searchEngine = item.dimensions.find((d) => d.name === "ym:s:searchEngine");
    const referer = item.dimensions.find((d) => d.name === "ym:s:referer");

    return {
      source: source?.id || "unknown",
      sourceName: source?.name || "Неизвестно",
      searchEngine: searchEngine?.name || null,
      referer: referer?.name || null,
      visits: item.metrics[0] || 0,
      users: item.metrics[1] || 0,
      pageviews: item.metrics[2] || 0,
      isPaid: source?.id === "ad" || source?.id === "cpc",
      isOrganic: searchEngine?.name ? true : false,
    };
  });
}

// Обработка данных по поисковым запросам
function processSearchData(data: YandexMetrikaResponse["data"]) {
  return data
    .map((item) => {
      const searchPhrase = item.dimensions.find((d) => d.name === "ym:s:searchPhrase");
      const searchEngine = item.dimensions.find((d) => d.name === "ym:s:searchEngine");

      return {
        query: searchPhrase?.name || "Не указан",
        searchEngine: searchEngine?.name || "Неизвестно",
        visits: item.metrics[0] || 0,
        users: item.metrics[1] || 0,
      };
    })
    .filter((item) => item.query !== "Не указан"); // Убираем пустые запросы
}

// POST - получение и отправка отчета в Telegram
export async function POST(request: NextRequest) {
  try {
    const oauthToken = process.env.YANDEX_METRIKA_OAUTH_TOKEN;
    const counterId = process.env.NEXT_PUBLIC_YM_ID;
    const telegramToken = process.env.TELEGRAM_BOT_TOKEN;
    const telegramChatId = process.env.TELEGRAM_CHAT_ID;

    if (!oauthToken || !counterId) {
      return NextResponse.json({ error: "Yandex.Metrika не настроен" }, { status: 400 });
    }

    if (!telegramToken || !telegramChatId) {
      return NextResponse.json({ error: "Telegram не настроен" }, { status: 400 });
    }

    const body = (await request.json()) as {
      date1?: string;
      date2?: string;
      metrics?: string[];
      sendToTelegram?: boolean;
    };

    // Получаем данные
    const data = await getYandexMetrikaData(
      counterId,
      oauthToken,
      body.metrics || COMMON_METRICS,
      [],
      body.date1,
      body.date2
    );

    // Формируем отчет
    const report = formatYandexMetrikaReport(data);

    // Отправляем в Telegram если нужно
    if (body.sendToTelegram !== false) {
      await sendReportToTelegram(report, telegramToken, telegramChatId);
    }

    return NextResponse.json({
      success: true,
      report,
      data,
    });
  } catch (error) {
    console.error("Yandex.Metrika report error:", error);
    return NextResponse.json(
      {
        error: "Ошибка формирования отчета",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// Форматирование отчета для Telegram
function formatYandexMetrikaReport(data: YandexMetrikaResponse): string {
  const totals = data.totals;
  const metrics = data.query.metrics;

  // Находим индексы метрик
  const visitsIndex = metrics.indexOf("ym:s:visits");
  const pageviewsIndex = metrics.indexOf("ym:s:pageviews");
  const usersIndex = metrics.indexOf("ym:s:users");
  const bounceRateIndex = metrics.indexOf("ym:s:bounceRate");
  const avgDurationIndex = metrics.indexOf("ym:s:avgVisitDurationSeconds");

  const visits = visitsIndex >= 0 ? totals[visitsIndex] : 0;
  const pageviews = pageviewsIndex >= 0 ? totals[pageviewsIndex] : 0;
  const users = usersIndex >= 0 ? totals[usersIndex] : 0;
  const bounceRate = bounceRateIndex >= 0 ? totals[bounceRateIndex] : 0;
  const avgDuration = avgDurationIndex >= 0 ? Math.round(totals[avgDurationIndex]) : 0;

  const date1 = new Date(data.query.date1).toLocaleDateString("ru-RU");
  const date2 = new Date(data.query.date2).toLocaleDateString("ru-RU");

  return `
📊 <b>Отчет Yandex.Metrika</b>

📅 <b>Период:</b> ${date1} - ${date2}

📈 <b>Основные метрики:</b>
👥 Визиты: <b>${visits.toLocaleString("ru-RU")}</b>
👤 Пользователи: <b>${users.toLocaleString("ru-RU")}</b>
📄 Просмотры: <b>${pageviews.toLocaleString("ru-RU")}</b>
⏱ Средняя длительность: <b>${Math.floor(avgDuration / 60)} мин ${avgDuration % 60} сек</b>
📉 Показатель отказов: <b>${bounceRate.toFixed(1)}%</b>

🔗 <a href="https://metrika.yandex.ru/dashboard?id=${data.query.ids[0]}">Открыть в Metrika</a>
  `.trim();
}

// Отправка отчета в Telegram
async function sendReportToTelegram(report: string, token: string, chatId: string) {
  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: report,
        parse_mode: "HTML",
      }),
    });

    const data = (await response.json()) as { ok: boolean; description?: string };
    if (!data.ok) {
      throw new Error(data.description || "Telegram API error");
    }

    return true;
  } catch (error) {
    console.error("Telegram send error:", error);
    throw error;
  }
}
