This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

---

## Deploy as a Static Site with Docker / Dokploy

### 1️⃣ Build Docker Image

```bash
docker build -t nihonnosanzoku-static .
```

### 2️⃣ Run Locally

```bash
docker run -p 80:80 nihonnosanzoku-static
```

Then open [http://localhost](http://localhost) in your browser to check everything works.

### 3️⃣ Deploy on Dokploy

- Dokploy automatically builds and deploys your site.  
- Ensure your Nginx port mapping is set to **80**.  
- For domain setup via Cloudflare:
  - Add an **A record** pointing to your server IP.
  - Optionally, add a **CNAME** for `www` to redirect to the main domain.

This setup serves your Next.js app as a **fully static site** via Nginx.