# MarkLink Backend

> ElysiaJS API server for the MarkLink blogging platform.

**Note: This project is no longer under active development.**

## Tech Stack

- **Runtime**: [Bun](https://bun.sh/)
- **Framework**: [ElysiaJS](https://elysiajs.com/)
- **ORM**: [Drizzle](https://orm.drizzle.team/) with [PostgreSQL](https://www.postgresql.org/)
- **Auth**: [better-auth](https://better-auth.com/) (GitHub + Google OAuth, session-based)
- **Image hosting**: [Cloudinary](https://cloudinary.com/)
- **HTML sanitization**: [DOMPurify](https://github.com/cure53/DOMPurify) (isomorphic-dompurify)
- **Cache**: [Redis](https://redis.io/) via ioredis (initialized, not actively used)
- **Linting**: ESLint with [@antfu/eslint-config](https://github.com/antfu/eslint-config)
- **API docs**: OpenAPI with [Scalar](https://scalar.com/) UI

## API Endpoints

All routes are prefixed with `/api/v1`.

### Auth (handled by better-auth)

| Path | Description |
|---|---|
| `/auth/sign-in/social` | Initiate OAuth sign-in (GitHub, Google) |
| `/auth/callback/:provider` | OAuth callback |
| `/auth/sign-out` | Sign out / destroy session |
| `/auth/get-session` | Get current session |

### Articles (`/article`)

| Method | Path | Auth | Description |
|---|---|---|---|
| `POST` | `/` | Required | Create article (title, content, preview image/text, tags) |
| `GET` | `/` | None | List articles with pagination (limit, offset) |
| `GET` | `/featured` | None | Get up to 4 featured articles |
| `GET` | `/:slug` | Optional | Get single article by slug (includes `isLikedByUser` if authed) |
| `PUT` | `/id/:id` | Required | Update article (owner only) |
| `DELETE` | `/id/:id` | Required | Delete article (owner only) |
| `GET` | `/user/:id` | Optional | Get articles by user ID with pagination |

### Comments (`/comments`)

| Method | Path | Auth | Description |
|---|---|---|---|
| `POST` | `/` | Required | Create comment on an article |
| `GET` | `/:articleId` | Optional | List comments for article (includes like count, `isLikedByUser`) |
| `PATCH` | `/id/:id` | Required | Update comment (owner only) |
| `DELETE` | `/id/:id` | Required | Delete comment (owner only) |
| `POST` | `/like` | Required | Toggle like on a comment |

### Likes (`/like`)

| Method | Path | Auth | Description |
|---|---|---|---|
| `POST` | `/` | Required | Toggle like on an article |

### Upload (`/upload`)

| Method | Path | Auth | Description |
|---|---|---|---|
| `POST` | `/` | Required | Upload image to Cloudinary (max 3MB, PNG/JPEG/WebP) |

### Users (`/users`)

| Method | Path | Auth | Description |
|---|---|---|---|
| `GET` | `/:username` | Optional | Get user profile (follower count, isFollowed, isFriend) |
| `GET` | `/follow/:id` | Required | Follow a user |
| `GET` | `/unfollow/:id` | Required | Unfollow a user |

### Health

| Method | Path | Description |
|---|---|---|
| `GET` | `/health` | Returns `{ status: 'ok' }` |

## Database Schema

| Table | Description |
|---|---|
| `user` | Users with name, email, username, image |
| `session` | Auth sessions (token, expiry, IP, user agent) |
| `account` | OAuth provider accounts (GitHub, Google) |
| `verification` | Auth verification tokens |
| `article` | Blog posts with title, content (HTML), slug, tags, preview image/text, published/featured flags |
| `comment` | Comments on articles |
| `like` | Article likes (unique per user per article) |
| `comment_like` | Comment likes (unique per user per comment) |
| `follower` | User follow relationships (self-referencing, no self-follows) |

All tables include `id` (UUIDv7), `created_at`, and `updated_at` base columns.

## Development

```bash
bun dev          # Start dev server with hot reload (port 3000)
bun start        # Production server
bun lint         # Run ESLint
bun lint:fix     # Auto-fix linting errors
bun test         # Run all tests
bun test <path>  # Run single test (e.g. bun test src/auth.test.ts)
```

## Database Commands

```bash
bun generate     # Generate Drizzle migration from schema changes
bun push         # Push schema directly to database (dev only)
bun migrate      # Apply pending migrations
bun studio       # Open Drizzle Studio GUI
```

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `GITHUB_CLIENT_ID` | Yes | GitHub OAuth client ID |
| `GITHUB_CLIENT_SECRET` | Yes | GitHub OAuth client secret |
| `GOOGLE_CLIENT_ID` | Yes | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Yes | Google OAuth client secret |
| `UI_CLIENT_URL` | Yes | Frontend URL for CORS and auth |
| `CLOUDINARY_URL` | Yes | Cloudinary connection URL |
| `REDIS_HOST` | No | Redis host (default: localhost) |
| `PORT` | No | Server port (default: 3000) |
| `NODE_ENV` | No | development, production, or test |

API documentation is available at `http://localhost:3000/api/v1/reference` when the server is running.
