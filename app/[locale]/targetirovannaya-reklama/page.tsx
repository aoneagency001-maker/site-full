import { generatePageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Таргетированная реклама в Алматы — AOne Agency",
  description:
    "Настройка таргетированной рекламы в Instagram, TikTok, Facebook от 200 000 ₸/мес. AI-оптимизация, гарантия +30% заявок. 18 лет опыта.",
  keywords:
    "таргетированная реклама алматы, таргет instagram, реклама tiktok, facebook ads казахстан",
};

export default function TargetAdvertisingPage() {
  return (
    <main className="py-20 bg-white">
      <article className="max-w-4xl mx-auto px-4 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="mb-8 text-sm text-gray-600">
          <Link href="/" className="hover:text-blue-600">
            Главная
          </Link>
          <span className="mx-2">/</span>
          <Link href="/#services" className="hover:text-blue-600">
            Услуги
          </Link>
          <span className="mx-2">/</span>
          <span>Таргетированная реклама</span>
        </nav>

        {/* Hero */}
        <header className="mb-12">
          <div className="inline-block px-4 py-2 bg-orange-100 rounded-full text-orange-700 text-sm font-semibold mb-4">
            📸 Instagram • TikTok • Facebook
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Таргетированная реклама под ключ
          </h1>
          <p className="text-xl text-gray-700 leading-relaxed mb-6">
            AI-автоматизация таргета в Instagram, TikTok, Facebook. Гарантия +30% заявок.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/contacts"
              className="bg-orange-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-orange-600 transition-all inline-block"
            >
              Получить консультацию →
            </Link>
            <Link
              href="#pricing"
              className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-all inline-block"
            >
              Посмотреть цены
            </Link>
          </div>
        </header>

        {/* What is it */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Что такое таргетированная реклама
          </h2>
          <p className="text-gray-700 mb-4 text-lg leading-relaxed">
            Таргетированная реклама — это настройка рекламы в социальных сетях с целью показа её
            целевой аудитории, отвечающей заданным критериям (возраст, интересы, местоположение).
          </p>
          <p className="text-gray-700 mb-4 text-lg leading-relaxed">
            В отличие от обычной рекламы, которую видят все, таргет показывается только тем людям,
            которые с большей вероятностью заинтересуются вашим продуктом.
          </p>
        </section>

        {/* Who needs it */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Кому подходит</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">E-commerce</h3>
              <p className="text-gray-700">Интернет-магазины, продажа товаров онлайн</p>
            </div>
            <div className="bg-green-50 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Локальный бизнес</h3>
              <p className="text-gray-700">Салоны красоты, рестораны, клиники, фитнес-клубы</p>
            </div>
            <div className="bg-purple-50 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Эксперты</h3>
              <p className="text-gray-700">Консультанты, коучи, специалисты по услугам</p>
            </div>
            <div className="bg-orange-50 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">B2B</h3>
              <p className="text-gray-700">Поставки, оборудование, корпоративные услуги</p>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="mb-12" id="pricing">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Стоимость услуг</h2>
          <div className="bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-4">От 200 000 ₸/месяц</h3>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center gap-2">
                <svg className="w-6 h-6 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Настройка кампаний в 3 платформах</span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-6 h-6 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>10+ креативов в месяц</span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-6 h-6 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>A/B тестирование</span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-6 h-6 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Еженедельные отчёты</span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-6 h-6 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>AI-оптимизация ставок</span>
              </li>
            </ul>
            <Link
              href="/contacts"
              className="bg-white text-orange-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all inline-block"
            >
              Заказать →
            </Link>
          </div>
        </section>

        {/* Other services */}
        <section className="bg-gray-50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Другие услуги</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <Link
              href="/kontekstnaya-reklama"
              className="bg-white p-4 rounded-lg hover:shadow-lg transition-all"
            >
              <h4 className="font-bold text-gray-900 mb-2">Контекстная реклама</h4>
              <p className="text-sm text-gray-600">Google Ads, Yandex.Direct</p>
            </Link>
            <Link
              href="/seo-prodvizhenie"
              className="bg-white p-4 rounded-lg hover:shadow-lg transition-all"
            >
              <h4 className="font-bold text-gray-900 mb-2">SEO-продвижение</h4>
              <p className="text-sm text-gray-600">Выход в ТОП-10 за 30 дней</p>
            </Link>
            <Link
              href="/crm-avtomatizaciya"
              className="bg-white p-4 rounded-lg hover:shadow-lg transition-all"
            >
              <h4 className="font-bold text-gray-900 mb-2">CRM-автоматизация</h4>
              <p className="text-sm text-gray-600">amoCRM, Bitrix24</p>
            </Link>
          </div>
        </section>
      </article>
    </main>
  );
}
