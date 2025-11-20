import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Контекстная реклама Google Ads и Yandex.Direct — AOne Agency",
  description:
    "Настройка контекстной рекламы в Google Ads и Yandex.Direct от 200 000 ₸/мес. Гарантия результата, прозрачная отчётность.",
};

export default function ContextAdvertisingPage() {
  return (
    <main className="py-20 bg-white">
      <article className="max-w-4xl mx-auto px-4 lg:px-8">
        <nav className="mb-8 text-sm text-gray-600">
          <Link href="/" className="hover:text-blue-600">
            Главная
          </Link>
          <span className="mx-2">/</span>
          <Link href="/#services" className="hover:text-blue-600">
            Услуги
          </Link>
          <span className="mx-2">/</span>
          <span>Контекстная реклама</span>
        </nav>

        <header className="mb-12">
          <div className="inline-block px-4 py-2 bg-green-100 rounded-full text-green-700 text-sm font-semibold mb-4">
            🔍 Google Ads • Yandex.Direct
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Контекстная реклама под ключ
          </h1>
          <p className="text-xl text-gray-700 leading-relaxed mb-6">
            Настройка и ведение контекстной рекламы в Google Ads и Yandex.Direct. Оплата за
            результат.
          </p>
          <Link
            href="/contacts"
            className="bg-green-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-600 transition-all inline-block"
          >
            Получить консультацию →
          </Link>
        </header>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Что входит в услугу</h2>
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">✓ Анализ ниши</h3>
              <p className="text-gray-700">Исследование конкурентов и подбор ключевых слов</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">✓ Настройка кампаний</h3>
              <p className="text-gray-700">Поисковые и РСЯ кампании, ремаркетинг</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">✓ Оптимизация</h3>
              <p className="text-gray-700">Ежедневный мониторинг и корректировка ставок</p>
            </div>
          </div>
        </section>

        <section id="pricing" className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Стоимость</h2>
          <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-4">От 200 000 ₸/месяц</h3>
            <p className="mb-4">Включает настройку + ведение + отчёты</p>
            <Link
              href="/contacts"
              className="bg-white text-green-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all inline-block"
            >
              Заказать →
            </Link>
          </div>
        </section>

        <section className="bg-gray-50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Другие услуги</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <Link
              href="/targetirovannaya-reklama"
              className="bg-white p-4 rounded-lg hover:shadow-lg transition-all"
            >
              <h4 className="font-bold text-gray-900 mb-2">Таргетированная реклама</h4>
              <p className="text-sm text-gray-600">Instagram, TikTok, Facebook</p>
            </Link>
            <Link
              href="/seo-prodvizhenie"
              className="bg-white p-4 rounded-lg hover:shadow-lg transition-all"
            >
              <h4 className="font-bold text-gray-900 mb-2">SEO-продвижение</h4>
              <p className="text-sm text-gray-600">Выход в ТОП-10 за 30 дней</p>
            </Link>
            <Link
              href="/ai-chatboty"
              className="bg-white p-4 rounded-lg hover:shadow-lg transition-all"
            >
              <h4 className="font-bold text-gray-900 mb-2">AI-чат-боты</h4>
              <p className="text-sm text-gray-600">Telegram, WhatsApp, Instagram</p>
            </Link>
          </div>
        </section>
      </article>
    </main>
  );
}
