import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Оптимизация для production
  compress: true,
  poweredByHeader: false,
  
  // Отключаем минификацию CSS для совместимости с cssnano
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production" ? { exclude: ["error", "warn"] } : false,
  },

  // Настройки изображений
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },

  // Для деплоя на DigitalOcean (раскомментируйте для VPS)
  // output: "standalone",

  // Экспериментальные функции
  experimental: {
    optimizePackageImports: ["lucide-react", "@radix-ui/react-icons"],
  },
};

export default nextConfig;
