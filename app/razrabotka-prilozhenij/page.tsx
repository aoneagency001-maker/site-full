import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Разработка мобильных приложений iOS и Android — AOne Agency",
  description:
    "Разработка мобильных приложений на Flutter, React Native от 250 000 ₸. iOS, Android, кроссплатформа.",
};

export default function AppDevelopmentPage() {
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
          <span>Разработка приложений</span>
        </nav>

        <header className="mb-12">
          <div className="inline-block px-4 py-2 bg-purple-100 rounded-full text-purple-700 text-sm font-semibold mb-4">
            📱 iOS • Android • Flutter
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Разработка мобильных приложений
          </h1>
          <p className="text-xl text-gray-700 leading-relaxed mb-6">
            Создаём мобильные приложения для iOS и Android на Flutter, React Native. От идеи до
            релиза.
          </p>
          <Link
            href="/contacts"
            className="bg-purple-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-purple-600 transition-all inline-block"
          >
            Обсудить проект →
          </Link>
        </header>

        <section id="pricing" className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Стоимость</h2>
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-4">От 250 000 ₸</h3>
            <p className="mb-4">MVP за 2-3 недели</p>
            <Link
              href="/contacts"
              className="bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all inline-block"
            >
              Заказать →
            </Link>
          </div>
        </section>

        <section className="bg-gray-50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Другие услуги</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <Link
              href="/crm-avtomatizaciya"
              className="bg-white p-4 rounded-lg hover:shadow-lg transition-all"
            >
              <h4 className="font-bold text-gray-900 mb-2">CRM-автоматизация</h4>
            </Link>
            <Link
              href="/ai-chatboty"
              className="bg-white p-4 rounded-lg hover:shadow-lg transition-all"
            >
              <h4 className="font-bold text-gray-900 mb-2">AI-чат-боты</h4>
            </Link>
            <Link
              href="/seo-prodvizhenie"
              className="bg-white p-4 rounded-lg hover:shadow-lg transition-all"
            >
              <h4 className="font-bold text-gray-900 mb-2">SEO-продвижение</h4>
            </Link>
          </div>
        </section>
      </article>
    </main>
  );
}
