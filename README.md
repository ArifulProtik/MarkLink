# MarkLink

> A Blog and Book Writing And Publishing Platform where people can connect, write, share, and publish.

MarkLink is a comprehensive platform designed for writers and readers to engage in a seamless ecosystem of content creation and consumption. Whether you're drafting your next novel, sharing a quick thought, or connecting with your favorite authors, MarkLink provides the tools you need.

## Features

### ✍️ Writing & Publishing

- **Advanced Editor**: A powerful, notion-style editor based on Tiptap for a rich writing experience.
- **Blogs & Books**: Support for both short-form blog posts and long-form book publishing.
- **Drafts**: Save your work in progress and publish when ready.

### 🌐 Social Connectivity

- **Moments**: Share short, social-media-style posts to engage with your audience instantly.
- **Chat**: Real-time messaging to connect privately with other users and authors.
- **Follow System**: Build your network by following favorite authors and creators to stay updated with their latest work.

### 🔗 Sharing

- **Easy Sharing**: Share your published stories and moments across platforms with a single click.

## Tech Stack

MarkLink is built using a modern, robust, and scalable technology stack:

### Backend

- **[ElysiaJS](https://elysiajs.com)**: A progressive Node.js framework for building efficient and scalable server-side applications.
- **[Drizzle ORM](https://orm.drizzle.team/)**: TypeScript-first Object Relational Mapper for maximum type safety.
- **[PostgreSQL](https://www.postgresql.org/)**: Advanced open-source relational database.
- **[Better Auth](https://better-auth.com/)**: Secure authentication solution.
- **[tRPC](https://trpc.io/)**: End-to-end typesafe APIs.

### Frontend

- **[React](https://react.dev/)**: The library for web and native user interfaces.
- **[TanStack Start](https://tanstack.com/start)**: Full-stack React framework.
- **[TanStack Router](https://tanstack.com/router)**: Type-safe routing for React applications.
- **[TanStack Query](https://tanstack.com/query)**: Powerful asynchronous state management.
- **[Tailwind CSS](https://tailwindcss.com/)**: A utility-first CSS framework for rapid UI development.
- **[Shadcn UI](https://ui.shadcn.com/)**: Beautifully designed components built with Radix UI and Tailwind CSS.
- **[Bun](https://bun.sh/)**: Fast all-in-one JavaScript runtime and package manager.

## Getting Started

Follow these instructions to set up the project locally.

### Prerequisites

Ensure you have the following installed on your machine:

- **[Bun](https://bun.sh/)** (v1.x or higher)
- **Node.js** (v20 or higher - though Bun is the primary runtime)
- **PostgreSQL** (running locally or a cloud instance)

### Installation

1. **Clone the repository** (if not already done):

   ```bash
   git clone <repository-url>
   cd marklink
   ```

2. **Install dependencies** for the root workspace:

   ```bash
   bun install
   ```

3. **Install dependencies** for the frontend:
   ```bash
   cd ui
   bun install
   cd ..
   ```

### Environment Setup

1. **Backend Environment**:
   Duplicate the `.env.example` file (if available) or create a `.env` file in the root directory:

   ```bash
   cp .env.example .env
   ```

   _Make sure to update `DATABASE_URL` and other secrets._

2. **Frontend Environment**:
   Create a `.env.local` file in the `ui` directory:
   ```bash
   cp ui/.env.example ui/.env.local
   ```

### Database Setup

Use Drizzle Kit to push the schema to your database:

```bash
bun run db:push
```

### Running the Project

You can run the backend and frontend separately.

#### 1. Backend (API)

Start the NestJS server in development mode:

```bash
bun run start:dev
```

The server will typically run on `http://localhost:3000`.

#### 2. Frontend (UI)

Open a new terminal window, navigate to the `ui` directory (if you want to run it directly from there) or use the root script if configured. Assuming you run it from the root specifically for the UI workspace:

```bash
bun run ui:dev
```

_Note: Make sure you have a script `ui:dev` effectively running `cd ui && bun run dev` or navigate to `ui` and run `bun run dev`._

The frontend will be available at `http://localhost:3001` (or the port specified in your Vite config).

## Project Structure

```
marklink/
├── src/            # Backend (NestJS) source code
│   ├── app.module.ts
│   └── ...
├── ui/             # Frontend (React + TanStack) source code
│   ├── src/
│   │   ├── routes/
│   │   ├── components/
│   │   └── ...
├── drizzle/        # Database schema and migrations
├── package.json    # Root scripts and dependencies
└── README.md       # Project documentation
```

## Contributing

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/amazing-feature`).
3. Commit your changes (`git commit -m 'Add some amazing feature'`).
4. Push to the branch (`git push origin feature/amazing-feature`).
5. Open a Pull Request.

## License

This project is currently private/UNLICENSED.
