"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="text-center max-w-md">
        <div className="mb-6">
          <span className="text-6xl font-bold text-primary">500</span>
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-4">
          Что-то пошло не так
        </h1>
        <p className="text-muted-foreground mb-8">
          Произошла ошибка при загрузке страницы. Попробуйте обновить страницу или вернуться на главную.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="btn-primary px-6 py-3 rounded-lg font-medium"
          >
            Попробовать снова
          </button>
          <Link
            href="/"
            className="btn-secondary px-6 py-3 rounded-lg font-medium"
          >
            На главную
          </Link>
        </div>
      </div>
    </main>
  );
}
