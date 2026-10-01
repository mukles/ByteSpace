# ByteSpace

A Turborepo with two apps:

- `apps/web` — the Next.js site (`@repo/web`, port 3000)
- `apps/api` — a NestJS auth API backed by Postgres via TypeORM (`@repo/api`, port 3001)

## Getting started

Requires Node 22 and Docker.

```bash
npm install
cp apps/api/.env.example apps/api/.env.local   # then set JWT_SECRET
cp apps/web/.env.example apps/web/.env.local
npm run db:up        # Postgres on localhost:5434
npm run db:migrate   # create the tables
npm run dev          # web + api
```

Open [http://localhost:3000](http://localhost:3000) and use **Join Us** to register or **Sign In** to log in.

## Scripts

| Command              | What it does                                |
| -------------------- | ------------------------------------------- |
| `npm run dev`        | Run both apps in watch mode                 |
| `npm run build`      | Build both apps                             |
| `npm run lint`       | Lint both apps                              |
| `npm run typecheck`  | Type-check both apps                        |
| `npm run db:up`      | Start Postgres in Docker                    |
| `npm run db:down`    | Stop Postgres                               |
| `npm run db:migrate` | Run pending TypeORM migrations              |

To change the schema, edit the entities in `apps/api/src/auth/entities`, then from `apps/api` run
`npm run db:generate -- src/migrations/<Name>`.

## How auth works

- The API issues a short-lived JWT access token and a rotating refresh token. Each login starts one
  session per user, so signing in elsewhere ends the previous session.
- Refresh tokens are single-use. A token replayed within 10 seconds of its rotation gets the same
  replacement (so parallel requests don't log the user out); a later replay revokes the session.
- The web app keeps both tokens in `httpOnly` cookies. The login and signup forms post through
  server actions, `src/proxy.ts` rotates an expired access token before pages render and sends
  signed-in users away from `/login` and `/signup`, and the navbar reads the user from
  `/api/auth/session`.

### API endpoints (`/api/v1`)

| Method | Path             | Body                          |
| ------ | ---------------- | ----------------------------- |
| POST   | `/auth/register` | `{ name, email, password }`   |
| POST   | `/auth/login`    | `{ email, password }`         |
| POST   | `/auth/refresh`  | `{ refresh_token }`           |
| POST   | `/auth/logout`   | `{ refresh_token }`           |
| GET    | `/auth/me`       | `Authorization: Bearer <jwt>` |
| GET    | `/health`        |                               |
