import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "CRM-автоматизация amoCRM и Bitrix24 — AOne Agency",
  description:
    "Внедрение и настройка amoCRM, Bitrix24 от 150 000 ₸. Интеграция с сайтом, мессенджерами, рекламой.",
};

export default function CRMPage() {
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
          <span>CRM-автоматизация</span>
        </nav>

        <header className="mb-12">
          <div className="inline-block px-4 py-2 bg-indigo-100 rounded-full text-indigo-700 text-sm font-semibold mb-4">
            ⚙️ amoCRM • Bitrix24
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            CRM-автоматизация бизнеса
          </h1>
          <p className="text-xl text-gray-700 leading-relaxed mb-6">
            Внедрение amoCRM и Bitrix24. Интеграция с сайтом, мессенджерами, рекламой.
          </p>
          <Link
            href="/contacts"
            className="bg-indigo-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-indigo-600 transition-all inline-block"
          >
            Получить консультацию →
          </Link>
        </header>

        <section id="pricing" className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Стоимость</h2>
          <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-4">От 150 000 ₸</h3>
            <p className="mb-4">Настройка + интеграции + обучение</p>
            <Link
              href="/contacts"
              className="bg-white text-indigo-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all inline-block"
            >
              Заказать →
            </Link>
          </div>
        </section>

        <section className="bg-gray-50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Другие услуги</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <Link
              href="/ai-chatboty"
              className="bg-white p-4 rounded-lg hover:shadow-lg transition-all"
            >
              <h4 className="font-bold text-gray-900 mb-2">AI-чат-боты</h4>
            </Link>
            <Link
              href="/targetirovannaya-reklama"
              className="bg-white p-4 rounded-lg hover:shadow-lg transition-all"
            >
              <h4 className="font-bold text-gray-900 mb-2">Таргетированная реклама</h4>
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
