# AGENTS.md - Agentic Coding Guidelines for MarkLink

## Project Overview

MarkLink is a blog and book writing/publishing platform built with:
- **Frontend**: React 19 + TanStack Start + TanStack Router + TanStack Query + Tailwind CSS v4
- **Backend**: HonoJS + Drizzle ORM + PostgreSQL + tRPC + Better Auth
- **Runtime**: Bun (preferred over Node.js)
- **UI Components**: Shadcn UI (base-lyra style) + Hugeicons

## Build/Lint/Test Commands

All commands should be run from the `ui/` directory using Bun:

```bash
# Install dependencies
bun install

# Development server (port 3001)
bun run dev

# Production build
bun run build

# Preview production build
bun run preview

# Run all tests
bun run test

# Run a single test file
bun test src/path/to/file.test.ts

# Run tests matching a pattern
bun test --test-name-pattern "test name pattern"

# Linting
bun run lint

# Formatting
bun run format

# Fix all linting and formatting issues
bun run check
```

### Testing Framework

Tests use Vitest (via `bun test`). Test files should be named `*.test.ts` or `*.test.tsx`.

```typescript
import { test, expect } from 'bun:test'

test('example test', () => {
  expect(1).toBe(1)
})
```

## Code Style Guidelines

### Formatting (Prettier)

- No semicolons (`semi: false`)
- Single quotes (`singleQuote: true`)
- Trailing commas everywhere (`trailingComma: 'all'`)
- Uses `prettier-plugin-classnames` for Tailwind class formatting

### TypeScript Configuration

- Target: ES2022
- Strict mode enabled
- No unused locals or parameters
- Path alias: `@/*` maps to `./src/*`

### Import Order

Uses `@tanstack/eslint-config` with perfectionist plugin. Organize imports as:

```typescript
// 1. External packages (React, libraries)
import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'

// 2. Internal aliases (@/)
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

// 3. Relative imports
import { LocalComponent } from './LocalComponent'

// 4. Type imports (use 'import type' syntax)
import type { SomeType } from '@/types'
```

### Component Structure

```typescript
// Component file structure:
// 1. Imports
// 2. Type definitions
// 3. Helper functions/constants
// 4. Component function
// 5. Export

import { cn } from '@/lib/utils'
import type { VariantProps } from 'class-variance-authority'

type ComponentProps = {
  title: string
  onClick: () => void
}

function ComponentName({ title, onClick }: ComponentProps) {
  return (
    <div className="flex items-center">
      {title}
    </div>
  )
}

export { ComponentName }
// or: export default ComponentName
```

### Naming Conventions

- **Components**: PascalCase (`WriteComponent.tsx`, `EditorBubbleMenu.tsx`)
- **Utilities/hooks**: camelCase (`utils.ts`, `auth-client.ts`)
- **Routes**: kebab-case or underscore for layout routes (`_main/route.tsx`, `write.tsx`)
- **Types**: PascalCase with descriptive names (`AuthContext`, `TitileInputProps`)
- **Functions**: camelCase (`getAuthSession`, `createTRPCClient`)
- **Constants**: camelCase or SCREAMING_SNAKE_CASE for true constants

### React Patterns

- Use functional components only
- Prefer named exports for components
- Use TanStack Router's file-based routing conventions:
  - `routes/__root.tsx` - Root layout
  - `routes/_main/route.tsx` - Layout route (underscore prefix)
  - `routes/_main/index.tsx` - Index route
  - `routes/write.tsx` - Standalone route

### Tailwind CSS

- Use Tailwind v4 with CSS-first configuration
- Utility classes in `className` prop
- Use `cn()` helper for conditional classes:

```typescript
import { cn } from '@/lib/utils'

<div className={cn('base-class', isActive && 'active-class')} />
```

- Custom CSS variables defined in `src/styles.css`
- Use semantic color tokens: `bg-background`, `text-foreground`, `text-muted-foreground`

### UI Components (Shadcn)

- Components live in `src/components/ui/`
- Use `class-variance-authority` (cva) for variants
- Base UI components from `@base-ui/react`
- Icons from `@hugeicons/react`

### Error Handling

- Use TypeScript strict mode for type safety
- Validate environment variables with `@t3-oss/env-core` + Zod
- Handle async errors appropriately in server functions

### tRPC Integration

- Client setup in `src/lib/trpc.ts`
- Use `TrpcProvider` wrapper for React Query integration
- Server functions use `createServerFn` from TanStack Start

### Authentication

- Uses `better-auth` with `authClient`
- Session management via `getAuthSession` server function
- Auth context available in route context

## File Structure

```
ui/
├── src/
│   ├── components/
│   │   ├── ui/          # Shadcn components
│   │   ├── layout/      # Layout components
│   │   ├── home/        # Home page components
│   │   ├── write/       # Write feature components
│   │   └── Editor/      # Tiptap editor components
│   ├── routes/          # TanStack Router file routes
│   ├── lib/             # Utilities and clients
│   ├── data/            # Server functions
│   └── styles.css       # Global styles + Tailwind
├── public/              # Static assets
├── package.json
├── tsconfig.json
├── vite.config.ts
├── eslint.config.js
└── prettier.config.js
```

## Bun-Specific Guidelines

- Use `bun` instead of `node`, `npm`, `yarn`, or `pnpm`
- Bun automatically loads `.env` files (no dotenv needed)
- Prefer Bun built-ins when available:
  - `Bun.file` over `fs.readFile/writeFile`
  - `bun:test` for testing
  - `Bun.$` for shell commands

## Editor Configuration

The project uses Tiptap for the rich text editor with extensions:
- StarterKit (headings limited to h2)
- Placeholder, Image, Link, Blockquote
- CodeBlockLowlight with syntax highlighting
- Custom styling in `src/styles.css` under `.tiptap` selector

## Environment Variables

Client-side variables must be prefixed with `VITE_`:
```typescript
// src/env.ts
VITE_APP_TITLE: z.string().min(1).optional()
SERVER_URL: z.string().url().optional()
```
