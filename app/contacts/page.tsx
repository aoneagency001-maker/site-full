"use client";

import { useState } from "react";

export default function ContactsPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  return (
    <main className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Свяжитесь с нами</h1>
          <p className="text-xl text-gray-700">Готовы обсудить ваш проект? Мы всегда на связи!</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Отправить сообщение</h2>
            <form
              className="space-y-6"
              onSubmit={async (e) => {
                e.preventDefault();
                setIsSubmitting(true);

                const formData = new FormData(e.currentTarget);
                const data = {
                  name: formData.get("name"),
                  phone: formData.get("phone"),
                  email: formData.get("email"),
                  message: formData.get("message"),
                };

                try {
                  const response = await fetch("/api/contact", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data),
                  });

                  if (response.ok) {
                    setIsSuccess(true);
                    e.currentTarget.reset();

                    // Открыть WhatsApp
                    const message = `Здравствуйте! Отправил сообщение через форму на сайте.\n\nИмя: ${data.name}\nТелефон: ${data.phone}\n\nСообщение: ${data.message}`;
                    setTimeout(() => {
                      window.open(
                        `https://wa.me/77473854493?text=${encodeURIComponent(message)}`,
                        "_blank"
                      );
                    }, 1000);
                  }
                } catch (error) {
                  console.error("Error:", error);
                  alert("Произошла ошибка. Попробуйте еще раз или свяжитесь с нами напрямую.");
                } finally {
                  setIsSubmitting(false);
                }
              }}
            >
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Ваше имя *</label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-600 focus:outline-none"
                  placeholder="Введите ваше имя"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Телефон *</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-600 focus:outline-none"
                  placeholder="+7 (___) ___-__-__"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-600 focus:outline-none"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Сообщение *</label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-600 focus:outline-none"
                  placeholder="Расскажите о вашем проекте..."
                />
              </div>

              {isSuccess && (
                <div className="bg-green-50 border-2 border-green-500 rounded-lg p-4 text-center">
                  <p className="text-green-700 font-semibold">
                    ✅ Сообщение отправлено! Мы свяжемся с вами в ближайшее время.
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-orange-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-orange-600 transform hover:scale-105 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Отправка..." : "Отправить сообщение →"}
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            {/* Phone */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Телефон</h3>
                  <a
                    href="tel:+77473854493"
                    className="text-blue-600 hover:text-blue-700 font-semibold"
                  >
                    +7 747 385 4493
                  </a>
                </div>
              </div>
              <p className="text-gray-600">Ответим на звонок в течение 5 минут</p>
            </div>

            {/* WhatsApp */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">💬</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">WhatsApp</h3>
                  <a
                    href="https://wa.me/77473854493"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 font-semibold"
                  >
                    Написать в WhatsApp
                  </a>
                </div>
              </div>
              <p className="text-gray-600">Быстрый ответ 24/7</p>
            </div>

            {/* Email */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Email</h3>
                  <a
                    href="mailto:info@aoneagency.kz"
                    className="text-blue-600 hover:text-blue-700 font-semibold"
                  >
                    info@aoneagency.kz
                  </a>
                </div>
              </div>
              <p className="text-gray-600">Ответим в течение часа</p>
            </div>

            {/* Address */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-orange-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Офис</h3>
                  <p className="text-gray-700">проспект Назарбаева 103</p>
                  <p className="text-gray-700">Алматы, 050000</p>
                </div>
              </div>
              <p className="text-gray-600">Пн-Пт: 9:00 - 19:00, Сб: 10:00 - 16:00</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
