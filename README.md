# MarkLink

> A blogging platform where people can write, share, and connect.

**Note: This project is no longer under active development.**

MarkLink is a Medium-style blogging platform with a rich text editor, social features, and OAuth authentication. It was built as a monorepo with an ElysiaJS backend and a React 19 / TanStack Start frontend.

## Tech Stack

### Backend (`/backend`)

- **[Bun](https://bun.sh/)** -- JavaScript runtime and package manager
- **[ElysiaJS](https://elysiajs.com)** -- TypeScript web framework
- **[Drizzle ORM](https://orm.drizzle.team/)** -- TypeScript-first ORM
- **[PostgreSQL](https://www.postgresql.org/)** -- relational database
- **[better-auth](https://better-auth.com/)** -- authentication (GitHub + Google OAuth)
- **[Redis](https://redis.io/)** via ioredis -- initialized but not actively used by any route
- **[Cloudinary](https://cloudinary.com/)** -- image hosting
- **[DOMPurify](https://github.com/cure53/DOMPurify)** -- HTML sanitization

### Frontend (`/ui`)

- **[React 19](https://react.dev/)** -- UI library
- **[TanStack Start](https://tanstack.com/start)** -- full-stack framework with SSR
- **[TanStack Router](https://tanstack.com/router)** -- file-based routing
- **[TanStack Query](https://tanstack.com/query)** -- data fetching and caching
- **[Tailwind CSS 4](https://tailwindcss.com/)** -- utility-first styling
- **[Base UI](https://base-ui.com/)** -- unstyled React primitives
- **[TipTap](https://tiptap.dev/)** -- rich text editor
- **[Eden Treaty](https://elysiajs.com/eden/overview)** -- type-safe API client

## Getting Started

### Prerequisites

- **[Bun](https://bun.sh/)** v1.x or higher
- **PostgreSQL** (local or cloud)
- **Redis** (local or cloud)
- GitHub and/or Google OAuth app credentials
- Cloudinary account

### Installation

```bash
git clone <repository-url>
cd marklink

# Install all dependencies (workspaces)
bun install
```

### Environment Setup

**Backend** (`backend/.env`):

```env
DATABASE_URL=postgres://user:password@localhost:5432/marklink
REDIS_HOST=localhost
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
UI_CLIENT_URL=http://localhost:3001
CLOUDINARY_URL=cloudinary://key:secret@cloud
```

**Frontend** (`ui/.env`):

```env
VITE_SERVER_URL=http://localhost:3000
```

### Database Setup

```bash
cd backend
bun push    # Push schema to database (dev)
```

### Running

```bash
# Terminal 1 -- Backend (http://localhost:3000)
cd backend
bun dev

# Terminal 2 -- Frontend (http://localhost:3001)
cd ui
bun dev
```

API docs available at `http://localhost:3000/api/v1/reference`.

## Project Structure

```
marklink/
├── backend/           # ElysiaJS API server
│   ├── src/
│   │   ├── controllers/   # Route handlers (article, comment, like, upload, user)
│   │   ├── db/schema/     # Drizzle table definitions
│   │   ├── services/      # Business logic
│   │   ├── shared/        # Zod validation schemas
│   │   ├── middlewares/    # Auth middleware
│   │   ├── lib/           # Auth, Cloudinary, sanitization
│   │   └── server.ts      # App entry with all routes
│   └── drizzle/           # Generated migrations
├── ui/                # React 19 + TanStack Start frontend
│   ├── src/
│   │   ├── routes/        # File-based routes
│   │   ├── components/    # UI components (ui/, layout/, feature-specific)
│   │   ├── data/          # API queries, mutations, server functions
│   │   ├── hooks/         # Custom React hooks
│   │   └── lib/           # Utilities, auth client
│   └── public/            # Static assets
└── package.json       # Workspace root
```

## License

This project is unlicensed / private.
