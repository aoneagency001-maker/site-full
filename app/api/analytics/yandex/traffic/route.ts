import { type NextRequest, NextResponse } from "next/server";

/**
 * API для получения данных об источниках трафика из Yandex.Metrika
 * Разделяет платную и органическую рекламу
 */

const YANDEX_METRIKA_API_BASE = "https://api-metrika.yandex.net/stat/v1/data";

async function getTrafficSources(
  counterId: string,
  oauthToken: string,
  date1?: string,
  date2?: string
) {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const startDate = date1 || yesterday.toISOString().split("T")[0];
  const endDate = date2 || today.toISOString().split("T")[0];

  const params = new URLSearchParams({
    ids: counterId,
    metrics: "ym:s:visits,ym:s:users,ym:s:pageviews",
    dimensions: "ym:s:trafficSource,ym:s:searchEngine,ym:s:referer",
    date1: startDate,
    date2: endDate,
    limit: "100",
  });

  try {
    const response = await fetch(`${YANDEX_METRIKA_API_BASE}?${params.toString()}`, {
      headers: {
        Authorization: `OAuth ${oauthToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Yandex.Metrika API error: ${response.status}`);
    }

    const data = (await response.json()) as {
      query: { ids: number[]; date1: string; date2: string };
      data: Array<{
        dimensions: Array<{ name: string; id: string }>;
        metrics: number[];
      }>;
    };

    return data;
  } catch (error) {
    console.error("Yandex.Metrika API error:", error);
    throw error;
  }
}

async function getSearchQueries(
  counterId: string,
  oauthToken: string,
  date1?: string,
  date2?: string
) {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const startDate = date1 || yesterday.toISOString().split("T")[0];
  const endDate = date2 || today.toISOString().split("T")[0];

  const params = new URLSearchParams({
    ids: counterId,
    metrics: "ym:s:visits,ym:s:users",
    dimensions: "ym:s:searchPhrase,ym:s:searchEngine",
    date1: startDate,
    date2: endDate,
    filters: "ym:s:searchPhrase!=''", // Только с поисковыми запросами
    limit: "100",
  });

  try {
    const response = await fetch(`${YANDEX_METRIKA_API_BASE}?${params.toString()}`, {
      headers: {
        Authorization: `OAuth ${oauthToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Yandex.Metrika API error: ${response.status}`);
    }

    const data = (await response.json()) as {
      query: { ids: number[]; date1: string; date2: string };
      data: Array<{
        dimensions: Array<{ name: string; id: string }>;
        metrics: number[];
      }>;
    };

    return data;
  } catch (error) {
    console.error("Yandex.Metrika API error:", error);
    throw error;
  }
}

export async function GET(request: NextRequest) {
  try {
    const oauthToken = process.env.YANDEX_METRIKA_OAUTH_TOKEN;
    const counterId = process.env.NEXT_PUBLIC_YM_ID;

    if (!oauthToken || !counterId) {
      return NextResponse.json({ error: "Yandex.Metrika не настроен" }, { status: 400 });
    }

    const { searchParams } = new URL(request.url);
    const date1 = searchParams.get("date1");
    const date2 = searchParams.get("date2");
    const includeSearch = searchParams.get("includeSearch") === "true";

    // Получаем данные об источниках трафика
    const trafficData = await getTrafficSources(
      counterId,
      oauthToken,
      date1 || undefined,
      date2 || undefined
    );

    // Обрабатываем данные
    const paidTraffic: Array<{
      source: string;
      sourceName: string;
      visits: number;
      users: number;
      pageviews: number;
      referer?: string;
    }> = [];

    const organicTraffic: Array<{
      source: string;
      searchEngine: string;
      visits: number;
      users: number;
      pageviews: number;
    }> = [];

    const directTraffic: Array<{
      source: string;
      visits: number;
      users: number;
      pageviews: number;
    }> = [];

    trafficData.data.forEach((item) => {
      const source = item.dimensions.find((d) => d.name === "ym:s:trafficSource");
      const searchEngine = item.dimensions.find((d) => d.name === "ym:s:searchEngine");
      const referer = item.dimensions.find((d) => d.name === "ym:s:referer");

      const visits = item.metrics[0] || 0;
      const users = item.metrics[1] || 0;
      const pageviews = item.metrics[2] || 0;

      // Платная реклама (контекстная)
      if (
        source?.id === "ad" ||
        source?.id === "cpc" ||
        referer?.name?.includes("yandex.ru") ||
        referer?.name?.includes("google.com")
      ) {
        paidTraffic.push({
          source: source?.id || "unknown",
          sourceName: source?.name || "Контекстная реклама",
          visits,
          users,
          pageviews,
          referer: referer?.name,
        });
      }
      // Органический поиск
      else if (searchEngine?.name) {
        organicTraffic.push({
          source: searchEngine.id,
          searchEngine: searchEngine.name,
          visits,
          users,
          pageviews,
        });
      }
      // Прямой заход
      else {
        directTraffic.push({
          source: source?.id || "direct",
          visits,
          users,
          pageviews,
        });
      }
    });

    // Получаем поисковые запросы если нужно
    let searchQueries: Array<{
      query: string;
      searchEngine: string;
      visits: number;
      users: number;
    }> = [];

    if (includeSearch) {
      try {
        const searchData = await getSearchQueries(
          counterId,
          oauthToken,
          date1 || undefined,
          date2 || undefined
        );
        searchQueries = searchData.data
          .map((item) => {
            const query = item.dimensions.find((d) => d.name === "ym:s:searchPhrase");
            const engine = item.dimensions.find((d) => d.name === "ym:s:searchEngine");

            return {
              query: query?.name || "Не указан",
              searchEngine: engine?.name || "Неизвестно",
              visits: item.metrics[0] || 0,
              users: item.metrics[1] || 0,
            };
          })
          .filter((item) => item.query !== "Не указан");
      } catch (error) {
        console.error("Error fetching search queries:", error);
      }
    }

    return NextResponse.json({
      success: true,
      counterId,
      period: {
        date1: trafficData.query.date1,
        date2: trafficData.query.date2,
      },
      paidTraffic: {
        total: paidTraffic.reduce((sum, t) => sum + t.visits, 0),
        sources: paidTraffic,
      },
      organicTraffic: {
        total: organicTraffic.reduce((sum, t) => sum + t.visits, 0),
        sources: organicTraffic,
      },
      directTraffic: {
        total: directTraffic.reduce((sum, t) => sum + t.visits, 0),
        sources: directTraffic,
      },
      searchQueries: includeSearch ? searchQueries : undefined,
    });
  } catch (error) {
    console.error("Traffic sources error:", error);
    return NextResponse.json(
      {
        error: "Ошибка получения данных об источниках трафика",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
