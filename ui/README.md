# MarkLink UI

> React 19 frontend for the MarkLink blogging platform, built with TanStack Start.

## Tech Stack

- **Runtime**: [Bun](https://bun.sh/)
- **Framework**: [React 19](https://react.dev/) with [TanStack Start](https://tanstack.com/start) (SSR)
- **Routing**: [TanStack Router](https://tanstack.com/router) (file-based)
- **Data fetching**: [TanStack Query](https://tanstack.com/query) + [Eden Treaty](https://elysiajs.com/eden/overview) (type-safe API client)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) with OKLCH color tokens
- **Components**: [Base UI](https://base-ui.com/) primitives + [CVA](https://cva.style/) variants
- **Editor**: [TipTap](https://tiptap.dev/) with lowlight syntax highlighting
- **Auth**: [better-auth](https://better-auth.com/) React client (GitHub + Google OAuth)
- **Icons**: [Huge Icons](https://hugeicons.com/)
- **Toasts**: [Sonner](https://sonner.emilkowal.dev/)
- **Fonts**: Inter (UI), Source Serif 4 (articles), JetBrains Mono (code)

## Pages & Routes

| Route                 | Description                                                               |
| --------------------- | ------------------------------------------------------------------------- |
| `/`                   | Home page -- hero section, featured articles grid, paginated article feed |
| `/article/:slug`      | Article view -- full content with like, comment, and share actions        |
| `/u/:username`        | User profile -- avatar, name, and list of their articles                  |
| `/write`              | New article editor (auth required, SSR disabled)                          |
| `/article/edit/:slug` | Edit existing article (auth + ownership required, SSR disabled)           |

Layout: `_main` wraps home, article view, and profile pages with a shared header and footer.

## Working Features

### Editor (TipTap)

- Bold, italic, strikethrough, headings (H2), blockquotes, bullet/numbered lists, horizontal rules
- Code blocks with syntax highlighting (lowlight, common languages)
- Inline code toggle
- Image insertion via file upload (Cloudinary) or URL paste
- Link editing with inline URL input (apply/remove)
- Bubble menu on text selection (bold, italic, strike, link, code)
- Floating block menu (+) on empty lines (heading, quote, lists, code block, image)
- Placeholder text ("Write your article...")
- Undo/redo (history)

### Publishing

- Publish dialog with preview image upload, preview title, preview text (150 char max), and tag input (1-5 tags, min 3 chars each)
- Edit dialog with pre-populated fields from existing article
- Zod validation on all fields before submission

### Article Display

- Prose typography with serif font and dark mode support
- Server-side + client-side HTML sanitization (DOMPurify)
- Code block highlighting (highlight.js, atom-one-dark theme)
- Content bar with like, comment, share, and options buttons

### Social

- Like/unlike articles with live count
- Comments with pagination (20 per page)
- Like/unlike individual comments
- Share via copy link, Facebook, X (Twitter), Reddit, LinkedIn
- Scroll-to-comments from content bar

### Auth

- GitHub OAuth sign-in via modal dialog
- Session pre-loaded on every navigation (server function in root loader)
- Protected routes redirect unauthenticated users to home
- User context available via `Route.useRouteContext()` or `useUser()` hook

### Theme

- Light and dark mode via CSS custom properties (OKLCH color space)
- `next-themes` integration for theme toggling
- Dark prose inversion for articles and editor

### Responsive

- Mobile-first layout with breakpoints for tablet and desktop
- Responsive grids for featured articles and profile pages
- Hidden/shown elements at different breakpoints

## Incomplete Features

These have UI elements but are not fully functional:

- **Save as draft** -- button disabled
- **Delete article** -- UI present, action is `console.log`
- **Delete comment** -- dropdown exists, no mutation wired
- **Follow author** -- UI present, action is `console.log`
- **Report article** -- UI present, action is `console.log`
- **Settings page** -- menu item exists, no route
- **Follower count** -- API returns data, not rendered on profile
- **Write nav item** -- avatar dropdown item has no handler
- **Per-article SEO** -- no Open Graph or Twitter Card meta tags

## Component Library

All built with Base UI primitives + CVA + Tailwind:

| Component     | Variants / Notes                                                            |
| ------------- | --------------------------------------------------------------------------- |
| Button        | 6 variants (default, outline, secondary, ghost, destructive, link), 8 sizes |
| Avatar        | 3 sizes, fallback initials, badge, group support                            |
| Dialog        | Full modal system with overlay, backdrop blur, animated                     |
| Dropdown Menu | Items, checkbox/radio items, sub-menus, separators, destructive variant     |
| Badge         | 6 variants                                                                  |
| Card          | Header, content, footer, action slots, 2 sizes                              |
| Input         | Standard text input with focus ring                                         |
| Textarea      | Standard textarea with focus ring                                           |
| Label         | Form label                                                                  |
| Alert         | Default and destructive variants                                            |
| Popover       | Positioned, animated                                                        |
| Spinner       | Loading animation                                                           |
| Toaster       | Theme-aware toast notifications (sonner)                                    |
| Tag Input     | Enter/comma/space to add, backspace to remove, max limit                    |

## Development

```bash
bun dev              # Dev server (http://localhost:3001)
bun build            # Production build
bun check            # Prettier write + ESLint fix
bun format           # Run Prettier
bun lint             # Run ESLint
bun test             # Run all tests (Vitest)
bun vitest run <path> # Run single test
```

## Environment Variables

| Variable          | Description                                    |
| ----------------- | ---------------------------------------------- |
| `VITE_SERVER_URL` | Backend API URL (e.g. `http://localhost:3000`) |
