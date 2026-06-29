# Builder Backend

This folder contains the Docker-backed visit backend for the Builder website.

## What it does

- Stores contact-page visit requests in Postgres
- Exposes a public `POST /api/site-visits` endpoint for new requests
- Protects admin read/update routes with a service token
- Ships with a Dockerfile so it can be deployed on Render, Railway, Fly.io, a VPS, or any container host

## Environment variables

Create a `.env` file from `.env.example`:

```bash
cp .env.example .env
```

Set these values:

- `DATABASE_URL` - your Neon/Postgres connection string
- `BACKEND_API_TOKEN` - a long random secret used by the frontend server to read/update requests
- `PORT` - optional, defaults to `3001`

## Run locally with Docker

From the `backend/` folder:

```bash
docker compose up --build
```

Check the service:

```bash
curl http://localhost:3001/healthz
```

## Frontend Vercel environment variables

On the Vercel project for the frontend, add:

- `VISIT_BACKEND_URL` = your backend URL, for example `https://builder-backend.onrender.com`
- `VISIT_BACKEND_TOKEN` = the same value as `BACKEND_API_TOKEN`

Then redeploy the frontend so the server routes start using the backend.

## Production flow

1. Deploy this backend as a Docker service.
2. Point the frontend `VISIT_BACKEND_URL` to that backend.
3. Set the same `VISIT_BACKEND_TOKEN` on the frontend and `BACKEND_API_TOKEN` on the backend.
4. Redeploy the frontend.
