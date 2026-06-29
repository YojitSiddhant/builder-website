This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Current Architecture

- Frontend and admin UI stay on Vercel
- Visit requests are stored through a Docker backend in [`backend/`](backend/README.md)
- The frontend talks to the backend using `VISIT_BACKEND_URL` and `VISIT_BACKEND_TOKEN`

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

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Setup Checklist

1. Copy [`.env.example`](./.env.example) to your local `.env.local` and fill in the secrets.
2. Copy [`backend/.env.example`](backend/.env.example) to `backend/.env` and fill in the backend secrets.
3. Run the backend locally with Docker from `backend/`.
4. Deploy the backend container to Render, Railway, Fly.io, or a VPS.
5. Add `VISIT_BACKEND_URL` and `VISIT_BACKEND_TOKEN` to the Vercel project, then redeploy the frontend.
