# ==== Dependencies Stage ====
FROM node:20 AS deps
WORKDIR /app

# Копируем файлы зависимостей
COPY package.json package-lock.json ./
RUN npm install

# ==== Builder Stage ====
FROM node:20 AS builder
WORKDIR /app

# Копируем установленные зависимости
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Отключаем телеметрию Next.js
ENV NEXT_TELEMETRY_DISABLED=1

# Собираем приложение в standalone режиме (Webpack, без Turbopack)
RUN npm run build

# ==== Runner Stage ====
FROM node:20-slim AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000

# Создаём пользователя для безопасности
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Копируем необходимые файлы из builder
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
