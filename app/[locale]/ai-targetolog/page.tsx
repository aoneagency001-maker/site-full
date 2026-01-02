import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ИИ-Таргетолог | Первая Маркетинговая ОС в Казахстане — AOne Agency",
  description:
    "Замените таргетолога на искусственный интеллект. Получайте в 2,5 раза больше клиентов за те же деньги. Подписка 100 000 ₸/месяц вместо зарплаты 200 000 ₸.",
  keywords:
    "ИИ таргетолог, AI маркетинг, автоматизация рекламы, таргетированная реклама ИИ, маркетинговая ОС, SaaS маркетинг, Алматы",
  openGraph: {
    title: "ИИ-Таргетолог — Маркетинговая ОС от AOne Agency",
    description:
      "Первая в Казахстане Маркетинговая ОС. В 2,5 раза больше клиентов за те же деньги. Без зарплат, без лени, без выходных.",
    locale: "ru_RU",
  },
};

export default function AITargetologPage() {
  return (
    <main className="bg-[#0a0a0a] text-white min-h-screen">
      {/* Header */}
      <header className="border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6 flex justify-between items-center">
          <div className="text-2xl font-extrabold">
            AOne <span className="text-purple-600">Agency</span>
          </div>
          <a
            href="#pricing"
            className="bg-gradient-to-r from-purple-600 to-purple-800 text-white px-6 py-3 rounded-full font-bold uppercase tracking-wider hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50 transition-all"
          >
            Попробовать ИИ
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-24 text-center bg-[#0a0a0a] bg-gradient-to-b from-purple-950/30 to-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <h1 className="text-5xl md:text-7xl font-bold mb-8 uppercase bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">
            Хватит кормить таргетологов!
            <br />
            Пока они отдыхают — наш AI работает
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-4xl mx-auto mb-10 leading-relaxed">
            Первая в Казахстане Маркетинговая ОС. Замените ручной труд на искусственный интеллект
            и получайте в 2,5 раза больше клиентов при том же бюджете.
          </p>
          <a
            href="#pricing"
            className="inline-block bg-gradient-to-r from-purple-600 to-purple-800 text-white px-10 py-4 rounded-full font-bold uppercase tracking-wider hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50 transition-all"
          >
            Запустить ИИ-Таргетолога
          </a>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-24 bg-[#121212] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Знакомая ситуация? Вы платите таргетологу 250 000 ₸, а получаете тишину.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-gray-400 text-lg mb-6">
                Вы платите специалисту зарплату каждый месяц. Он запускает рекламу один раз, а
                потом исчезает.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex gap-3 text-gray-400">
                  <span className="text-red-500 text-xl flex-shrink-0">❌</span>
                  <span>
                    <strong className="text-white">«Всё идет по плану»:</strong> Вы спрашиваете,
                    как дела, а в ответ слышите про «оптимизацию» и «обучение алгоритмов».
                  </span>
                </li>
                <li className="flex gap-3 text-gray-400">
                  <span className="text-red-500 text-xl flex-shrink-0">❌</span>
                  <span>
                    <strong className="text-white">Реальность:</strong> Ваш таргетолог ведет еще 10
                    проектов параллельно или просто отдыхает, пока ваши деньги капают ему на счет.
                    Он проверяет кабинет раз в неделю.
                  </span>
                </li>
                <li className="flex gap-3 text-gray-400">
                  <span className="text-red-500 text-xl flex-shrink-0">❌</span>
                  <span>
                    <strong className="text-white">Итог:</strong> Вы теряете миллионы на
                    неэффективной рекламе и переплачиваете человеку, который просто нажимает кнопки.
                  </span>
                </li>
              </ul>
              <p className="text-gray-400 text-lg">
                <strong className="text-white">Мы в AOne Agency знаем это изнутри.</strong> За 18
                лет мы видели, как 80% рынка паразитируют на бюджетах клиентов. Мы решили это
                изменить и создали систему, которая работает лучше человека, не спит и не просит
                зарплату.
              </p>
            </div>
            <div className="bg-[#1a1a1a] border-2 border-dashed border-purple-600 rounded-xl p-8 h-96 flex items-center justify-center text-center">
              <p className="text-gray-500 italic">
                [ИЗОБРАЖЕНИЕ: Человек-таргетолог отдыхает на пляже или спит за ноутбуком, пока на
                фоне горят деньги или график идет вниз. Стиль: легкий киберпанк/неон.]
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Встречайте ИИ-Таргетолога от AOne Agency
            </h2>
            <p className="text-xl text-gray-400 mb-6">
              Это не просто автозапуск. Это полноценная Маркетинговая Операционная Система (SaaS).
            </p>
            <p className="text-gray-400 text-lg">
              Мы оцифровали опыт управления бюджетами более $1 млн и создали многоагентную систему
              с искусственным интеллектом. Это SaaS-платформа, которая полностью заменяет штат
              маркетологов, дизайнеров и аналитиков.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: "🤖",
                title: "Без ошибок",
                desc: "Не забудет выключить рекламу на ночь и не перепутает аудитории. Исключен человеческий фактор.",
              },
              {
                icon: "💤",
                title: "Без лени",
                desc: "Работает 24/7, оптимизируя ставки каждую ночь (08:00-08:30), пока вы спите.",
              },
              {
                icon: "🏖️",
                title: "Без выходных",
                desc: "Ему не нужен отпуск, больничный или перерыв на обед. Он всегда в строю.",
              },
              {
                icon: "🧠",
                title: "Чистая математика",
                desc: "Принимает решения на основе тысяч сигналов в секунду, а не интуиции.",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="bg-[#1a1a1a] p-8 rounded-xl border border-white/10 hover:border-purple-600 transition-colors"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-bold text-purple-500 mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features - Creative Studio */}
      <section className="py-24 bg-[#121212] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Мы уволили дизайнеров. Теперь рекламу создает ИИ.
              </h2>
              <p className="text-gray-400 text-lg mb-8">
                Раньше мы говорили: «Принесите креативы». Теперь мы говорим:{" "}
                <strong className="text-white">«Нажмите кнопку»</strong>. Наш модуль{" "}
                <strong className="text-white">AI-Creative Studio (v3.0)</strong> создает
                профессиональные рекламные материалы за 1 минуту.
              </p>
              <ul className="space-y-6">
                {[
                  {
                    icon: "🎨",
                    title: "Генерация баннеров",
                    desc: "ИИ создает дизайны в 5 проверенных стилях. Загрузите фото своего товара — и нейросеть аккуратно впишет его в продающий баннер.",
                  },
                  {
                    icon: "🔄",
                    title: "Умные карусели",
                    desc: "Система сама создает цепочки Stories или постов в Instagram (от 2 до 10 карточек) с единым стилем и сторителлингом.",
                  },
                  {
                    icon: "✍️",
                    title: "ИИ-Копирайтер",
                    desc: "Это не просто ChatGPT. Наш ИИ обучен на тысячах успешных кампаний. Он пишет тексты, которые продают.",
                  },
                ].map((item, idx) => (
                  <li key={idx}>
                    <div className="flex gap-3">
                      <span className="text-purple-500 text-xl">✦</span>
                      <div>
                        <strong className="text-xl text-white block mb-2">
                          {item.icon} {item.title}
                        </strong>
                        <p className="text-gray-400">{item.desc}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-[#1a1a1a] border-2 border-dashed border-purple-600 rounded-xl p-8 h-[500px] flex items-center justify-center text-center">
              <p className="text-gray-500 italic max-w-md">
                [ИЗОБРАЖЕНИЕ: Интерфейс "AI-Creative Studio". Показать процесс: слева загружается
                фото товара, справа ИИ выдает 3 готовых стильных рекламных баннера. Футуристичный
                UI, неоновые линии.]
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features - Analytics */}
      <section className="py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1 bg-[#1a1a1a] border-2 border-dashed border-purple-600 rounded-xl p-8 h-[500px] flex items-center justify-center text-center">
              <p className="text-gray-500 italic max-w-md">
                [ИЗОБРАЖЕНИЕ: Скриншот дашборда Сквозной аналитики. Видна воронка: WhatsApp →
                AmoCRM → Продажа 150 000₸. Графики роста денег, а не кликов. Темная тема.]
              </p>
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Мы считаем деньги в кассе, а не клики в кабинете.
              </h2>
              <p className="text-gray-400 text-lg mb-8">
                Вам не нужны отчеты о кликах. Вам нужны продажи. Благодаря обновлению v3.0,
                ИИ-Таргетолог видит, сколько денег принесла каждая реклама.
              </p>
              <ul className="space-y-6">
                {[
                  {
                    icon: "🔗",
                    title: "Связка WhatsApp + CRM",
                    desc: "Мы соединяем тех, кто написал вам, с базой продаж (AmoCRM).",
                  },
                  {
                    icon: "💰",
                    title: "Реальная картина",
                    desc: "В отчете вы видите воронку: Лид → Квалифицирован → Продажа (Сумма).",
                  },
                  {
                    icon: "🧠",
                    title: "Умная оптимизация",
                    desc: "ИИ автоматически отключает рекламу, которая приносит просто «клики», и масштабирует ту, которая приносит реальные деньги.",
                  },
                ].map((item, idx) => (
                  <li key={idx}>
                    <div className="flex gap-3">
                      <span className="text-purple-500 text-xl">✦</span>
                      <div>
                        <strong className="text-xl text-white block mb-2">
                          {item.icon} {item.title}
                        </strong>
                        <p className="text-gray-400">{item.desc}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Logic Section */}
      <section className="py-24 bg-[#121212] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Как работает мозг системы?</h2>
            <p className="text-xl text-gray-400">
              Наш алгоритм — это умная система прогнозирования, которая проверяет ваши кампании
              каждое утро и принимает решения по 4 сценариям.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                num: "1",
                title: "«Всё работает»",
                desc: "Цена заявки в норме? ИИ не мешает алгоритмам Facebook, позволяя рекламе разгоняться.",
              },
              {
                num: "2",
                title: "«Просадка»",
                desc: "Видит тренд на ухудшение (анализ 3, 7, 15 дней)? ИИ заранее готовит замену креативам.",
              },
              {
                num: "3",
                title: "«Вампир»",
                desc: "Объявление «жрет» бюджет без заявок? ИИ жестко отключает его, спасая ваши деньги.",
              },
              {
                num: "4",
                title: "«Регенерация»",
                desc: "Реклама выгорела? ИИ сам создает и запускает новые группы из лучших материалов.",
              },
            ].map((step, idx) => (
              <div
                key={idx}
                className="bg-[#1a1a1a] p-8 rounded-xl border-t-4 border-purple-600 relative"
              >
                <div className="absolute -top-5 left-6 bg-purple-600 w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg">
                  {step.num}
                </div>
                <h3 className="text-xl font-bold text-white mb-3 mt-2">{step.title}</h3>
                <p className="text-gray-400">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Economics Section */}
      <section className="py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Представьте: В 2,5 раза больше клиентов за те же деньги!
            </h2>
            <p className="text-xl text-gray-400">Давайте посчитаем вашу экономику сейчас и с ИИ.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Human */}
            <div className="bg-[#1f1f1f] border border-red-500/30 rounded-2xl p-12 text-center">
              <h3 className="text-2xl font-bold mb-6">Сейчас (с человеком)</h3>
              <div className="space-y-3 mb-6">
                <p className="text-lg text-gray-400">Зарплата таргетолога: 250 000 ₸</p>
                <p className="text-lg text-gray-400">Рекламный бюджет: 250 000 ₸</p>
              </div>
              <div className="text-5xl font-extrabold text-red-500 my-8">Расходы: 500 000 ₸</div>
              <div className="bg-black/30 rounded-lg p-6">
                <p className="text-gray-400 mb-2">Результат:</p>
                <span className="text-4xl font-extrabold text-red-500">~100 заявок</span>
              </div>
              <p className="text-gray-400 mt-6">Половина бюджета уходит в карман сотруднику.</p>
            </div>

            {/* AI */}
            <div className="bg-gradient-to-br from-[#1a1a1a] to-purple-950/30 border border-purple-600 rounded-2xl p-12 text-center transform md:scale-105 shadow-xl shadow-purple-500/20">
              <h3 className="text-2xl font-bold mb-6">С ИИ-Таргетологом AOne</h3>
              <div className="space-y-3 mb-6">
                <p className="text-lg text-gray-400">Зарплата ИИ: 0 ₸ (входит в подписку)</p>
                <p className="text-lg text-white font-semibold">
                  Рекламный бюджет: 500 000 ₸ (x2 рост!)
                </p>
              </div>
              <div className="text-5xl font-extrabold text-purple-500 my-8">Расходы: 500 000 ₸</div>
              <div className="bg-black/30 rounded-lg p-6">
                <p className="text-gray-400 mb-2">Результат:</p>
                <span className="text-5xl font-extrabold text-green-500">250+ заявок</span>
              </div>
              <p className="text-gray-400 mt-6">
                Все деньги работают на привлечение клиентов. + Эффективность ИИ.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-[#121212] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Сколько стоит ИИ-Таргетолог?</h2>
            <p className="text-xl text-gray-400">
              Это в 5 раз дешевле, чем самый дешевый таргетолог-новичок.
            </p>
          </div>

          <div className="bg-[#1a1a1a] border-2 border-purple-600 rounded-3xl p-12 md:p-16 max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-6">Подписка на Маркетинговую ОС</h3>
            <div className="text-7xl md:text-8xl font-extrabold text-purple-500 mb-4">100 000 ₸</div>
            <div className="text-xl text-gray-400 mb-10">в месяц</div>

            <ul className="text-left max-w-md mx-auto space-y-4 mb-12">
              {[
                "🚀 Полный доступ к платформе ИИ-Таргетолог",
                "📊 Модуль Сквозной Аналитики (CRM + WhatsApp)",
                "🎨 Стартовый пакет генераций в Creative Studio",
                "📱 Личный кабинет и Telegram-бот",
                "⚡ Автоматический онбординг за 1 день",
              ].map((item, idx) => (
                <li key={idx} className="flex gap-3">
                  <span className="text-purple-500 font-bold">✓</span>
                  <span className="text-gray-300">{item}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/contacts"
              className="inline-block w-full md:w-auto bg-gradient-to-r from-purple-600 to-purple-800 text-white px-12 py-4 rounded-full font-bold uppercase tracking-wider hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50 transition-all"
            >
              Попробовать ИИ-Таргетолога
            </Link>
            <p className="text-sm text-gray-500 mt-6">
              Запустите рекламу сегодня: Создайте направление → Сгенерируйте креатив → Нажмите Старт
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Перестаньте спонсировать чужой отдых.
          </h2>
          <p className="text-xl text-gray-400 mb-10">
            ИИ-Таргетолог от AOne Agency готов начать работу прямо сейчас. Он не устает, не просит
            повышения и нацелен только на одно — ваши продажи.
          </p>
          <a
            href="#pricing"
            className="inline-block bg-gradient-to-r from-purple-600 to-purple-800 text-white px-12 py-4 rounded-full font-bold uppercase tracking-wider hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50 transition-all"
          >
            Запустить ИИ сейчас
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-white/5 py-8">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 text-center">
          <div className="text-2xl font-extrabold mb-4">
            AOne <span className="text-purple-600">Agency</span>
          </div>
          <p className="text-gray-600">© 2025 AOne Agency. Все права защищены. ИИ-Маркетинговая ОС.</p>
        </div>
      </footer>

      {/* Schema.org markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "ИИ-Таргетолог — Маркетинговая ОС",
            description:
              "Первая в Казахстане Маркетинговая Операционная Система. Замените таргетолога на ИИ и получайте в 2,5 раза больше клиентов.",
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web",
            offers: {
              "@type": "Offer",
              price: "100000",
              priceCurrency: "KZT",
              priceSpecification: {
                "@type": "UnitPriceSpecification",
                price: "100000",
                priceCurrency: "KZT",
                billingDuration: "P1M",
              },
            },
            provider: {
              "@type": "Organization",
              name: "AOne Agency",
              telephone: "+7-747-385-4493",
              address: {
                "@type": "PostalAddress",
                streetAddress: "проспект Назарбаева 103",
                addressLocality: "Алматы",
                addressCountry: "KZ",
              },
            },
          }),
        }}
      />
    </main>
  );
}
