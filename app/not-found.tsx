import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Страница не найдена | A-One Agency",
  description: "Запрашиваемая страница не найдена. Вернитесь на главную страницу A-One Agency.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="text-center max-w-md">
        <div className="mb-6">
          <span className="text-8xl font-bold text-primary">404</span>
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-4">
          Страница не найдена
        </h1>
        <p className="text-muted-foreground mb-8">
          К сожалению, запрашиваемая страница не существует или была перемещена.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="btn-primary px-6 py-3 rounded-lg font-medium inline-block"
          >
            На главную
          </Link>
          <Link
            href="/contacts"
            className="btn-secondary px-6 py-3 rounded-lg font-medium inline-block"
          >
            Связаться с нами
          </Link>
        </div>

        {/* Quick Links for SEO */}
        <div className="mt-12 pt-8 border-t border-border">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Возможно, вы искали:
          </h2>
          <nav className="flex flex-wrap justify-center gap-4 text-sm">
            <Link href="/targetirovannaya-reklama" className="text-primary hover:underline">
              Таргетированная реклама
            </Link>
            <Link href="/seo-prodvizhenie" className="text-primary hover:underline">
              SEO-продвижение
            </Link>
            <Link href="/kontekstnaya-reklama" className="text-primary hover:underline">
              Контекстная реклама
            </Link>
            <Link href="/blog" className="text-primary hover:underline">
              Блог
            </Link>
          </nav>
        </div>
      </div>
    </main>
  );
}
