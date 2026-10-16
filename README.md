# املاک مانا (Mana Amlak)

وب‌سایت کارگزاری و مجله معماری املاک مانا — React + Vite.

## اجرا محلی

**پیش‌نیاز:** Node.js 20+

```bash
npm install
npm run dev
```

اپ روی `http://localhost:3000` بالا می‌آید.

## دیپلوی روی GitHub Pages

پروژه برای دیپلوی خودکار با GitHub Actions آماده است.

### ۱. ساخت ریپوی GitHub

نام ریپو را `Mana-Amlak` بگذارید (یا `VITE_BASE_PATH` را با نام ریپو هماهنگ کنید).

```bash
git init
git add .
git commit -m "Initial commit: Mana Amlak site"
git branch -M main
git remote add origin https://github.com/<USERNAME>/Mana-Amlak.git
git push -u origin main
```

### ۲. فعال‌سازی GitHub Pages

1. در ریپو بروید به **Settings → Pages**
2. بخش **Build and deployment** → Source را روی **GitHub Actions** بگذارید
3. بعد از اولین push به `main` (یا اجرای دستی workflow)، سایت در این آدرس در دسترس است:

`https://<USERNAME>.github.io/Mana-Amlak/`

### بیلد دستی (لوکال)

```bash
npm run build:gh
npm run preview
```

### دامنه اختصاصی یا ریپوی `username.github.io`

اگر سایت روی روت دامنه است، قبل از بیلد:

```bash
VITE_BASE_PATH=/ npm run build
```

و در workflow مقدار `VITE_BASE_PATH` را به `/` تغییر دهید.

## اسکریپت‌ها

| دستور | توضیح |
|--------|--------|
| `npm run dev` | سرور توسعه |
| `npm run build` | بیلد پروداکشن (base پیش‌فرض `/Mana-Amlak/`) |
| `npm run build:gh` | بیلد + فایل `404.html` برای SPA روی GitHub Pages |
| `npm run preview` | پیش‌نمایش پوشه `dist` |
| `npm run lint` | چک TypeScript |
