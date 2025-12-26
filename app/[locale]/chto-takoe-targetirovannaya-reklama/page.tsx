import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Что такое таргетированная реклама простыми словами — AOne Agency",
  description:
    "Таргетированная реклама — это настройка рекламы в соцсетях и других платформах с целью показа её целевой аудитории, отвечающей заданным критериям (возраст, интересы, местоположение и т.д.). Бесплатная консультация от AOne Agency.",
  keywords:
    "что такое таргетированная реклама, таргет реклама, как работает таргет, таргетированная реклама в instagram, таргет в казахстане",
};

export default function ChtoTakoeTargetPage() {
  return (
    <main className="py-20 bg-white">
      <article className="max-w-4xl mx-auto px-4 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="mb-8 text-sm text-gray-600">
          <Link href="/" className="hover:text-blue-600">
            Главная
          </Link>
          <span className="mx-2">/</span>
          <span>Что такое таргетированная реклама</span>
        </nav>

        {/* Hero */}
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Что такое таргетированная реклама простыми словами
          </h1>
          <div className="bg-blue-50 border-l-4 border-blue-600 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">🎯 Определение</h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              <strong>Таргетированная реклама</strong> — это настройка рекламы в социальных сетях и
              других платформах с целью показа её <strong>целевой аудитории</strong>, отвечающей
              заданным критериям (возраст, интересы, местоположение и т.д.). В отличие от обычной
              рекламы, которую видят все, таргет показывается только тем людям, которые с большей
              вероятностью заинтересуются вашим продуктом.
            </p>
          </div>
        </header>

        {/* Content */}
        <section className="prose prose-lg max-w-none">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Как работает таргетированная реклама
          </h2>

          <p className="text-gray-700 mb-6 text-lg">
            Таргетированная реклама работает на основе <strong>данных пользователей</strong>,
            собранных социальными сетями и другими платформами:
          </p>

          <ol className="list-decimal pl-6 mb-8 text-gray-700 space-y-4">
            <li>
              <strong>Вы выбираете аудиторию:</strong> Указываете параметры (возраст 25-40 лет,
              женщины, живут в Алматы, интересуются фитнесом).
            </li>
            <li>
              <strong>Платформа находит пользователей:</strong> Instagram, Facebook, TikTok или VK
              ищут людей, подходящих под эти критерии.
            </li>
            <li>
              <strong>Показывается реклама:</strong> Пользователи видят ваше объявление в ленте
              новостей, Stories или Reels.
            </li>
            <li>
              <strong>Пользователи совершают действие:</strong> Кликают на объявление, переходят на
              сайт, оставляют заявку или покупают.
            </li>
          </ol>

          <div className="bg-green-50 border-l-4 border-green-500 p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">💡 Пример</h3>
            <p className="text-gray-700">
              Салон красоты в Алматы хочет привлечь клиентов на маникюр. С помощью таргета
              настраивают рекламу на{" "}
              <strong>
                женщин 20-45 лет, живущих в радиусе 5 км от салона, интересующихся красотой и уходом
              </strong>
              . Результат: +150 записей за месяц, CPL (стоимость заявки) — 800 ₸.
            </p>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">
            Где используется таргетированная реклама
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">📱 Instagram</h3>
              <p className="text-gray-700">
                Реклама в ленте, Stories, Reels. Лучше всего подходит для визуальных продуктов
                (одежда, еда, услуги красоты).
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">🎵 TikTok</h3>
              <p className="text-gray-700">
                Реклама в For You (ленте). Отлично работает для молодой аудитории 16-30 лет.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">👥 Facebook</h3>
              <p className="text-gray-700">
                Более взрослая аудитория 30-55 лет. Подходит для B2B, услуг, недвижимости.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">🔵 VK (ВКонтакте)</h3>
              <p className="text-gray-700">
                Популярен в Казахстане и России. Хорошо работает для локального бизнеса.
              </p>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">
            Преимущества таргетированной рекламы
          </h2>

          <div className="space-y-4 mb-8">
            <div className="flex items-start gap-4 bg-blue-50 p-4 rounded-lg">
              <span className="text-blue-600 text-2xl">✓</span>
              <div>
                <strong className="text-gray-900">Точный охват аудитории</strong>
                <p className="text-gray-700">Показываете рекламу только тем, кому она интересна</p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-blue-50 p-4 rounded-lg">
              <span className="text-blue-600 text-2xl">✓</span>
              <div>
                <strong className="text-gray-900">Низкая стоимость</strong>
                <p className="text-gray-700">Можно начать с бюджета от 10 000 ₸/день</p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-blue-50 p-4 rounded-lg">
              <span className="text-blue-600 text-2xl">✓</span>
              <div>
                <strong className="text-gray-900">Быстрый запуск</strong>
                <p className="text-gray-700">Кампанию можно запустить за 1-2 дня</p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-blue-50 p-4 rounded-lg">
              <span className="text-blue-600 text-2xl">✓</span>
              <div>
                <strong className="text-gray-900">Прозрачная аналитика</strong>
                <p className="text-gray-700">Видите все метрики: клики, заявки, стоимость</p>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">
            Сколько стоит таргетированная реклама
          </h2>

          <div className="bg-gray-50 rounded-xl p-6 mb-8">
            <p className="text-gray-700 mb-4">
              Стоимость зависит от <strong>ниши</strong>, <strong>конкуренции</strong> и{" "}
              <strong>качества настройки</strong>:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>
                <strong>Бюджет на рекламу:</strong> От 50 000 ₸/мес для малого бизнеса
              </li>
              <li>
                <strong>Настройка и ведение:</strong> От 200 000 ₸/мес в агентствах
              </li>
              <li>
                <strong>CPL (стоимость заявки):</strong> От 300 ₸ до 3000 ₸ в зависимости от ниши
              </li>
            </ul>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-8 text-center text-white mt-12">
            <h3 className="text-2xl font-bold mb-4">Хотите запустить таргетированную рекламу?</h3>
            <p className="text-lg mb-6 opacity-90">
              Получите бесплатную консультацию и аудит от экспертов AOne Agency
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
  );
}
