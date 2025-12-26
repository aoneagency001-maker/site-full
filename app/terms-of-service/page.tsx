import { defaultMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = {
  ...defaultMetadata,
  title: "Условия использования | AOne Agency",
  description:
    "Условия использования сайта AOne Agency. Ознакомьтесь с правилами использования нашего веб-сайта и услуг.",
  openGraph: {
    ...defaultMetadata.openGraph,
    title: "Условия использования | AOne Agency",
    description:
      "Условия использования сайта AOne Agency. Ознакомьтесь с правилами использования нашего веб-сайта и услуг.",
  },
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-h1 mb-8 text-text-heading">Условия использования</h1>

        <div className="prose prose-lg max-w-none">
          <p className="text-label mb-6">
            <strong>Дата последнего обновления:</strong> 20 ноября 2025 г.
          </p>

          <section className="mb-8">
            <h2 className="text-h2 mb-4 text-text-heading">1. Принятие условий</h2>
            <p className="text-label mb-4">
              Используя веб-сайт aoneagency.kz (далее — «Сайт»), вы соглашаетесь с настоящими
              Условиями использования. Если вы не согласны с какими-либо условиями, пожалуйста, не
              используйте наш Сайт.
            </p>
            <p className="text-label mb-4">
              AOne Agency (далее — «Мы», «Нас», «Наш») оставляет за собой право изменять настоящие
              Условия в любое время без предварительного уведомления.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-h2 mb-4 text-text-heading">2. Использование сайта</h2>
            <p className="text-label mb-4">Вы обязуетесь:</p>
            <ul className="text-label mb-4 list-disc pl-6">
              <li>Использовать Сайт только в законных целях</li>
              <li>Не нарушать права интеллектуальной собственности</li>
              <li>Не распространять вредоносное программное обеспечение</li>
              <li>Не пытаться получить несанкционированный доступ к системам</li>
              <li>Не использовать Сайт для спама или рассылки нежелательных сообщений</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-h2 mb-4 text-text-heading">3. Интеллектуальная собственность</h2>
            <p className="text-label mb-4">
              Все материалы, размещенные на Сайте, включая тексты, изображения, логотипы, графику,
              дизайн и программный код, являются собственностью AOne Agency или наших партнеров и
              защищены законами об интеллектуальной собственности.
            </p>
            <p className="text-label mb-4">
              Вы не имеете права копировать, распространять, модифицировать или использовать
              материалы Сайта без письменного разрешения AOne Agency.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-h2 mb-4 text-text-heading">4. Предоставление услуг</h2>
            <p className="text-label mb-4">
              AOne Agency предоставляет маркетинговые услуги, включая:
            </p>
            <ul className="text-label mb-4 list-disc pl-6">
              <li>Таргетированная реклама (Instagram, TikTok, Facebook)</li>
              <li>Контекстная реклама (Google Ads, Yandex.Direct)</li>
              <li>SEO продвижение</li>
              <li>Разработка мобильных приложений</li>
              <li>CRM автоматизация</li>
              <li>AI чат-боты и автоматизация</li>
            </ul>
            <p className="text-label mb-4">
              Условия предоставления конкретных услуг определяются отдельными договорами и
              соглашениями.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-h2 mb-4 text-text-heading">5. Ограничение ответственности</h2>
            <p className="text-label mb-4">AOne Agency не несет ответственности за:</p>
            <ul className="text-label mb-4 list-disc pl-6">
              <li>Любые прямые или косвенные убытки, возникшие в результате использования Сайта</li>
              <li>Временную недоступность Сайта по техническим причинам</li>
              <li>Действия третьих лиц, включая хакерские атаки</li>
              <li>Точность информации, предоставленной пользователями</li>
            </ul>
            <p className="text-label mb-4">
              Мы прилагаем все усилия для обеспечения стабильной работы Сайта, но не гарантируем его
              бесперебойную работу.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-h2 mb-4 text-text-heading">6. Ссылки на сторонние сайты</h2>
            <p className="text-label mb-4">
              Наш Сайт может содержать ссылки на сторонние веб-сайты. Мы не контролируем и не несем
              ответственности за содержание, политику конфиденциальности или практики этих сайтов.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-h2 mb-4 text-text-heading">7. Пользовательский контент</h2>
            <p className="text-label mb-4">
              Если вы отправляете нам контент через формы обратной связи или другими способами, вы
              предоставляете нам неисключительное право использовать, воспроизводить, модифицировать
              и распространять этот контент в целях предоставления услуг.
            </p>
            <p className="text-label mb-4">
              Вы гарантируете, что имеете все необходимые права на предоставляемый контент и что он
              не нарушает права третьих лиц.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-h2 mb-4 text-text-heading">8. Расторжение</h2>
            <p className="text-label mb-4">
              Мы оставляем за собой право прекратить или приостановить ваш доступ к Сайту в любое
              время без предварительного уведомления, если вы нарушаете настоящие Условия
              использования.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-h2 mb-4 text-text-heading">9. Применимое право</h2>
            <p className="text-label mb-4">
              Настоящие Условия использования регулируются законодательством Республики Казахстан.
              Любые споры подлежат разрешению в судах Республики Казахстан.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-h2 mb-4 text-text-heading">10. Контакты</h2>
            <p className="text-label mb-4">
              Если у вас есть вопросы относительно настоящих Условий использования, пожалуйста,
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
