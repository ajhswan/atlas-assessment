# Atlas Assessment - Frontend

This is a React + TypeScript application built with React Router v7 and Vite.

## Running Locally

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev
```

The app will be available at `http://localhost:5173`

## Folder Structure

```
FE/
├── src/
│   ├── app/
│   │   ├── routes/          # React Router v7 route files
│   │   │   ├── _app.tsx     # App layout wrapper
│   │   │   ├── home.tsx     # Home page
│   │   │   ├── posts.tsx    # Posts list
│   │   │   ├── posts.$id.tsx        # View individual post
│   │   │   ├── posts.$id.edit.tsx   # Edit post
│   │   │   ├── posts.new.tsx        # Create new post
│   │   │   ├── auth.tsx             # Auth layout
│   │   │   ├── auth.login.tsx       # Login page
│   │   │   ├── auth.register.tsx    # Registration page
│   │   │   ├── auth.recovery.tsx    # Password recovery
│   │   │   └── reset-password.$token.tsx  # Password reset
│   │   ├── features/        # Feature-specific components
│   │   │   ├── login/       # Login form components
│   │   │   ├── signup/      # Signup form components
│   │   │   ├── recovery/    # Recovery form components
│   │   │   └── reset-password/  # Reset password components
│   │   ├── api.server.ts    # API client for backend calls
│   │   ├── session.server.ts # Session management
│   │   ├── root.tsx         # Root component
│   │   └── index.css        # Global styles
│   ├── components/
│   │   ├── ui/              # Reusable UI components (shadcn-style)
│   │   ├── Header.tsx       # App header
│   │   ├── PostCard.tsx     # Post card component
│   │   ├── PostList.tsx     # Post list component
│   │   ├── TiptapEditor.tsx # Rich text editor
│   │   ├── AuthForm.tsx     # Auth form wrapper
│   │   ├── AuthContainer.tsx # Auth page container
│   │   └── UserProfileModal.tsx # User profile modal
│   ├── types/
│   │   └── api.ts           # TypeScript types for API
│   └── lib/                 # Utility functions
├── public/                  # Static assets
└── package.json
```

## Tech Stack

- **React Router v7** - File-based routing and SSR
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Styling
- **TanStack Query** - Data fetching and caching
- **Tiptap** - Rich text editor
- **React Hook Form** - Form handling
