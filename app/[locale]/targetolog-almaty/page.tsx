import { generatePageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Где найти таргетолога в Алматы — AOne Agency",
  description:
    "Найти таргетолога в Алматы можно на фриланс-биржах (gorodrabot.kz, profi.kz), в агентствах или через поиск. Цены от 50 000 ₸ для фрилансеров, от 200 000 ₸ для агентств. Бесплатная консультация от AOne Agency.",
  keywords:
    "таргетолог алматы, найти таргетолога, услуги таргетолога, таргетированная реклама алматы, таргетолог цена, где искать таргетолога",
  openGraph: {
    title: "Где найти таргетолога в Алматы — AOne Agency",
    description:
      "Полный гайд по поиску таргетолога в Алматы: биржи, агентства, цены. Бесплатная консультация.",
    url: "https://aoneagency.kz/targetolog-almaty",
    type: "article",
  },
};

export default function TargetologAlmatyPage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Где найти таргетолога в Алматы: полный гайд 2025",
    description:
      "Подробный гид по поиску таргетолога в Алматы: фриланс-биржи, агентства, цены, на что обратить внимание.",
    author: {
      "@type": "Organization",
      name: "AOne Agency",
    },
    publisher: {
      "@type": "Organization",
      name: "AOne Agency",
      logo: {
        "@type": "ImageObject",
        url: "https://aoneagency.kz/logo.png",
      },
    },
    datePublished: "2025-01-20",
    dateModified: "2025-01-20",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <main className="py-20 bg-white">
        <article className="max-w-4xl mx-auto px-4 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="mb-8 text-sm text-gray-600" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-blue-600">
              Главная
            </Link>
            <span className="mx-2">/</span>
            <span>Таргетолог в Алматы</span>
          </nav>

          {/* Hero */}
          <header className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Где найти таргетолога в Алматы: полный гайд 2025
            </h1>
            <p className="text-xl text-gray-700 leading-relaxed">
              В Алматы и Казахстане есть много специалистов по таргетированной рекламе, а также
              курсы и сервисы по её настройке. Найти таргетолога можно на{" "}
              <strong>фриланс-биржах</strong> (gorodrabot.kz, profi.kz), в{" "}
              <strong>профильных агентствах</strong> или через поиск в интернете по запросам
              "таргетолог Алматы" или "услуги таргетолога Алматы".
            </p>
          </header>

          {/* Content */}
          <section className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">Где искать таргетолога</h2>

            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">🎯 Быстрый ответ</h3>
              <p className="text-gray-700">
                Лучшие способы найти таргетолога в Алматы: фриланс-биржи (gorodrabot.kz, profi.kz),
                маркетинговые агентства (AOne Agency, другие), профильные сообщества в Telegram и
                Instagram, рекомендации знакомых.
              </p>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">1. Фриланс-биржи</h3>
            <p className="text-gray-700 mb-4">
              Сайты вроде <strong>gorodrabot.kz</strong> и <strong>profi.kz</strong> предлагают
              услуги таргетологов с различными ценами и опытом.
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li>
                <strong>Плюсы:</strong> Широкий выбор специалистов, отзывы, гибкие цены
              </li>
              <li>
                <strong>Минусы:</strong> Качество работы может сильно варьироваться, нет гарантий
              </li>
              <li>
                <strong>Цена:</strong> От 50 000 ₸ до 150 000 ₸ за проект
              </li>
            </ul>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">2. Профильные агентства</h3>
            <p className="text-gray-700 mb-4">
              Многие digital-агентства в Алматы имеют отделы таргетинга и готовы взять на себя
              настройку рекламы.
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li>
                <strong>Плюсы:</strong> Профессиональная команда, гарантии результата, комплексный
                подход
              </li>
              <li>
                <strong>Минусы:</strong> Выше стоимость, чем у фрилансеров
              </li>
              <li>
                <strong>Цена:</strong> От 200 000 ₸/мес (настройка + ведение + оптимизация)
              </li>
            </ul>

            <div className="bg-orange-50 border-l-4 border-orange-500 p-6 mb-8">
              <p className="text-gray-900 font-semibold mb-2">💡 Рекомендация AOne Agency:</p>
              <p className="text-gray-700">
                Если бюджет позволяет, работайте с агентствами — у них есть опыт, кейсы и гарантии.
                Для небольших проектов (бюджет до 100 000 ₸/мес на рекламу) подойдут проверенные
                фрилансеры.
              </p>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              3. Профессиональные сообщества
            </h3>
            <p className="text-gray-700 mb-4">
              Ищите в тематических группах в социальных сетях, где специалисты делятся своим опытом
              и предлагают услуги.
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li>Telegram-группы по маркетингу в Казахстане</li>
              <li>Instagram-аккаунты таргетологов</li>
              <li>LinkedIn (для B2B проектов)</li>
            </ul>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">4. Рекомендации</h3>
            <p className="text-gray-700 mb-6">
              Поинтересуйтесь у знакомых или коллег, искали ли они недавно таргетолога. Сарафанное
              радио работает лучше всего.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">
              Что нужно учитывать при выборе таргетолога
            </h2>

            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                ✅ Чек-лист для выбора таргетолога:
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <div>
                    <strong>Портфолио:</strong> Изучите примеры прошлых работ и кейсы, чтобы понять,
                    с какими нишами и задачами работал кандидат.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <div>
                    <strong>Навыки:</strong> Убедитесь, что специалист обладает необходимыми
                    знаниями: настройка кампаний, работа с рекламными кабинетами (VK Ads, Telegram
                    Ads), сегментация аудитории, аналитика, A/B-тестирование, копирайтинг.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <div>
                    <strong>Опыт и стоимость:</strong> Цены на услуги таргетолога в Казахстане могут
                    сильно варьироваться в зависимости от опыта специалиста и сложности проекта.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <div>
                    <strong>Отзывы:</strong> Проверьте отзывы предыдущих клиентов на биржах, в
                    соцсетях или попросите контакты для связи.
                  </div>
                </li>
              </ul>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">
              Сколько стоит таргетолог в Алматы
            </h2>

            <div className="overflow-x-auto mb-8">
              <table className="min-w-full bg-white border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-3 px-4 border-b text-left">Тип</th>
                    <th className="py-3 px-4 border-b text-left">Цена</th>
                    <th className="py-3 px-4 border-b text-left">Что входит</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-3 px-4 border-b">Фрилансер-новичок</td>
                    <td className="py-3 px-4 border-b">50 000 - 80 000 ₸</td>
                    <td className="py-3 px-4 border-b">Базовая настройка</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="py-3 px-4 border-b">Фрилансер-эксперт</td>
                    <td className="py-3 px-4 border-b">100 000 - 150 000 ₸</td>
                    <td className="py-3 px-4 border-b">Настройка + ведение 1 мес</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 border-b">Агентство (стартовый)</td>
                    <td className="py-3 px-4 border-b">200 000 ₸/мес</td>
                    <td className="py-3 px-4 border-b">Настройка + ведение + аналитика</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="py-3 px-4 border-b">Агентство (премиум)</td>
                    <td className="py-3 px-4 border-b">350 000+ ₸/мес</td>
                    <td className="py-3 px-4 border-b">Полный цикл + AI-оптимизация</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">
              Почему выбирают AOne Agency
            </h2>

            <div className="bg-blue-50 rounded-xl p-8 mb-8">
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 text-2xl">✓</span>
                  <div>
                    <strong className="text-gray-900">18 лет опыта</strong> — 500+ успешных проектов
                    в Казахстане
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 text-2xl">✓</span>
                  <div>
                    <strong className="text-gray-900">AI-автоматизация</strong> — снижаем CPL на 40%
                    с помощью нейросетей
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 text-2xl">✓</span>
                  <div>
                    <strong className="text-gray-900">Гарантия +30% заявок</strong> или возврат
                    денег
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 text-2xl">✓</span>
                  <div>
                    <strong className="text-gray-900">Прозрачная отчётность</strong> — личный
                    кабинет с онлайн KPI
                  </div>
                </li>
              </ul>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-8 text-center text-white mt-12">
              <h3 className="text-2xl font-bold mb-4">Нужен таргетолог в Алматы?</h3>
              <p className="text-lg mb-6 opacity-90">
                Получите бесплатную консультацию и аудит рекламы от экспертов AOne Agency
              </p>
              <Link
                href="/contacts"
                className="inline-block bg-white text-orange-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all shadow-lg"
              >
                Получить консультацию →
              </Link>
            </div>
          </section>
        </article>
      </main>
    </>
  );
}
