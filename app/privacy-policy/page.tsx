import { defaultMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = {
  ...defaultMetadata,
  title: "Политика конфиденциальности | AOne Agency",
  description:
    "Политика конфиденциальности AOne Agency. Узнайте, как мы собираем, используем и защищаем ваши персональные данные.",
  openGraph: {
    ...defaultMetadata.openGraph,
    title: "Политика конфиденциальности | AOne Agency",
    description:
      "Политика конфиденциальности AOne Agency. Узнайте, как мы собираем, используем и защищаем ваши персональные данные.",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-h1 mb-8 text-text-heading">Политика конфиденциальности</h1>

        <div className="prose prose-lg max-w-none">
          <p className="text-label mb-6">
            <strong>Дата последнего обновления:</strong> 20 ноября 2025 г.
          </p>

          <section className="mb-8">
            <h2 className="text-h2 mb-4 text-text-heading">1. Общие положения</h2>
            <p className="text-label mb-4">
              AOne Agency (далее — «Мы», «Нас», «Наш») обязуется защищать конфиденциальность
              персональных данных пользователей нашего веб-сайта aoneagency.kz (далее — «Сайт»).
            </p>
            <p className="text-label mb-4">
              Настоящая Политика конфиденциальности описывает, как мы собираем, используем,
              храним и защищаем ваши персональные данные в соответствии с законодательством
              Республики Казахстан.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-h2 mb-4 text-text-heading">2. Собираемые данные</h2>
            <p className="text-label mb-4">Мы можем собирать следующие типы данных:</p>
            <ul className="text-label mb-4 list-disc pl-6">
              <li>
                <strong>Персональные данные:</strong> имя, фамилия, номер телефона, адрес
                электронной почты
              </li>
              <li>
                <strong>Технические данные:</strong> IP-адрес, тип браузера, операционная
                система, разрешение экрана
              </li>
              <li>
                <strong>Данные о поведении:</strong> страницы, которые вы посещаете, время,
                проведенное на сайте, источники трафика
              </li>
              <li>
                <strong>Данные форм:</strong> информация, которую вы предоставляете через формы
                обратной связи
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-h2 mb-4 text-text-heading">3. Цели использования данных</h2>
            <p className="text-label mb-4">Мы используем собранные данные для:</p>
            <ul className="text-label mb-4 list-disc pl-6">
              <li>Обработки ваших запросов и заявок</li>
              <li>Связи с вами по вопросам предоставления услуг</li>
              <li>Улучшения качества нашего сайта и услуг</li>
              <li>Анализа поведения пользователей для оптимизации контента</li>
              <li>Отправки маркетинговых материалов (только с вашего согласия)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-h2 mb-4 text-text-heading">4. Защита данных</h2>
            <p className="text-label mb-4">
              Мы применяем современные технические и организационные меры для защиты ваших
              персональных данных от несанкционированного доступа, изменения, раскрытия или
              уничтожения.
            </p>
            <p className="text-label mb-4">
              Все данные передаются по защищенному протоколу HTTPS. Мы не передаем ваши
              персональные данные третьим лицам без вашего явного согласия, за исключением
              случаев, предусмотренных законодательством.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-h2 mb-4 text-text-heading">5. Использование cookies</h2>
            <p className="text-label mb-4">
              Наш сайт использует cookies и аналогичные технологии для улучшения пользовательского
              опыта. Подробная информация о использовании cookies представлена в нашей{" "}
              <a href="/cookie-policy" className="text-primary hover:underline">
                Политике использования cookies
              </a>
              .
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-h2 mb-4 text-text-heading">6. Ваши права</h2>
            <p className="text-label mb-4">Вы имеете право:</p>
            <ul className="text-label mb-4 list-disc pl-6">
              <li>Получать информацию о том, какие ваши данные мы обрабатываем</li>
              <li>Требовать исправления неточных данных</li>
              <li>Требовать удаления ваших персональных данных</li>
              <li>Отозвать согласие на обработку данных</li>
              <li>Ограничить обработку ваших данных</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-h2 mb-4 text-text-heading">7. Хранение данных</h2>
            <p className="text-label mb-4">
              Мы храним ваши персональные данные только в течение времени, необходимого для
              достижения целей, указанных в настоящей Политике, или в течение срока, установленного
              законодательством.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-h2 mb-4 text-text-heading">8. Контакты</h2>
            <p className="text-label mb-4">
              Если у вас есть вопросы относительно настоящей Политики конфиденциальности или вы
              хотите реализовать свои права, пожалуйста, свяжитесь с нами:
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

          <section className="mb-8">
            <h2 className="text-h2 mb-4 text-text-heading">9. Изменения в Политике</h2>
            <p className="text-label mb-4">
              Мы оставляем за собой право вносить изменения в настоящую Политику
              конфиденциальности. Все изменения вступают в силу с момента их публикации на данной
              странице. Рекомендуем периодически проверять эту страницу на наличие обновлений.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

