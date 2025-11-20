import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  // Оптимизация для production
  compress: true,
  poweredByHeader: false,

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

export default withNextIntl(nextConfig);
