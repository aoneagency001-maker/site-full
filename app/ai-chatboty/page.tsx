import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AI-чат-боты для Telegram, WhatsApp, Instagram — AOne Agency Алматы",
  description:
    "Разработка AI-чат-ботов для Telegram, WhatsApp, Instagram от 150 000 ₸. Автоматизация обработки заявок 24/7. Интеграция с CRM и мессенджерами.",
  keywords: "AI чат-бот, Telegram бот, WhatsApp бот, Instagram бот, автоматизация заявок, чат-бот для бизнеса, Алматы",
  openGraph: {
    title: "AI-чат-боты для бизнеса — AOne Agency",
    description: "Умные боты для Telegram, WhatsApp, Instagram. Обработка заявок 24/7, интеграция с CRM от 150 000 ₸",
    locale: "ru_RU",
  },
};

export default function ChatbotsPage() {
  return (
    <main className="bg-white">
      <article className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="py-6 text-sm text-gray-600">
          <Link href="/" className="hover:text-blue-600">
            Главная
          </Link>
          <span className="mx-2">/</span>
          <Link href="/#services" className="hover:text-blue-600">
            Услуги
          </Link>
          <span className="mx-2">/</span>
          <span>AI-чат-боты</span>
        </nav>

        {/* Hero Section */}
        <header className="py-12 mb-16">
          <div className="inline-block px-4 py-2 bg-pink-100 rounded-full text-pink-700 text-sm font-semibold mb-4">
            🤖 Telegram • WhatsApp • Instagram
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            AI-чат-боты для автоматизации бизнеса
          </h1>
          <p className="text-xl text-gray-700 leading-relaxed mb-8 max-w-3xl">
            Умные боты для Telegram, WhatsApp, Instagram. Обработка заявок 24/7, интеграция с CRM, автоматические ответы на частые вопросы.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/contacts"
              className="bg-pink-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-pink-600 transition-all"
            >
              Заказать бота →
            </Link>
            <Link
              href="#process"
              className="bg-gray-100 text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-200 transition-all"
            >
              Как это работает
            </Link>
          </div>
        </header>

        {/* What is it */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Что такое AI-чат-бот?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-700 mb-4 leading-relaxed">
                <strong>AI-чат-бот</strong> — это умный виртуальный помощник, который автоматически общается с вашими клиентами в мессенджерах (Telegram, WhatsApp, Instagram).
              </p>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Бот работает 24/7, мгновенно отвечает на вопросы, принимает заявки, консультирует по товарам и услугам, записывает на встречи — всё без участия менеджера.
              </p>
              <p className="text-gray-700 leading-relaxed">
                С помощью искусственного интеллекта бот понимает естественный язык (русский, казахский, английский), распознает намерения клиента и предлагает релевантные решения.
              </p>
            </div>
            <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Возможности AI-бота:</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-pink-500 mr-2">✓</span>
                  <span className="text-gray-700">Ответы на частые вопросы</span>
                </li>
                <li className="flex items-start">
                  <span className="text-pink-500 mr-2">✓</span>
                  <span className="text-gray-700">Приём и квалификация заявок</span>
                </li>
                <li className="flex items-start">
                  <span className="text-pink-500 mr-2">✓</span>
                  <span className="text-gray-700">Интеграция с CRM (amoCRM, Bitrix24)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-pink-500 mr-2">✓</span>
                  <span className="text-gray-700">Отправка уведомлений и рассылок</span>
                </li>
                <li className="flex items-start">
                  <span className="text-pink-500 mr-2">✓</span>
                  <span className="text-gray-700">Оплата заказов прямо в чате</span>
                </li>
                <li className="flex items-start">
                  <span className="text-pink-500 mr-2">✓</span>
                  <span className="text-gray-700">Аналитика и отчёты</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Who needs it */}
        <section className="mb-16 bg-gray-50 rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Кому нужен AI-чат-бот?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6">
              <div className="text-3xl mb-4">🛒</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">E-commerce</h3>
              <p className="text-gray-700">
                Консультация по товарам, приём заказов, информация о доставке, обработка возвратов.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6">
              <div className="text-3xl mb-4">💼</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">B2B-компании</h3>
              <p className="text-gray-700">
                Квалификация лидов, запись на встречи, отправка коммерческих предложений, CRM-интеграция.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6">
              <div className="text-3xl mb-4">📚</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Образование</h3>
              <p className="text-gray-700">
                Запись на курсы, выдача материалов, напоминания о занятиях, обратная связь.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6">
              <div className="text-3xl mb-4">🏥</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Медицина и салоны</h3>
              <p className="text-gray-700">
                Запись на приём, напоминания о визитах, консультации, отзывы.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6">
              <div className="text-3xl mb-4">🍕</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Рестораны и доставка</h3>
              <p className="text-gray-700">
                Приём заказов, меню, статус доставки, бронирование столов, акции.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6">
              <div className="text-3xl mb-4">🏢</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Агентства и услуги</h3>
              <p className="text-gray-700">
                Консультации, расчёт стоимости, портфолио, запись на встречи.
              </p>
            </div>
          </div>
        </section>

        {/* Process */}
        <section id="process" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Как мы создаём AI-чат-бота</h2>
          <div className="space-y-6">
            {[
              {
                step: 1,
                title: "Анализ и постановка задач",
                description: "Изучаем ваш бизнес, целевую аудиторию, частые вопросы клиентов. Определяем функционал бота и KPI.",
                duration: "1-2 дня",
              },
              {
                step: 2,
                title: "Проектирование диалогов",
                description: "Создаём сценарии общения (скрипты), структуру меню, логику ответов на вопросы. Согласовываем с вами.",
                duration: "2-3 дня",
              },
              {
                step: 3,
                title: "Разработка и обучение AI",
                description: "Программируем бота, обучаем нейросеть на ваших данных, настраиваем распознавание естественного языка.",
                duration: "5-7 дней",
              },
              {
                step: 4,
                title: "Интеграция с CRM и сервисами",
                description: "Подключаем бота к amoCRM/Bitrix24, платёжным системам, базам данных, другим инструментам.",
                duration: "2-3 дня",
              },
              {
                step: 5,
                title: "Тестирование и запуск",
                description: "Проверяем все сценарии, исправляем ошибки, обучаем вашу команду работе с ботом. Запускаем в продакшн.",
                duration: "1-2 дня",
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                  {item.step}
                </div>
                <div className="flex-1 bg-white border-2 border-gray-200 rounded-xl p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
                    <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                      {item.duration}
                    </span>
                  </div>
                  <p className="text-gray-700">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 bg-pink-50 border-2 border-pink-200 rounded-xl p-6">
            <p className="text-gray-900">
              <strong>Общий срок:</strong> 11-17 рабочих дней + поддержка и доработки после запуска
            </p>
          </div>
        </section>

        {/* Cases */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Примеры наших ботов</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8">
              <div className="text-4xl mb-4">🛍️</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Telegram-бот для интернет-магазина</h3>
              <p className="text-gray-700 mb-6">
                Каталог из 500+ товаров, корзина, оплата, отслеживание заказа. Бот обрабатывает 200+ заказов в день без участия менеджера.
              </p>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  <strong>Результат:</strong> −70% нагрузки на поддержку
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Время ответа:</strong> &lt;5 секунд
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Конверсия:</strong> +25%
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8">
              <div className="text-4xl mb-4">💆‍♀️</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">WhatsApp-бот для салона красоты</h3>
              <p className="text-gray-700 mb-6">
                Онлайн-запись к мастерам, напоминания о визитах, отзывы, программа лояльности. Интеграция с amoCRM.
              </p>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  <strong>Результат:</strong> +40% повторных визитов
                </p>
                <p className="text-sm text-gray-600">
                  <strong>No-show rate:</strong> −60%
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Автоматизация:</strong> 90% записей
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Стоимость разработки</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Базовый</h3>
              <div className="text-3xl font-bold text-pink-500 mb-6">150 000 ₸</div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-700">Один мессенджер</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-700">До 20 сценариев</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-700">База знаний (FAQ)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-700">Админ-панель</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-700">30 дней поддержки</span>
                </li>
              </ul>
              <Link
                href="/contacts"
                className="block text-center bg-gray-100 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-all"
              >
                Заказать
              </Link>
            </div>

            <div className="bg-gradient-to-br from-pink-500 to-purple-600 text-white rounded-2xl p-8 relative">
              <div className="absolute -top-4 right-4 bg-yellow-400 text-gray-900 px-4 py-1 rounded-full text-sm font-bold">
                Популярный
              </div>
              <h3 className="text-xl font-bold mb-4">Стандарт</h3>
              <div className="text-3xl font-bold mb-6">250 000 ₸</div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>2-3 мессенджера</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>До 50 сценариев</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>AI-распознавание языка</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Интеграция с CRM</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Рассылки и уведомления</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Аналитика и отчёты</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>90 дней поддержки</span>
                </li>
              </ul>
              <Link
                href="/contacts"
                className="block text-center bg-white text-pink-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all"
              >
                Заказать →
              </Link>
            </div>

            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Премиум</h3>
              <div className="text-3xl font-bold text-pink-500 mb-6">от 400 000 ₸</div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-700">Все мессенджеры</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-700">Неограниченно сценариев</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-700">Собственная ML-модель</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-700">Интеграция с любыми API</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-700">Голосовые сообщения</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-700">Мультиязычность</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-700">12 месяцев поддержки</span>
                </li>
              </ul>
              <Link
                href="/contacts"
                className="block text-center bg-gray-100 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-all"
              >
                Обсудить проект
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Частые вопросы</h2>
          <div className="space-y-4">
            {[
              {
                q: "Сколько времени занимает разработка бота?",
                a: "От 2 до 4 недель в зависимости от сложности. Базовый бот — 2 недели, сложные проекты с ML — до 2 месяцев.",
              },
              {
                q: "Можно ли интегрировать бота с нашей CRM?",
                a: "Да, мы интегрируем с amoCRM, Bitrix24, 1C, custom CRM через API. Заявки из бота автоматически попадают в вашу систему.",
              },
              {
                q: "Нужен ли технический специалист в нашей команде?",
                a: "Нет, бот работает автономно через админ-панель. Мы обучим вашу команду за 1-2 часа. Техподдержка включена.",
              },
              {
                q: "Что будет после запуска?",
                a: "Мы предоставляем гарантийную поддержку (30-90 дней), обучаем бота на реальных диалогах, добавляем новые сценарии при необходимости.",
              },
              {
                q: "Можно ли попробовать бота перед заказом?",
                a: "Да! Напишите нам — покажем демо-версию и кейсы из вашей ниши. Также можем сделать MVP (минимальную версию) для теста.",
              },
              {
                q: "Поддерживает ли бот казахский язык?",
                a: "Да, наши боты работают с русским, казахским и английским языками. Можем добавить и другие по запросу.",
              },
            ].map((item, index) => (
              <details
                key={index}
                className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-pink-300 transition-colors"
              >
                <summary className="font-bold text-gray-900 cursor-pointer">
                  {item.q}
                </summary>
                <p className="mt-4 text-gray-700 leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mb-16 bg-gradient-to-br from-pink-500 to-purple-600 text-white rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Готовы автоматизировать общение с клиентами?</h2>
          <p className="text-xl mb-8 opacity-90">
            Получите бесплатную консультацию и расчёт стоимости для вашего проекта
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contacts"
              className="bg-white text-pink-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all"
            >
              Заказать бота
            </Link>
            <a
              href={`https://wa.me/77473854493?text=${encodeURIComponent("Здравствуйте! Интересует разработка AI-чат-бота.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-600 transition-all"
            >
              Написать в WhatsApp
            </a>
          </div>
        </section>

        {/* Related Services */}
        <section className="mb-16 bg-gray-50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Другие услуги</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <Link
              href="/crm-avtomatizaciya"
              className="bg-white p-6 rounded-lg hover:shadow-lg transition-all"
            >
              <h4 className="font-bold text-gray-900 mb-2">CRM-автоматизация</h4>
              <p className="text-sm text-gray-600">amoCRM, Bitrix24, интеграции</p>
            </Link>
            <Link
              href="/targetirovannaya-reklama"
              className="bg-white p-6 rounded-lg hover:shadow-lg transition-all"
            >
              <h4 className="font-bold text-gray-900 mb-2">Таргетированная реклама</h4>
              <p className="text-sm text-gray-600">Instagram, TikTok, Facebook</p>
            </Link>
            <Link
              href="/razrabotka-prilozhenij"
              className="bg-white p-6 rounded-lg hover:shadow-lg transition-all"
            >
              <h4 className="font-bold text-gray-900 mb-2">Разработка приложений</h4>
              <p className="text-sm text-gray-600">iOS, Android, Flutter</p>
            </Link>
          </div>
        </section>
      </article>

      {/* Schema.org markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "AI-чат-боты для бизнеса",
            "description": "Разработка умных чат-ботов для Telegram, WhatsApp, Instagram. Автоматизация обработки заявок 24/7.",
            "provider": {
              "@type": "Organization",
              "name": "AOne Agency",
              "telephone": "+7-747-385-4493",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "проспект Назарбаева 103",
                "addressLocality": "Алматы",
                "addressCountry": "KZ"
              }
            },
            "areaServed": {
              "@type": "City",
              "name": "Алматы"
            },
            "offers": {
              "@type": "Offer",
              "price": "150000",
              "priceCurrency": "KZT",
              "description": "Разработка AI-чат-бота от 150 000 тенге"
            }
          }),
        }}
      />
    </main>
  );
}
