# AGENTS.md - MarkLink Development Guidelines

This document outlines the coding standards, environment setup, and operational guidelines for agents working on the MarkLink repository.
MarkLink is a full-stack web application utilizing **TanStack Start** (Frontend) and **ElysiaJS** (Backend).

## 1. Project Structure

The repository is organized into a monorepo-like structure:

- **/ui**: Frontend application (React, TanStack Start, Vite).
- **/backend**: Backend API (Intended: ElysiaJS, Drizzle ORM).
- **Root**: Contains project-wide documentation.

## 2. Environment & Commands

The project uses **Bun** as the primary runtime and package manager.

### UI Directory (`/ui`)

| Command | Description |
| :--- | :--- |
| `bun install` | Install dependencies. |
| `bun dev` | Start development server (Port 3001). |
| `bun build` | Build for production. |
| `bun preview` | Preview production build. |
| `bun test` | Run tests via Vitest. |
| `bun lint` | Run ESLint. |
| `bun format` | Run Prettier. |
| `bun check` | Run Prettier (write) and ESLint (fix). |

**Running a Single Test:**
To run a specific test file, use:
```bash
cd ui && bun test src/path/to/file.test.tsx
```

### Backend Directory (`/backend`)

*Note: Backend directory may be in initial state. Standard ElysiaJS commands apply.*

| Command | Description |
| :--- | :--- |
| `bun install` | Install dependencies. |
| `bun dev` | Start backend server (Expected Port 3000). |
| `bun test` | Run backend tests. |

### Database (Drizzle ORM)

| Command | Description |
| :--- | :--- |
| `bun run db:push` | Push schema changes to the database. |

## 3. Code Style & Conventions

Strictly adhere to the following conventions to maintain consistency.

### 3.1 Formatting (Prettier)

Configuration is enforced via `.prettierrc` / `prettier.config.js`.
- **Indentation:** 2 spaces.
- **Semi-colons:** `false` (No semicolons).
- **Single Quote:** `true`.
- **Trailing Comma:** `all`.
- **Plugins:** `prettier-plugin-classnames` is used for sorting Tailwind classes.

### 3.2 Linting (ESLint)

- Uses `@tanstack/eslint-config`.
- **Strict Mode:** TypeScript `strict: true` is enabled.
- **No Unused Locals:** Enabled.
- **No Fallthrough:** Enabled.

### 3.3 TypeScript

- **Imports:**
  - Use absolute paths with the `@/` alias (e.g., `import ... from '@/components/...'`).
  - Avoid relative imports like `../../` for app code; use alias.
  - Group imports: Built-ins -> External Packages -> Internal Components -> Styles/Assets.
- **Types:**
  - Use `type` over `interface` for consistency unless declaration merging is required.
  - Explicitly type component props: `type ComponentProps = { ... }`.
  - Avoid `any`. Use `unknown` with narrowing or Zod schemas.

### 3.4 Frontend (React / TanStack Start)

- **Components:**
  - Use Functional Components: `export function MyComponent() { ... }`.
  - Naming: PascalCase for components (`MyComponent.tsx`), camelCase for helpers/hooks (`useHook.ts`).
  - Colocation: Keep related styles/types near the component if not shared.
  - **Shadcn UI:** Reusable primitives are in `ui/src/components/ui`. Do not modify these unless necessary; extend or wrap them instead.

- **Routing (TanStack Router):**
  - File-based routing in `ui/src/routes`.
  - Use `createFileRoute` for route definitions.
  - Use `createRootRoute` for the application shell.
  - Loaders: Place data loading logic in `loader` functions within route files.

- **Styling (Tailwind CSS):**
  - Use utility classes for styling.
  - Use `clsx` and `tailwind-merge` (typically exposed as `cn` utility) for conditional classes.
  - Avoid inline `style={{ ... }}` props; use Tailwind classes.

- **Data Fetching (tRPC):**
  - The app uses tRPC with TanStack Query.
  - Client setup: `ui/src/lib/trpc.ts`.
  - Usage: `const { data } = trpcClient.router.procedure.useQuery(...)`.

### 3.5 Backend (ElysiaJS)

- **Architecture:**
  - **Controllers:** Define routes and validation.
  - **Services:** Handle business logic and database interactions.
  - **Models:** Zod schemas or ORM definitions.
- **Validation:**
  - Use `t` from Elysia (which uses TypeBox/Zod) for request/response validation.
  - Example: `.post('/route', handler, { body: t.Object({ ... }) })`.

## 4. Error Handling

- **Frontend:**
  - Use Error Boundaries (TanStack Router supports `errorComponent`).
  - Handle Loading states via Suspense or `isLoading` flags.
  - Graceful UI degradation for network errors.
- **Backend:**
  - Return standardized error responses.
  - Use standard HTTP status codes (400 for bad input, 401 for auth, 500 for server).

## 5. Development Workflow for Agents

1.  **Analysis First:**
    - Before editing, run `ls -F` and `read` to understand the file context.
    - Check `package.json` for available scripts.
2.  **Atomic Changes:**
    - Focus on one task/feature at a time.
    - Verify changes with `bun check` or `bun test` before considering the task complete.
3.  **Safety:**
    - **Do not** modify `.lock` files manually.
    - **Do not** commit secrets or `.env` files.
4.  **Pathing:**
    - ALWAYS use **Absolute Paths** when using file tools.
    - Resolve paths relative to the project root (`/Users/kakashi/workspace/web/marklink`).

## 6. External Rules

- **Cursor Rules:** Not present.
- **Copilot Rules:** Not present.
