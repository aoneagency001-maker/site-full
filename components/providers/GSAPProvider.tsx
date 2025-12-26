"use client";

import { useEffect } from "react";
import "@/lib/GSAPAnimations";

/**
 * GSAP Provider - инициализирует кастомные GSAP эффекты на клиенте
 * Должен быть обернут вокруг всего приложения
 */
export function GSAPProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // GSAP эффекты уже зарегистрированы через импорт выше
    // Этот useEffect нужен только для гарантии выполнения на клиенте
  }, []);

  return <>{children}</>;
}
