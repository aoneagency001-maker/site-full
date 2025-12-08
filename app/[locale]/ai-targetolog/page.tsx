import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ИИ-Таргетолог | Первая Маркетинговая ОС в Казахстане — AOne Agency",
  description:
    "Замените таргетолога на искусственный интеллект. Получайте в 2,5 раза больше клиентов за те же деньги. Подписка 50 000 ₸/месяц вместо зарплаты 250 000 ₸.",
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
    <>
      <style jsx global>{`
        /* --- Глобальные стили для страницы ИИ-Таргетолога --- */
        .ai-targetolog-page {
          --bg-main: #0a0a0a;
          --bg-secondary: #121212;
          --bg-card: #1a1a1a;
          --text-primary: #ffffff;
          --text-secondary: #b3b3b3;
          --accent-purple: #8a2be2;
          --accent-gradient: linear-gradient(135deg, #8a2be2, #4b0082);
          --font-main: 'Inter', sans-serif;

          font-family: var(--font-main);
          background-color: var(--bg-main);
          color: var(--text-primary);
          line-height: 1.6;
        }

        .ai-targetolog-page h1,
        .ai-targetolog-page h2,
        .ai-targetolog-page h3,
        .ai-targetolog-page h4 {
          font-weight: 700;
          line-height: 1.2;
          margin-bottom: 1rem;
        }

        .ai-targetolog-page h1 { font-size: 3.5rem; text-transform: uppercase; }
        .ai-targetolog-page h2 { font-size: 2.5rem; }
        .ai-targetolog-page h3 { font-size: 1.75rem; color: var(--accent-purple); }
        .ai-targetolog-page p {
          color: var(--text-secondary);
          margin-bottom: 1.5rem;
          font-size: 1.1rem;
        }
        .ai-targetolog-page strong { color: var(--text-primary); font-weight: 600; }

        .ai-targetolog-page .container {
          width: 90%;
          max-width: 1200px;
          margin: 0 auto;
        }

        .ai-targetolog-page .btn {
          display: inline-block;
          padding: 1rem 2.5rem;
          background: var(--accent-gradient);
          color: white;
          text-decoration: none;
          font-weight: 700;
          border-radius: 50px;
          text-transform: uppercase;
          letter-spacing: 1px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          border: none;
          cursor: pointer;
        }

        .ai-targetolog-page .btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 20px -10px rgba(138, 43, 226, 0.5);
        }

        .ai-targetolog-page section {
          padding: 6rem 0;
          border-bottom: 1px solid #ffffff0d;
        }

        .ai-targetolog-page .section-header {
          text-align: center;
          max-width: 800px;
          margin: 0 auto 4rem auto;
        }

        .ai-targetolog-page .sub-header {
          font-size: 1.3rem;
          color: var(--text-secondary);
        }

        .ai-targetolog-page .img-placeholder {
          width: 100%;
          height: 400px;
          background: #1a1a1a;
          border: 2px dashed var(--accent-purple);
          display: flex;
          justify-content: center;
          align-items: center;
          color: var(--text-secondary);
          font-style: italic;
          border-radius: 12px;
          margin-bottom: 2rem;
          text-align: center;
          padding: 1rem;
        }

        .ai-targetolog-page .header-section {
          padding: 1.5rem 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .ai-targetolog-page .logo {
          font-size: 1.5rem;
          font-weight: 800;
        }

        .ai-targetolog-page .logo span {
          color: var(--accent-purple);
        }

        .ai-targetolog-page #hero {
          padding-top: 8rem;
          padding-bottom: 6rem;
          text-align: center;
          background: radial-gradient(circle at center, #1a0a2e 0%, var(--bg-main) 70%);
        }

        .ai-targetolog-page #hero h1 {
          font-size: 4rem;
          background: -webkit-linear-gradient(#fff, #a5a5a5);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .ai-targetolog-page #hero p.hero-sub {
          font-size: 1.5rem;
          max-width: 800px;
          margin: 0 auto 2.5rem auto;
        }

        .ai-targetolog-page #problem {
          background-color: var(--bg-secondary);
        }

        .ai-targetolog-page .problem-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }

        .ai-targetolog-page .problem-list {
          list-style: none;
          padding: 0;
        }

        .ai-targetolog-page .problem-list li {
          margin-bottom: 1rem;
          padding-left: 1.5rem;
          position: relative;
          color: var(--text-secondary);
        }

        .ai-targetolog-page .problem-list li::before {
          content: "❌";
          position: absolute;
          left: 0;
          color: #ff4757;
        }

        .ai-targetolog-page .solution-features {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          margin-top: 3rem;
        }

        .ai-targetolog-page .feature-card {
          background: var(--bg-card);
          padding: 2rem;
          border-radius: 12px;
          border: 1px solid #ffffff1a;
          transition: border-color 0.3s;
        }

        .ai-targetolog-page .feature-card:hover {
          border-color: var(--accent-purple);
        }

        .ai-targetolog-page .feature-icon {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }

        .ai-targetolog-page .split-section {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }

        .ai-targetolog-page .feature-list-styled {
          list-style: none;
          padding: 0;
        }

        .ai-targetolog-page .feature-list-styled li {
          margin-bottom: 1.5rem;
        }

        .ai-targetolog-page .feature-list-styled li strong {
          display: block;
          font-size: 1.2rem;
          margin-bottom: 0.5rem;
          color: var(--text-primary);
        }

        .ai-targetolog-page .feature-list-styled li strong::before {
          content: "✦";
          color: var(--accent-purple);
          margin-right: 10px;
        }

        .ai-targetolog-page #logic {
          background-color: var(--bg-secondary);
        }

        .ai-targetolog-page .logic-steps {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 2rem;
          margin-top: 4rem;
        }

        .ai-targetolog-page .logic-step {
          background: var(--bg-card);
          padding: 2rem;
          border-radius: 12px;
          position: relative;
          border-top: 3px solid var(--accent-purple);
        }

        .ai-targetolog-page .step-number {
          position: absolute;
          top: -20px;
          left: 20px;
          background: var(--accent-purple);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-weight: bold;
        }

        .ai-targetolog-page .economics-comparison {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          margin-top: 4rem;
        }

        .ai-targetolog-page .eco-card {
          padding: 3rem;
          border-radius: 16px;
          text-align: center;
        }

        .ai-targetolog-page .eco-card.human {
          background: #1f1f1f;
          border: 1px solid #ff475755;
        }

        .ai-targetolog-page .eco-card.ai {
          background: linear-gradient(145deg, #1a1a1a, #2d1245);
          border: 1px solid var(--accent-purple);
          transform: scale(1.05);
          box-shadow: 0 20px 40px -20px rgba(138, 43, 226, 0.3);
        }

        .ai-targetolog-page .price-point {
          font-size: 1.2rem;
          margin: 1rem 0;
          color: var(--text-secondary);
        }

        .ai-targetolog-page .total-price {
          font-size: 2.5rem;
          font-weight: 800;
          margin: 2rem 0;
          color: var(--text-primary);
        }

        .ai-targetolog-page .result-box {
          background: #00000055;
          padding: 1.5rem;
          border-radius: 8px;
          margin-top: 2rem;
        }

        .ai-targetolog-page .result-box.bad span {
          color: #ff4757;
          font-size: 2rem;
          font-weight: 800;
          display: block;
        }

        .ai-targetolog-page .result-box.good span {
          color: #2ecc71;
          font-size: 3rem;
          font-weight: 800;
          display: block;
        }

        .ai-targetolog-page #pricing {
          text-align: center;
        }

        .ai-targetolog-page .pricing-card {
          background: var(--bg-card);
          max-width: 600px;
          margin: 0 auto;
          padding: 4rem 2rem;
          border-radius: 20px;
          border: 2px solid var(--accent-purple);
        }

        .ai-targetolog-page .price-main {
          font-size: 5rem;
          font-weight: 800;
          line-height: 1;
          color: var(--accent-purple);
        }

        .ai-targetolog-page .price-sub {
          font-size: 1.2rem;
          color: var(--text-secondary);
          margin-bottom: 2rem;
        }

        .ai-targetolog-page .pricing-features {
          text-align: left;
          max-width: 400px;
          margin: 2rem auto;
          list-style: none;
          padding: 0;
        }

        .ai-targetolog-page .pricing-features li {
          margin-bottom: 1rem;
        }

        .ai-targetolog-page .pricing-features li::before {
          content: "✓";
          color: var(--accent-purple);
          margin-right: 10px;
          font-weight: bold;
        }

        .ai-targetolog-page footer {
          background: #000;
          padding: 2rem 0;
          text-align: center;
          color: #555;
        }

        @media (max-width: 768px) {
          .ai-targetolog-page h1 { font-size: 2.5rem; }
          .ai-targetolog-page h2 { font-size: 2rem; }
          .ai-targetolog-page #hero p.hero-sub { font-size: 1.2rem; }
          .ai-targetolog-page .problem-grid,
          .ai-targetolog-page .split-section,
          .ai-targetolog-page .economics-comparison {
            grid-template-columns: 1fr;
          }
          .ai-targetolog-page .eco-card.ai {
            transform: scale(1);
            margin-top: 2rem;
          }
        }
      `}</style>

      <main className="ai-targetolog-page">
        <header className="header-section container">
          <div className="logo">
            AOne <span>Agency</span>
          </div>
          <a href="#pricing" className="btn">
            Попробовать ИИ
          </a>
        </header>

        <section id="hero">
          <div className="container">
            <h1>
              Хватит кормить таргетологов!
              <br />
              Пока они отдыхают — наш AI работает
            </h1>
            <p className="hero-sub">
              Первая в Казахстане Маркетинговая ОС. Замените ручной труд на искусственный интеллект
              и получайте в 2,5 раза больше клиентов при том же бюджете.
            </p>
            <a href="#pricing" className="btn">
              Запустить ИИ-Таргетолога
            </a>
          </div>
        </section>

        <section id="problem">
          <div className="container">
            <div className="section-header">
              <h2>Знакомая ситуация? Вы платите таргетологу 250 000 ₸, а получаете тишину.</h2>
            </div>
            <div className="problem-grid">
              <div className="problem-text">
                <p>
                  Вы платите специалисту зарплату каждый месяц. Он запускает рекламу один раз, а
                  потом исчезает.
                </p>
                <ul className="problem-list">
                  <li>
                    <strong>«Всё идет по плану»:</strong> Вы спрашиваете, как дела, а в ответ
                    слышите про «оптимизацию» и «обучение алгоритмов».
                  </li>
                  <li>
                    <strong>Реальность:</strong> Ваш таргетолог ведет еще 10 проектов параллельно
                    или просто отдыхает, пока ваши деньги капают ему на счет. Он проверяет кабинет
                    раз в неделю.
                  </li>
                  <li>
                    <strong>Итог:</strong> Вы теряете миллионы на неэффективной рекламе и
                    переплачиваете человеку, который просто нажимает кнопки.
                  </li>
                </ul>
                <br />
                <p>
                  <strong>Мы в AOne Agency знаем это изнутри.</strong> За 18 лет мы видели, как 80%
                  рынка паразитируют на бюджетах клиентов. Мы решили это изменить и создали систему,
                  которая работает лучше человека, не спит и не просит зарплату.
                </p>
              </div>
              <div className="problem-image">
                <div className="img-placeholder">
                  [ИЗОБРАЖЕНИЕ: Человек-таргетолог отдыхает на пляже или спит за ноутбуком, пока на
                  фоне горят деньги или график идет вниз. Стиль: легкий киберпанк/неон.]
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="solution">
          <div className="container">
            <div className="section-header">
              <h2>Встречайте ИИ-Таргетолога от AOne Agency</h2>
              <p className="sub-header">
                Это не просто автозапуск. Это полноценная Маркетинговая Операционная Система
                (SaaS).
              </p>
            </div>
            <p style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto" }}>
              Мы оцифровали опыт управления бюджетами более $1 млн и создали многоагентную систему с
              искусственным интеллектом. Это SaaS-платформа, которая полностью заменяет штат
              маркетологов, дизайнеров и аналитиков.
            </p>

            <div className="solution-features">
              <div className="feature-card">
                <div className="feature-icon">🤖</div>
                <h3>Без ошибок</h3>
                <p>
                  Не забудет выключить рекламу на ночь и не перепутает аудитории. Исключен
                  человеческий фактор.
                </p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">💤</div>
                <h3>Без лени</h3>
                <p>Работает 24/7, оптимизируя ставки каждую ночь (08:00-08:30), пока вы спите.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🏖️</div>
                <h3>Без выходных</h3>
                <p>Ему не нужен отпуск, больничный или перерыв на обед. Он всегда в строю.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🧠</div>
                <h3>Чистая математика</h3>
                <p>
                  Принимает решения на основе тысяч сигналов в секунду, а не интуиции.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="features-creative" style={{ background: "var(--bg-secondary)" }}>
          <div className="container split-section">
            <div className="text-block">
              <h2>Мы уволили дизайнеров. Теперь рекламу создает ИИ.</h2>
              <p>
                Раньше мы говорили: «Принесите креативы». Теперь мы говорим:{" "}
                <strong>«Нажмите кнопку»</strong>. Наш модуль <strong>AI-Creative Studio (v3.0)</strong>{" "}
                создает профессиональные рекламные материалы за 1 минуту.
              </p>
              <ul className="feature-list-styled">
                <li>
                  <strong>🎨 Генерация баннеров</strong>
                  ИИ создает дизайны в 5 проверенных стилях. Загрузите фото своего товара — и
                  нейросеть аккуратно впишет его в продающий баннер.
                </li>
                <li>
                  <strong>🔄 Умные карусели</strong>
                  Система сама создает цепочки Stories или постов в Instagram (от 2 до 10 карточек) с
                  единым стилем и сторителлингом.
                </li>
                <li>
                  <strong>✍️ ИИ-Копирайтер</strong>
                  Это не просто ChatGPT. Наш ИИ обучен на тысячах успешных кампаний. Он пишет тексты,
                  которые продают.
                </li>
              </ul>
            </div>
            <div className="image-block">
              <div className="img-placeholder" style={{ height: "500px" }}>
                [ИЗОБРАЖЕНИЕ: Интерфейс "AI-Creative Studio". Показать процесс: слева загружается
                фото товара, справа ИИ выдает 3 готовых стильных рекламных баннера. Футуристичный UI,
                неоновые линии.]
              </div>
            </div>
          </div>
        </section>

        <section id="features-analytics">
          <div className="container split-section">
            <div className="image-block order-last order-md-first">
              <div className="img-placeholder" style={{ height: "500px" }}>
                [ИЗОБРАЖЕНИЕ: Скриншот дашборда Сквозной аналитики. Видна воронка: WhatsApp -&gt;
                AmoCRM -&gt; Продажа 150 000₸. Графики роста денег, а не кликов. Темная тема.]
              </div>
            </div>
            <div className="text-block">
              <h2>Мы считаем деньги в кассе, а не клики в кабинете.</h2>
              <p>
                Вам не нужны отчеты о кликах. Вам нужны продажи. Благодаря обновлению v3.0,
                ИИ-Таргетолог видит, сколько денег принесла каждая реклама.
              </p>
              <ul className="feature-list-styled">
                <li>
                  <strong>🔗 Связка WhatsApp + CRM</strong>
                  Мы соединяем тех, кто написал вам, с базой продаж (AmoCRM).
                </li>
                <li>
                  <strong>💰 Реальная картина</strong>
                  В отчете вы видите воронку: Лид → Квалифицирован → <strong>Продажа (Сумма)</strong>.
                </li>
                <li>
                  <strong>🧠 Умная оптимизация</strong>
                  ИИ автоматически отключает рекламу, которая приносит просто «клики», и масштабирует
                  ту, которая приносит реальные деньги.
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section id="logic">
          <div className="container">
            <div className="section-header">
              <h2>Как работает мозг системы?</h2>
              <p className="sub-header">
                Наш алгоритм — это умная система прогнозирования, которая проверяет ваши кампании
                каждое утро и принимает решения по 4 сценариям.
              </p>
            </div>
            <div className="logic-steps">
              <div className="logic-step">
                <div className="step-number">1</div>
                <h3>«Всё работает»</h3>
                <p>
                  Цена заявки в норме? ИИ не мешает алгоритмам Facebook, позволяя рекламе
                  разгоняться.
                </p>
              </div>
              <div className="logic-step">
                <div className="step-number">2</div>
                <h3>«Просадка»</h3>
                <p>
                  Видит тренд на ухудшение (анализ 3, 7, 15 дней)? ИИ заранее готовит замену
                  креативам.
                </p>
              </div>
              <div className="logic-step">
                <div className="step-number">3</div>
                <h3>«Вампир»</h3>
                <p>
                  Объявление «жрет» бюджет без заявок? ИИ жестко отключает его, спасая ваши деньги.
                </p>
              </div>
              <div className="logic-step">
                <div className="step-number">4</div>
                <h3>«Регенерация»</h3>
                <p>
                  Реклама выгорела? ИИ <strong>сам создает и запускает</strong> новые группы из лучших
                  материалов.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="economics">
          <div className="container">
            <div className="section-header">
              <h2>Представьте: В 2,5 раза больше клиентов за те же деньги!</h2>
              <p className="sub-header">Давайте посчитаем вашу экономику сейчас и с ИИ.</p>
            </div>
            <div className="economics-comparison">
              <div className="eco-card human">
                <h3>Сейчас (с человеком)</h3>
                <div className="price-point">Зарплата таргетолога: 250 000 ₸</div>
                <div className="price-point">Рекламный бюджет: 250 000 ₸</div>
                <div className="total-price" style={{ color: "#ff4757" }}>
                  Расходы: 500 000 ₸
                </div>
                <div className="result-box bad">
                  Результат:
                  <span>~100 заявок</span>
                </div>
                <p style={{ marginTop: "1rem" }}>Половина бюджета уходит в карман сотруднику.</p>
              </div>

              <div className="eco-card ai">
                <h3>С ИИ-Таргетологом AOne</h3>
                <div className="price-point">Зарплата ИИ: 0 ₸ (входит в подписку)</div>
                <div className="price-point">
                  Рекламный бюджет: <strong>500 000 ₸ (x2 рост!)</strong>
                </div>
                <div className="total-price" style={{ color: "var(--accent-purple)" }}>
                  Расходы: 500 000 ₸
                </div>
                <div className="result-box good">
                  Результат:
                  <span>250+ заявок</span>
                </div>
                <p style={{ marginTop: "1rem" }}>
                  Все деньги работают на привлечение клиентов. + Эффективность ИИ.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="pricing" style={{ background: "var(--bg-secondary)" }}>
          <div className="container">
            <div className="section-header">
              <h2>Сколько стоит ИИ-Таргетолог?</h2>
              <p className="sub-header">
                Это в 5 раз дешевле, чем самый дешевый таргетолог-новичок.
              </p>
            </div>
            <div className="pricing-card">
              <h3>Подписка на Маркетинговую ОС</h3>
              <div className="price-main">50 000 ₸</div>
              <div className="price-sub">в месяц</div>

              <ul className="pricing-features">
                <li>🚀 Полный доступ к платформе ИИ-Таргетолог</li>
                <li>📊 Модуль Сквозной Аналитики (CRM + WhatsApp)</li>
                <li>🎨 Стартовый пакет генераций в Creative Studio</li>
                <li>📱 Личный кабинет и Telegram-бот</li>
                <li>⚡ Автоматический онбординг за 1 день</li>
              </ul>

              <Link href="/contacts" className="btn" style={{ width: "100%", marginTop: "2rem" }}>
                Попробовать ИИ-Таргетолога
              </Link>
              <p style={{ fontSize: "0.9rem", marginTop: "1rem" }}>
                Запустите рекламу сегодня: Создайте направление → Сгенерируйте креатив → Нажмите
                Старт
              </p>
            </div>
          </div>
        </section>

        <section id="cta-final">
          <div className="container" style={{ textAlign: "center" }}>
            <h2>Перестаньте спонсировать чужой отдых.</h2>
            <p
              style={{
                fontSize: "1.3rem",
                maxWidth: "700px",
                margin: "0 auto 2rem auto",
              }}
            >
              ИИ-Таргетолог от AOne Agency готов начать работу прямо сейчас. Он не устает, не просит
              повышения и нацелен только на одно — ваши продажи.
            </p>
            <a href="#pricing" className="btn">
              Запустить ИИ сейчас
            </a>
          </div>
        </section>

        <footer>
          <div className="container">
            <div className="logo" style={{ marginBottom: "1rem" }}>
              AOne <span>Agency</span>
            </div>
            <p>© 2025 AOne Agency. Все права защищены. ИИ-Маркетинговая ОС.</p>
          </div>
        </footer>
      </main>

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
              price: "50000",
              priceCurrency: "KZT",
              priceSpecification: {
                "@type": "UnitPriceSpecification",
                price: "50000",
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
    </>
  );
}
