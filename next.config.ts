import type { NextConfig } from "next";

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

  // Для деплоя на DigitalOcean
  output: "standalone",

  // Экспериментальные функции
  experimental: {
    optimizePackageImports: ["lucide-react", "@radix-ui/react-icons"],
  },
};

export default nextConfig;
