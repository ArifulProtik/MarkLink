# MarkLink

> A Blog and Book Writing And Publishing Platform where people can connect, write, share, and publish.

MarkLink is a comprehensive platform designed for writers and readers to engage in a seamless ecosystem of content creation and consumption. Whether you're drafting your next novel, sharing a quick thought, or connecting with your favorite authors, MarkLink provides the tools you need.

## Features

### ✍️ Writing & Publishing

- **Advanced Editor**: A powerful, notion-style editor based on **Tiptap** for a rich writing experience.
- **Blogs & Books**: Support for both short-form blog posts and long-form book publishing.
- **Drafts**: Save your work in progress and publish when ready.

### 🌐 Social Connectivity

- **Moments**: Share short, social-media-style posts to engage with your audience instantly.
- **Chat**: Real-time messaging to connect privately with other users and authors (Powered by Redis).
- **Follow System**: Build your network by following favorite authors and creators to stay updated with their latest work.

### 🔗 Sharing

- **Easy Sharing**: Share your published stories and moments across platforms with a single click.

## Tech Stack

MarkLink is built using a modern, robust, and scalable technology stack:

### Backend

- **[ElysiaJS](https://elysiajs.com)**: A fast and typesafe web framework for Bun.
- **[Drizzle ORM](https://orm.drizzle.team/)**: TypeScript-first Object Relational Mapper for maximum type safety.
- **[PostgreSQL](https://www.postgresql.org/)**: Advanced open-source relational database.
- **[Better Auth](https://better-auth.com/)**: Secure authentication solution with GitHub social login.
- **[Redis](https://redis.io/)**: In-memory data structure store for real-time features.
- **[Cloudinary](https://cloudinary.com/)**: Cloud-based image and video management.

### Frontend

- **[React 19](https://react.dev/)**: The latest version of the popular library for user interfaces.
- **[TanStack Start](https://tanstack.com/start)**: Full-stack React framework for SSR and type-safety.
- **[TanStack Router](https://tanstack.com/router)**: Type-safe routing for React applications.
- **[TanStack Query](https://tanstack.com/query)**: Powerful asynchronous state management.
- **[Tailwind CSS 4.0](https://tailwindcss.com/)**: A utility-first CSS framework for rapid UI development.
- **[Shadcn UI](https://ui.shadcn.com/)**: Beautifully designed components built with Radix UI and Tailwind CSS.
- **[Bun](https://bun.sh/)**: Fast all-in-one JavaScript runtime and package manager.

## Getting Started

Follow these instructions to set up the project locally.

### Prerequisites

Ensure you have the following installed on your machine:

- **[Bun](https://bun.sh/)** (v1.x or higher)
- **PostgreSQL** (running locally or a cloud instance)
- **Redis** (running locally or a cloud instance)

### Installation

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd marklink
   ```

2. **Install dependencies** for both Backend and UI:

   ```bash
   # Install Backend dependencies
   cd backend
   bun install
   
   # Install UI dependencies
   cd ../ui
   bun install
   ```

### Environment Setup

1. **Backend Environment**:
   Create a `.env` file in the `backend` directory:

   ```bash
   cd backend
   touch .env
   ```

   Add the following variables:
   ```env
   DATABASE_URL=postgres://user:password@localhost:5432/marklink
   REDIS_HOST=localhost
   GITHUB_CLIENT_ID=your_github_client_id
   GITHUB_CLIENT_SECRET=your_github_client_secret
   UI_CLIENT_URL=http://localhost:3001
   CLOUDINARY_URL=your_cloudinary_url
   ```

2. **Frontend Environment**:
   Create a `.env` file in the `ui` directory:
   ```bash
   cd ../ui
   touch .env
   ```
   Add the following variables:
   ```env
   VITE_SERVER_URL=http://localhost:3000
   ```

### Database Setup

Navigate to the `backend` directory and use Drizzle Kit to push the schema:

```bash
cd backend
bun run push
```

### Running the Project

You need to run the backend and frontend separately.

#### 1. Backend (API)

```bash
cd backend
bun run dev
```

The server will run on `http://localhost:3000`. Documentation (Scalar) is available at `http://localhost:3000/api/v1/reference`.

#### 2. Frontend (UI)

```bash
cd ui
bun run dev
```

The frontend will be available at `http://localhost:3001`.

## Project Structure

```
marklink/
├── backend/        # ElysiaJS Backend
│   ├── src/        # Source code
│   ├── drizzle/    # Database migrations
│   └── ...
├── ui/             # TanStack Start Frontend
│   ├── src/        # Source code
│   ├── public/     # Static assets
│   └── ...
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
