# 🚀 Деплой aoneagency.kz на DigitalOcean

## ✅ Готово к деплою

Сайт полностью настроен и готов к размещению на DigitalOcean.

---

## 📋 Вариант 1: DigitalOcean App Platform (Рекомендуется)

### Преимущества:
- ✅ Автоматический CI/CD (пушите в GitHub → деплой)
- ✅ Бесплатный SSL-сертификат
- ✅ Автоматическое масштабирование
- ✅ Встроенный CDN
- ✅ Простая настройка

### Шаги:

#### 1. Создайте GitHub репозиторий
```bash
git init
git add .
git commit -m "Initial commit: aoneagency.kz"
git branch -M main
git remote add origin https://github.com/ваш-username/aoneagency-site.git
git push -u origin main
```

#### 2. Создайте приложение в DigitalOcean App Platform
1. Зайдите в [DigitalOcean App Platform](https://cloud.digitalocean.com/apps)
2. Нажмите **"Create App"**
3. Выберите **GitHub** и подключите репозиторий
4. Выберите ветку **main**

#### 3. Настройте параметры сборки
- **Build Command:** `npm run build`
- **Run Command:** `npm start`
- **Environment Variables:** (пока не нужны, добавите позже для amoCRM, GA, Yandex.Metrika)

#### 4. Настройте домен
1. В разделе **"Settings" → "Domains"** добавьте `aoneagency.kz`
2. Обновите DNS-записи у регистратора домена:
   ```
   CNAME @ your-app.ondigitalocean.app
   CNAME www your-app.ondigitalocean.app
   ```
3. SSL-сертификат создастся автоматически

#### 5. Деплой
- Нажмите **"Deploy"**
- Ожидание: ~5-10 минут
- Сайт будет доступен по адресу `https://aoneagency.kz`

---

## 📋 Вариант 2: DigitalOcean Droplet (VPS)

### Преимущества:
- ✅ Больше контроля
- ✅ Дешевле для высоконагруженных сайтов
- ❌ Требует настройки сервера

### Шаги:

#### 1. Создайте Droplet
1. Зайдите в [DigitalOcean Droplets](https://cloud.digitalocean.com/droplets)
2. Создайте Droplet:
   - **OS:** Ubuntu 24.04 LTS
   - **Plan:** Basic ($6/мес)
   - **CPU:** Regular (1 GB RAM)
   - **Region:** Frankfurt (ближе к Казахстану)

#### 2. Подключитесь к серверу
```bash
ssh root@your-droplet-ip
```

#### 3. Установите Node.js и Nginx
```bash
# Обновите систему
apt update && apt upgrade -y

# Установите Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt install -y nodejs

# Установите Nginx
apt install -y nginx

# Установите PM2 (для запуска Node.js в фоне)
npm install -g pm2
```

#### 4. Склонируйте проект
```bash
cd /var/www
git clone https://github.com/ваш-username/aoneagency-site.git
cd aoneagency-site
npm install
npm run build
```

#### 5. Запустите приложение
```bash
pm2 start npm --name "aoneagency" -- start
pm2 save
pm2 startup
```

#### 6. Настройте Nginx
```bash
nano /etc/nginx/sites-available/aoneagency.kz
```

Вставьте конфигурацию:
```nginx
server {
    listen 80;
    server_name aoneagency.kz www.aoneagency.kz;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Активируйте конфигурацию:
```bash
ln -s /etc/nginx/sites-available/aoneagency.kz /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

#### 7. Установите SSL (Let's Encrypt)
```bash
apt install -y certbot python3-certbot-nginx
certbot --nginx -d aoneagency.kz -d www.aoneagency.kz
```

#### 8. Готово!
Сайт доступен по адресу `https://aoneagency.kz`

---

## 🔧 Настройка переменных окружения (для будущих интеграций)

Создайте файл `.env.local` на сервере:

```bash
# Site
NEXT_PUBLIC_SITE_URL=https://aoneagency.kz

# Google Analytics 4
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Yandex.Metrika
NEXT_PUBLIC_YM_ID=12345678

# amoCRM (для контактной формы)
AMO_CRM_TOKEN=your_token_here
AMO_CRM_SUBDOMAIN=yourcompany

# Yandex IndexNow (быстрая индексация)
INDEXNOW_KEY=your_key_here
```

**Важно:** Не коммитьте `.env.local` в Git! Он уже добавлен в `.gitignore`.

---

## 📊 После деплоя: Настройка индексации

### 1. Google Search Console
1. Зайдите в [Google Search Console](https://search.google.com/search-console)
2. Добавьте сайт `https://aoneagency.kz`
3. Подтвердите владение (через meta-тег или DNS)
4. Отправьте sitemap: `https://aoneagency.kz/sitemap.xml`

### 2. Yandex.Webmaster
1. Зайдите в [Yandex.Webmaster](https://webmaster.yandex.ru/)
2. Добавьте сайт `https://aoneagency.kz`
3. Подтвердите владение
4. Отправьте sitemap: `https://aoneagency.kz/sitemap.xml`

### 3. Yandex IndexNow (быстрая индексация)
1. Зарегистрируйтесь в [Yandex IndexNow](https://yandex.ru/dev/indexnow/)
2. Получите API-ключ
3. Добавьте в `.env.local`
4. После публикации новых страниц отправляйте URL через IndexNow API

---

## 🚀 Автоматический деплой при пуше в GitHub (App Platform)

После настройки App Platform каждый `git push` будет автоматически деплоить изменения:

```bash
# Внесите изменения в код
git add .
git commit -m "Update content"
git push origin main

# DigitalOcean автоматически:
# 1. Заметит изменения в GitHub
# 2. Запустит сборку (npm run build)
# 3. Задеплоит новую версию
# 4. Обновит сайт (без downtime)
```

---

## 📈 Мониторинг и аналитика

### 1. DigitalOcean Metrics
- CPU, RAM, Network
- Доступно в панели App Platform или Droplet

### 2. Google Analytics 4
- Трафик, конверсии, источники
- Добавьте GA_ID в `.env.local`

### 3. Yandex.Metrika
- Карта кликов, вебвизор, отчёты
- Добавьте YM_ID в `.env.local`

---

## 🛡️ Безопасность

### 1. Проверьте .gitignore
Убедитесь, что конфиденциальные данные не попадают в Git:
```
.env
.env.local
.env.production
node_modules/
.next/
```

### 2. Регулярно обновляйте зависимости
```bash
npm audit
npm update
```

### 3. Используйте Firewall (для Droplet)
```bash
ufw allow 22/tcp
ufw allow 80/tcp
ufw allow 443/tcp
ufw enable
```

---

## ✅ Чек-лист после деплоя

- [ ] Сайт открывается по адресу https://aoneagency.kz
- [ ] SSL-сертификат установлен (зеленый замок в браузере)
- [ ] Все страницы доступны (/, /about, /blog, /targetolog-almaty, etc.)
- [ ] Отправлен sitemap.xml в Google Search Console
- [ ] Отправлен sitemap.xml в Yandex.Webmaster
- [ ] Установлен Google Analytics 4
- [ ] Установлен Yandex.Metrika
- [ ] Проверена мобильная версия
- [ ] Протестирована скорость загрузки (PageSpeed Insights)
- [ ] Проверена индексация в Google (через Search Console)

---

## 🆘 Поддержка

Если возникли проблемы:
1. Проверьте логи: `pm2 logs aoneagency` (для Droplet)
2. Проверьте статус: `pm2 status` (для Droplet)
3. Перезапустите: `pm2 restart aoneagency` (для Droplet)
4. Проверьте Nginx: `nginx -t` и `systemctl status nginx`

Для App Platform: Логи доступны в разделе **"Runtime Logs"**.

---

**Готово! 🎉 Сайт aoneagency.kz готов к работе и оптимизирован для AI-поисковиков!**

