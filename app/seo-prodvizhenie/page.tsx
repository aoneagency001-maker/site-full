import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "SEO-продвижение сайтов в Алматы — AOne Agency",
  description:
    "SEO-продвижение сайтов в Google и Яндекс от 200 000 ₸/мес. Выход в ТОП-10 за 30-60 дней. Белые методы, гарантия результата.",
};

export default function SEOPage() {
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
          <span>SEO-продвижение</span>
        </nav>

        <header className="mb-12">
          <div className="inline-block px-4 py-2 bg-blue-100 rounded-full text-blue-700 text-sm font-semibold mb-4">
            📈 Google • Яндекс
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            SEO-продвижение сайтов
          </h1>
          <p className="text-xl text-gray-700 leading-relaxed mb-6">
            Выход в ТОП-10 Google и Яндекса за 30-60 дней. Белые методы, прозрачная отчётность.
          </p>
          <Link
            href="/contacts"
            className="bg-blue-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-600 transition-all inline-block"
          >
            Получить аудит сайта →
          </Link>
        </header>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Что мы делаем</h2>
          <div className="space-y-4">
            <div className="bg-blue-50 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">1. Технический аудит</h3>
              <p className="text-gray-700">Исправляем ошибки, ускоряем загрузку сайта</p>
            </div>
            <div className="bg-blue-50 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">2. Контент-стратегия</h3>
              <p className="text-gray-700">Создаём SEO-оптимизированный контент</p>
            </div>
            <div className="bg-blue-50 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">3. Ссылочная масса</h3>
              <p className="text-gray-700">Наращиваем качественные ссылки</p>
            </div>
          </div>
        </section>

        <section id="pricing" className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Стоимость</h2>
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-4">От 200 000 ₸/месяц</h3>
            <p className="mb-4">Аудит + оптимизация + контент + ссылки</p>
            <Link
              href="/contacts"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all inline-block"
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
            </Link>
            <Link
              href="/kontekstnaya-reklama"
              className="bg-white p-4 rounded-lg hover:shadow-lg transition-all"
            >
              <h4 className="font-bold text-gray-900 mb-2">Контекстная реклама</h4>
            </Link>
            <Link
              href="/razrabotka-prilozhenij"
              className="bg-white p-4 rounded-lg hover:shadow-lg transition-all"
            >
              <h4 className="font-bold text-gray-900 mb-2">Разработка приложений</h4>
            </Link>
          </div>
        </section>
      </article>
    </main>
  );
}
