# Pokédex Web Application

A full-stack Pokédex that uses the [PokéAPI](https://pokeapi.co/) for Pokémon data and a custom **Express** API with **MongoDB** for user **teams** (up to six Pokémon per team). Sign-in is handled with **Clerk** (Google OAuth).

The client is **React** and **TypeScript** (Vite, Tailwind CSS), with a resizable sidebar for teams and a browsable grid with search and detail pages (stats, types, weaknesses, evolution lines).

---

## Features

- **Browse & search** — Paginated grid and live name search against the public API.
- **Pokémon detail** — Sprites, types, height/weight, gender, abilities, weaknesses, and evolution chain with links between species.
- **Teams** — Authenticated users can create teams, edit names, assign Pokémon to slots, and persist everything to the database.
- **Layout** — Top bar, user menu, and a main content area designed for both browsing and team management.

---

## Tech stack

| Area | Technologies |
|------|----------------|
| Frontend | React 19, TypeScript, Vite, Tailwind CSS, Radix UI, Zustand, React Router, Clerk |
| Backend | Node.js, Express, Mongoose, Clerk |
| Data | MongoDB (teams / user data); PokéAPI (Pokémon catalog) |

---

## Project structure

```
frontend/     React SPA
backend/      REST API
```

The repository root includes scripts to build the client and run the API as a single process for hosting.

---

## Note

Pokémon names and data are provided by PokéAPI. This project is for learning and portfolio use.
