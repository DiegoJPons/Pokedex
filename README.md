# Pokédex Web Application

A full-stack Pokédex that pulls Pokémon data from the [PokéAPI](https://pokeapi.co/), shows detail pages with stats, types, weaknesses, and evolution lines, and lets signed-in users **create and edit teams** of up to six Pokémon stored in MongoDB.

The UI is a React + TypeScript app (Vite, Tailwind CSS) with a small Express API and Clerk authentication.

---

## Features

- **Browse & search** — Paginated grid of Pokémon; live search by name against the public API.
- **Pokémon detail** — Sprite, types, height/weight, gender, abilities, weaknesses, and evolution chain with navigation to related species.
- **Teams (authenticated)** — After sign-in (Google OAuth via Clerk), create teams, rename them, add Pokémon while editing, and persist them in your database.
- **Responsive layout** — Resizable sidebar for teams, main content area with top bar and user menu.

---

## Tech stack

| Layer | Technologies |
|--------|----------------|
| Frontend | React 19, TypeScript, Vite 7, Tailwind CSS, Radix UI, Zustand, React Router, Clerk React |
| Backend | Node.js, Express 5, Mongoose, Clerk Express, CORS |
| Data | MongoDB (teams and user-related data); PokéAPI (Pokémon facts) |
| Auth | [Clerk](https://clerk.com/) |

---

## Repository layout

```
PokeApi-project/
├── frontend/          # Vite React app (dev server default: port 3000)
├── backend/           # Express API (default: port 5000 in local .env)
├── package.json       # Root scripts: single build + start for deployment
└── README.md
```

---

## Prerequisites

- **Node.js** 18+ (LTS recommended; Render uses Node 22 by default)
- **MongoDB** — local instance or [Atlas](https://www.mongodb.com/atlas) URI
- **Clerk** application — for sign-in and API verification

---

## Environment variables

### Frontend (`frontend/.env.local`)

| Variable | Purpose |
|----------|---------|
| `VITE_CLERK_PUBLISHABLE_KEY` | Clerk publishable key (embedded at build time) |

### Backend (`backend/.env`)

| Variable | Purpose |
|----------|---------|
| `PORT` | API port (e.g. `5000` locally; Render sets this automatically) |
| `MONGODB_URI` | MongoDB connection string |
| `CLERK_SECRET_KEY` | Clerk secret key for server-side auth |
| `ADMIN_EMAIL` | *(Optional)* Email that receives admin-only behavior where implemented |
| `CORS_ORIGIN` | *(Optional, dev)* Override default `http://localhost:3000` for the browser origin |

Never commit real `.env` or `.env.local` files. Add them to `.gitignore` and configure secrets in your host’s dashboard.

---

## Local development

Run the **API** and **frontend** in two terminals so CORS matches the dev setup (`axios` targets `http://localhost:5000/api` in development).

**1. Backend**

```bash
cd backend
# Create backend/.env with PORT, MONGODB_URI, CLERK_SECRET_KEY, etc.
npm install
npm run dev
```

**2. Frontend**

```bash
cd frontend
# create .env.local with VITE_CLERK_PUBLISHABLE_KEY=pk_...
npm install
npm run dev
```

Open the app at the URL Vite prints (typically `http://localhost:3000`).

In Clerk, add **http://localhost:3000** (and OAuth callback routes) to allowed origins and redirect URLs.

---

## Production build (single process)

The repo root `package.json` is set up so **one** Node process can serve the built SPA and the API (used for platforms like Render):

1. **Build** — Installs dependencies, runs `vite build` in `frontend/`, installs `backend/`.
2. **Start** — Runs `node backend/src/index.js`, which serves `/api/*` from Express and static files from `frontend/dist` when that folder exists.

From the **repository root**:

```bash
npm install && npm run build
npm start
```

Set `NODE_ENV=production` on the host if you rely on production CORS behavior (Render does this for Web Services).

---

## Deploying on Render (example)

Create a **Web Service** pointing at this repo.

| Setting | Suggested value |
|---------|------------------|
| Root directory | *(empty — repo root)* |
| Build command | `npm install && npm run build` |
| Start command | `npm start` |

- Add **all** backend env vars for **runtime**.
- Add **`VITE_CLERK_PUBLISHABLE_KEY`** (and any other `VITE_*` vars) for the **build** step so Vite can bake them into the client bundle.
- In Clerk, add your production URL (e.g. `https://your-service.onrender.com`) to allowed origins and redirect URLs.

---

## API overview

Protected routes use Clerk’s session; the client sends credentials with `axios` (`withCredentials: true`).

| Prefix | Purpose |
|--------|---------|
| `/api/users` | User-related routes (protected) |
| `/api/auth` | Auth-related routes (protected) |
| `/api/teams` | CRUD for teams (protected) |

Public Pokémon data is fetched from **PokéAPI** in the browser; the backend focuses on auth and persisted teams.

---

## Design notes

The app is built to handle a **large catalog** (1,000+ species) with pagination and search, while keeping team data **structured** in MongoDB. The REST API keeps team operations separate from bulk PokéAPI reads so the UI stays responsive and the server workload stays predictable.

---

## License

ISC (see `backend/package.json`). Third-party data © respective owners; Pokémon and PokéAPI are used for educational and portfolio purposes.
