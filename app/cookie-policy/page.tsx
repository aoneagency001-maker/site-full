import { defaultMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = {
  ...defaultMetadata,
  title: "Политика использования cookies | AOne Agency",
  description:
    "Политика использования cookies на сайте AOne Agency. Узнайте, какие cookies мы используем и как управлять их настройками.",
  openGraph: {
    ...defaultMetadata.openGraph,
    title: "Политика использования cookies | AOne Agency",
    description:
      "Политика использования cookies на сайте AOne Agency. Узнайте, какие cookies мы используем и как управлять их настройками.",
  },
};

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-h1 mb-8 text-text-heading">Политика использования cookies</h1>

        <div className="prose prose-lg max-w-none">
          <p className="text-label mb-6">
            <strong>Дата последнего обновления:</strong> 20 ноября 2025 г.
          </p>

          <section className="mb-8">
            <h2 className="text-h2 mb-4 text-text-heading">1. Что такое cookies?</h2>
            <p className="text-label mb-4">
              Cookies — это небольшие текстовые файлы, которые сохраняются на вашем устройстве
              (компьютере, планшете или мобильном телефоне) при посещении веб-сайтов. Cookies
              позволяют сайту запоминать ваши действия и предпочтения на определенный период
              времени.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-h2 mb-4 text-text-heading">2. Как мы используем cookies</h2>
            <p className="text-label mb-4">
              Наш сайт aoneagency.kz использует cookies для следующих целей:
            </p>
            <ul className="text-label mb-4 list-disc pl-6">
              <li>
                <strong>Необходимые cookies:</strong> обеспечивают базовую функциональность сайта
                (например, сохранение настроек языка)
              </li>
              <li>
                <strong>Аналитические cookies:</strong> помогают нам понять, как посетители
                используют сайт (Google Analytics, Yandex.Metrika)
              </li>
              <li>
                <strong>Функциональные cookies:</strong> запоминают ваши предпочтения и настройки
              </li>
              <li>
                <strong>Маркетинговые cookies:</strong> используются для отслеживания эффективности
                рекламных кампаний
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-h2 mb-4 text-text-heading">3. Типы используемых cookies</h2>

            <div className="mb-6">
              <h3 className="text-h3 mb-3 text-text-heading">Необходимые cookies</h3>
              <p className="text-label mb-4">
                Эти cookies необходимы для работы сайта и не могут быть отключены. Они обычно
                устанавливаются в ответ на ваши действия, такие как заполнение форм или настройка
                параметров конфиденциальности.
              </p>
              <ul className="text-label mb-4 list-disc pl-6">
                <li>Сохранение сессии пользователя</li>
                <li>Запоминание настроек языка</li>
                <li>Безопасность и защита от мошенничества</li>
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="text-h3 mb-3 text-text-heading">Аналитические cookies</h3>
              <p className="text-label mb-4">
                Эти cookies помогают нам понять, как посетители взаимодействуют с нашим сайтом,
                собирая и сообщая информацию анонимно.
              </p>
              <ul className="text-label mb-4 list-disc pl-6">
                <li>
                  <strong>Google Analytics:</strong> отслеживание посещений, источников трафика,
                  поведения пользователей
                </li>
                <li>
                  <strong>Yandex.Metrika:</strong> анализ трафика, карта кликов, вебвизор
                </li>
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="text-h3 mb-3 text-text-heading">Функциональные cookies</h3>
              <p className="text-label mb-4">
                Эти cookies позволяют сайту запоминать сделанный вами выбор и предоставлять
                улучшенные персонализированные функции.
              </p>
              <ul className="text-label mb-4 list-disc pl-6">
                <li>Сохранение предпочтений пользователя</li>
                <li>Запоминание информации из форм</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-h2 mb-4 text-text-heading">4. Управление cookies</h2>
            <p className="text-label mb-4">
              Вы можете управлять настройками cookies через настройки вашего браузера. Большинство
              браузеров позволяют:
            </p>
            <ul className="text-label mb-4 list-disc pl-6">
              <li>Просматривать, какие cookies установлены</li>
              <li>Удалять отдельные cookies или все cookies</li>
              <li>Блокировать cookies от определенных сайтов</li>
              <li>Блокировать все cookies</li>
              <li>Удалять все cookies при закрытии браузера</li>
            </ul>
            <p className="text-label mb-4">
              Обратите внимание, что отключение cookies может повлиять на функциональность сайта
              и ухудшить ваш пользовательский опыт.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-h2 mb-4 text-text-heading">5. Инструкции по управлению cookies</h2>
            <div className="mb-4">
              <h3 className="text-h3 mb-2 text-text-heading">Google Chrome</h3>
              <p className="text-label mb-4">
                Настройки → Конфиденциальность и безопасность → Файлы cookie и другие данные сайтов
              </p>
            </div>
            <div className="mb-4">
              <h3 className="text-h3 mb-2 text-text-heading">Mozilla Firefox</h3>
              <p className="text-label mb-4">
                Настройки → Приватность и защита → Файлы cookie и данные сайтов
              </p>
            </div>
            <div className="mb-4">
              <h3 className="text-h3 mb-2 text-text-heading">Safari</h3>
              <p className="text-label mb-4">
                Настройки → Конфиденциальность → Управление данными веб-сайтов
              </p>
            </div>
            <div className="mb-4">
              <h3 className="text-h3 mb-2 text-text-heading">Microsoft Edge</h3>
              <p className="text-label mb-4">
                Настройки → Файлы cookie и разрешения сайтов → Файлы cookie и данные сайтов
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-h2 mb-4 text-text-heading">6. Cookies третьих сторон</h2>
            <p className="text-label mb-4">
              Некоторые cookies на нашем сайте устанавливаются третьими сторонами, такими как:
            </p>
            <ul className="text-label mb-4 list-disc pl-6">
              <li>
                <strong>Google Analytics:</strong> для анализа трафика и поведения пользователей
              </li>
              <li>
                <strong>Yandex.Metrika:</strong> для аналитики и отслеживания конверсий
              </li>
            </ul>
            <p className="text-label mb-4">
              Эти сторонние сервисы имеют свои собственные политики конфиденциальности и условия
              использования. Мы рекомендуем ознакомиться с ними.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-h2 mb-4 text-text-heading">7. Срок хранения cookies</h2>
            <p className="text-label mb-4">
              Различные cookies хранятся в течение разных периодов времени:
            </p>
            <ul className="text-label mb-4 list-disc pl-6">
              <li>
                <strong>Сессионные cookies:</strong> удаляются при закрытии браузера
              </li>
              <li>
                <strong>Постоянные cookies:</strong> остаются на вашем устройстве в течение
                определенного периода (обычно от 30 дней до 2 лет)
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-h2 mb-4 text-text-heading">8. Изменения в Политике</h2>
            <p className="text-label mb-4">
              Мы можем периодически обновлять настоящую Политику использования cookies. Все
              изменения вступают в силу с момента их публикации на данной странице. Рекомендуем
              периодически проверять эту страницу на наличие обновлений.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-h2 mb-4 text-text-heading">9. Контакты</h2>
            <p className="text-label mb-4">
              Если у вас есть вопросы относительно использования cookies на нашем сайте, пожалуйста,
              свяжитесь с нами:
            </p>
            <ul className="text-label mb-4 list-none pl-0">
              <li>
                <strong>Email:</strong>{" "}
                <a href="mailto:info@aoneagency.kz" className="text-primary hover:underline">
                  info@aoneagency.kz
                </a>
              </li>
              <li>
                <strong>Телефон:</strong>{" "}
                <a href="tel:+77473854493" className="text-primary hover:underline">
                  +7 747 385 4493
                </a>
              </li>
              <li>
                <strong>Адрес:</strong> проспект Назарбаева 103, Алматы, 050000, Казахстан
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}

