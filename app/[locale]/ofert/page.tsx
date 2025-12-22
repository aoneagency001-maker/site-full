import { defaultMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = {
  ...defaultMetadata,
  title: "Публичная оферта | AOne Agency",
  description:
    "Публичная оферта на заключение договора о предоставлении доступа к программному сервису «AI-таргетолог» от ТОО A-One Agency.",
  openGraph: {
    ...defaultMetadata.openGraph,
    title: "Публичная оферта | AOne Agency",
    description:
      "Публичная оферта на заключение договора о предоставлении доступа к программному сервису «AI-таргетолог» от ТОО A-One Agency.",
  },
};

export default function OfertPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-h1 mb-4 text-text-heading">ПУБЛИЧНАЯ ОФЕРТА</h1>
          <p className="text-label text-text-body">
            на заключение договора о предоставлении доступа к программному сервису «AI-таргетолог»
          </p>
          <p className="text-label text-text-body mt-4">
            <strong>г. Астана</strong>
          </p>
          <p className="text-label text-text-body/60 mt-2">
            <em>Дата публикации: 1 ноября 2024 г.</em>
          </p>
        </div>

        <div className="prose prose-lg max-w-none space-y-8">
          <section>
            <p className="text-label mb-4 leading-relaxed">
              Товарищество с ограниченной ответственностью <strong>«A-One Agency»</strong>, именуемое в дальнейшем{" "}
              <strong>«Исполнитель»</strong>, в лице Директора Копылова Николая Викторовича, действующего на основании Устава,
              публикует настоящую Публичную оферту (далее — «Оферта») о предоставлении неисключительного права использования (доступа)
              к программному обеспечению (AI-агенту) для автоматизации рекламной деятельности.
            </p>
            <p className="text-label leading-relaxed">
              Настоящий документ является официальным предложением (публичной офертой) в соответствии со ст. 395 Гражданского кодекса
              Республики Казахстан.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-h2 mb-4 text-text-heading">1. ТЕРМИНЫ И ОПРЕДЕЛЕНИЯ</h2>
            <div className="space-y-3">
              <p className="text-label">
                <strong>1.1. Заказчик</strong> — любое физическое или юридическое лицо, принявшее (акцептовавшее) условия настоящей Оферты.
              </p>
              <p className="text-label">
                <strong>1.2. Акцепт</strong> — полное и безоговорочное принятие условий Оферты путем осуществления оплаты услуг Исполнителя.
              </p>
              <p className="text-label">
                <strong>1.3. AI-агент / Сервис</strong> — программное решение (SaaS) Исполнителя для автоматизации таргетированной рекламы
                в Facebook/Instagram, включающее инструменты генерации контента и аналитики.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-h2 mb-4 text-text-heading">2. ПРЕДМЕТ ДОГОВОРА</h2>
            <div className="space-y-3">
              <p className="text-label">
                <strong>2.1.</strong> Исполнитель предоставляет Заказчику удаленный доступ к программному сервису «AI-таргетолог»
                (далее — «Сервис») и оказывает сопутствующие услуги по его настройке и технической поддержке, а Заказчик обязуется принять
                и оплатить их.
              </p>
              <p className="text-label">
                <strong>2.2.</strong> Функционал Сервиса и перечень сопутствующих услуг включают:
              </p>
              <ul className="text-label list-disc pl-6 space-y-2">
                <li>Предоставление доступа к AI-агенту, размещенному на сервере Исполнителя;</li>
                <li>Настройка модулей автоматического создания и оптимизации рекламных кампаний в Facebook;</li>
                <li><strong>Генерация рекламных креативов (изображений и текстов) с помощью нейросетей;</strong></li>
                <li><strong>Мониторинг рекламной активности конкурентов;</strong></li>
                <li>Настройка и поддержка ежедневной отчетности через Telegram-бота;</li>
                <li>Техническая поддержка стратегии и промптов (сценариев) агента;</li>
                <li>Доступ к мини-приложению в Telegram для просмотра статистики.</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-h2 mb-4 text-text-heading">3. СТОИМОСТЬ И ПОРЯДОК РАСЧЕТОВ</h2>
            <div className="space-y-3">
              <p className="text-label">
                <strong>3.1.</strong> Стоимость доступа к Сервису определяется тарифами, указанными на сайте:
              </p>
              <ul className="text-label list-disc pl-6 space-y-2">
                <li>
                  <strong>Тариф «Старт» (Внедрение + 1 месяц доступа):</strong> 100 000 (сто тысяч) тенге (единоразовый платеж).
                </li>
                <li>
                  <strong>Тариф «Подписка» (Ежемесячная поддержка):</strong> 49 000 (сорок девять тысяч) тенге в месяц за 1 аккаунт
                  (начиная со второго месяца).
                </li>
              </ul>
              <p className="text-label">
                <strong>3.2.</strong> Оплата производится в порядке 100% предоплаты.
              </p>
              <p className="text-label">
                <strong>3.3.</strong> Услуги не облагаются НДС в связи с применением Исполнителем упрощенной системы налогообложения.
              </p>
              <p className="text-label">
                <strong>3.4. Особые условия платежа:</strong> При осуществлении безналичной оплаты Заказчик обязан указывать{" "}
                <strong>Код назначения платежа (КНП) — 858</strong> («Услуги в области компьютерного программирования, консультационные
                и сопутствующие услуги»).
              </p>
              <p className="text-label">
                <strong>3.5.</strong> В назначении платежа указывается: <em>«Оплата за предоставление доступа к сервису AI-таргетолог
                и техническое сопровождение согласно Оферте»</em>.
              </p>
              <p className="text-label">
                <strong>3.6.</strong> В случае расторжения Договора по инициативе Заказчика средства за оплаченный период доступа
                возврату не подлежат.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-h2 mb-4 text-text-heading">4. СРОКИ И ПОРЯДОК ПОДКЛЮЧЕНИЯ</h2>
            <div className="space-y-3">
              <p className="text-label">
                <strong>4.1.</strong> Срок первичного подключения и настройки доступа к Сервису составляет до{" "}
                <strong>48 (сорока восьми) часов</strong> на 1 аккаунт с момента поступления оплаты и предоставления Заказчиком всех
                необходимых данных (заполнения брифа).
              </p>
              <p className="text-label">
                <strong>4.2.</strong> Срок может быть увеличен при возникновении технических ограничений со стороны сторонних платформ
                (Meta/Facebook), не зависящих от Исполнителя.
              </p>
              <p className="text-label">
                <strong>4.3.</strong> Услуги считаются оказанными надлежащим образом, а доступ — предоставленным, если в течение
                5 (пяти) календарных дней после окончания оплаченного периода от Заказчика не поступило мотивированного письменного отказа.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-h2 mb-4 text-text-heading">5. ПРАВА И ОБЯЗАННОСТИ СТОРОН</h2>
            <div className="space-y-4">
              <div>
                <p className="text-label font-semibold mb-2">5.1. Исполнитель обязуется:</p>
                <ul className="text-label list-disc pl-6 space-y-1">
                  <li>Обеспечивать бесперебойную работу Сервиса и техническое сопровождение мини-приложения в Telegram.</li>
                  <li>Оказывать консультационную поддержку по генерации сценариев для креативов.</li>
                </ul>
              </div>
              <div>
                <p className="text-label font-semibold mb-2">5.2. Заказчик обязуется:</p>
                <ul className="text-label list-disc pl-6 space-y-1">
                  <li>Предоставить доступы к рекламным кабинетам, необходимые для интеграции Сервиса.</li>
                  <li>Обеспечивать наличие рекламного бюджета на балансе рекламных площадок (бюджет не входит в стоимость Сервиса).</li>
                  <li>Использовать Сервис в соответствии с правилами рекламной деятельности Meta/Facebook.</li>
                </ul>
              </div>
              <div>
                <p className="text-label font-semibold mb-2">5.3. Исполнитель имеет право:</p>
                <ul className="text-label list-disc pl-6 space-y-1">
                  <li>Вносить обновления в программный код Сервиса и производить ручную корректировку настроек для оптимизации его работы.</li>
                  <li>Приостановить доступ к Сервису в случае задержки оплаты подписки.</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-h2 mb-4 text-text-heading">6. ОТВЕТСТВЕННОСТЬ И ОГРАНИЧЕНИЯ (SaaS-специфика)</h2>
            <div className="space-y-3">
              <p className="text-label">
                <strong>6.1. Гарантии:</strong> Исполнитель гарантирует техническую доступность Сервиса, корректность работы алгоритмов
                отчетности и генерации. Исполнитель <strong>НЕ несет ответственности</strong> за конкретные маркетинговые показатели
                Заказчика (ROI, стоимость лида, объемы продаж), так как они зависят от продукта Заказчика и рыночных условий.
              </p>
              <p className="text-label">
                <strong>6.2. Блокировки:</strong> Исполнитель не несет ответственности за блокировку рекламных аккаунтов (Ban) со стороны
                администрации Facebook/Meta, если она не вызвана доказанными техническими ошибками программного кода Сервиса.
              </p>
              <p className="text-label">
                <strong>6.3.</strong> Стороны освобождаются от ответственности при наступлении обстоятельств непреодолимой силы (форс-мажор).
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-h2 mb-4 text-text-heading">7. КОНФИДЕНЦИАЛЬНОСТЬ</h2>
            <p className="text-label">
              <strong>7.1.</strong> Вся информация, обрабатываемая Сервисом (данные о кампаниях, стратегии, сгенерированные креативы),
              является конфиденциальной и не подлежит передаче третьим лицам.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-h2 mb-4 text-text-heading">8. ПРОЧИЕ УСЛОВИЯ</h2>
            <div className="space-y-3">
              <p className="text-label">
                <strong>8.1.</strong> Договор вступает в силу с момента Акцепта (оплаты) и действует до момента прекращения подписки.
              </p>
              <p className="text-label">
                <strong>8.2.</strong> Исполнитель вправе вносить изменения в Оферту, которые вступают в силу с момента публикации на сайте.
              </p>
              <p className="text-label">
                <strong>8.3.</strong> Споры подлежат разрешению в судебном порядке по месту нахождения Исполнителя согласно
                законодательству РК.
              </p>
              <p className="text-label">
                <strong>8.4.</strong> Электронный документооборот (email, Telegram) признается Сторонами юридически значимым.
              </p>
            </div>
          </section>

          <section className="mb-8 bg-muted/30 p-6 rounded-lg border border-border">
            <h2 className="text-h2 mb-4 text-text-heading">9. РЕКВИЗИТЫ ИСПОЛНИТЕЛЯ</h2>
            <div className="space-y-2">
              <p className="text-label"><strong>ТОО «A-One Agency»</strong></p>
              <p className="text-label">БИН: 191240021702</p>
              <p className="text-label">
                Юридический адрес: РК, г. Астана, район Нура, ул. Сыганак, дом 15, кв. 84
              </p>
              <p className="text-label">Банк: АО «Kaspi Bank»</p>
              <p className="text-label">БИК: CASPKZKA</p>
              <p className="text-label"><strong>КНП (для платежей): 858</strong></p>
              <p className="text-label">Директор: Копылов Николай Викторович</p>
              <p className="text-label">
                Email:{" "}
                <a href="mailto:info@aoneagency.kz" className="text-primary hover:underline">
                  info@aoneagency.kz
                </a>{" "}
                (или{" "}
                <a href="mailto:aoneagency001@gmail.com" className="text-primary hover:underline">
                  aoneagency001@gmail.com
                </a>
                )
              </p>
              <p className="text-label">
                Телефон:{" "}
                <a href="tel:+77473854493" className="text-primary hover:underline">
                  +7 747 385 44 93
                </a>
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
