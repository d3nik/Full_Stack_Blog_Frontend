# Full Stack Blog — Frontend

A polished, production-ready frontend for a Full Stack Blog application. This repository contains the UI that connects to the blog backend (API), handles authentication, authoring and editing posts, displays lists and single post views, and provides a smooth reading experience on desktop and mobile.

---

## Table of contents

- [Demo](#demo)
- [Features](#features)
- [Tech stack](#tech-stack)
- [Getting started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Local setup](#local-setup)
  - [Environment variables](#environment-variables)
- [Available scripts](#available-scripts)
- [Project structure](#project-structure)
- [Design & accessibility](#design--accessibility)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [Troubleshooting](#troubleshooting)
- [License](#license)
- [Contact](#contact)

---

## Features

- Responsive, mobile-first UI
- Authentication (signup / login / sessions / JWT)
- Create, edit, preview, and delete blog posts
- Rich text / Markdown editor with live preview
- Post listing with pagination, tags, and search
- Author profile pages
- Commenting system (if supported by backend)
- Image upload integration
- SEO-friendly meta tags and Open Graph tags
- Accessible (WCAG-aware) components

---

## Tech stack

Replace this list with the actual libraries and frameworks used in the repo.

- Framework: React / Next.js / Vue / Svelte / Angular
- Language: JavaScript / TypeScript
- Styling: CSS Modules / Tailwind / Styled Components / SCSS
- State management: React Query / Redux / Zustand / Pinia
- HTTP client: fetch / axios
- Auth: JWT / OAuth / NextAuth (depending on backend)
- Testing: Jest / Vitest / React Testing Library / Cypress
- Linting & formatting: ESLint, Prettier
- CI: GitHub Actions (suggested)

---

## Getting started

### Prerequisites

- Node.js (>= 16) and npm or yarn
- Access to the backend API (local or remote)

### Local setup

1. Clone the repository:
   ```bash
   git clone https://github.com/d3nik/Full_Stack_Blog_Frontend.git
   cd Full_Stack_Blog_Frontend
   ```

2. Install dependencies:
   ```bash
   # npm
   npm install

   # or yarn
   yarn
   ```

3. Create environment variables

   Copy the example environment file and update values:
   ```bash
   cp .env.example .env.local
   ```
   Example `.env.local` (replace values with your backend and keys):
   ```env
   # API
   VITE_API_BASE_URL=https://api.example.com
   # or NEXT_PUBLIC_API_BASE_URL for Next.js

   # Auth
   VITE_AUTH_TOKEN_KEY=auth_token

   # Optional integrations
   VITE_SENTRY_DSN=
   VITE_STRIPE_PUBLIC_KEY=
   ```

4. Run the app in development mode:
   ```bash
   # npm
   npm run dev

   # or yarn
   yarn dev
   ```
   Then open http://localhost:3000 (or the port shown) in your browser.

---

## Available scripts

List below are example scripts; update to match your project's package.json.

- `dev` — Start the development server
- `build` — Create a production build
- `start` — Start the production server (if applicable)
- `lint` — Run ESLint
- `format` — Run Prettier
- `test` — Run unit tests
- `test:watch` — Run unit tests in watch mode
- `cypress` / `e2e` — Run end-to-end tests

Example:
```bash
npm run dev
npm run build
npm run start
npm run test
npm run lint
```

---

## Project structure

A suggested folder structure — adjust to fit your repository:

```
/src
  /components      # Reusable UI components
  /pages           # Route pages (Next.js) or views
  /features        # Domain-specific modules
  /hooks           # Custom hooks
  /services        # API clients / auth services
  /styles          # Global styles / design tokens
  /utils           # Utility helpers
  /assets          # Images, icons, fonts
/tests             # Test utilities and end-to-end tests
/public            # Static files
.env.example
README.md
```

---

## Design & accessibility

- Follow a consistent design system (colors, spacing, typography).
- Use semantic HTML and ARIA attributes for dynamic components.
- Ensure color contrast meets WCAG AA standards.
- Keyboard-first navigation and focus management for modals and dialogs.
- Provide alt text for images and proper labels for form controls.

---

## Testing

- Unit tests: write tests for critical components and utilities.
- Integration tests: test flows like login, create/edit post.
- End-to-end tests: run Cypress/Playwright for user flows.
- Example commands:
  ```bash
  npm test
  npm run test:watch
  npm run e2e
  ```

Tips:
- Mock API responses for unit tests.
- Use CI to run tests on PRs and prevent regressions.

---

## Troubleshooting

- CORS errors: ensure the backend includes the frontend origin in allowed origins.
- Auth issues: confirm tokens are stored and sent correctly; check cookie vs header behavior.
- 500 errors from API: check backend logs and API base URL in `.env`.
- Port conflicts: change the port via environment variable or command line flag.

---

## License

MIT © d3nik

---

## Contact

Maintainer: d3nik  
GitHub: https://github.com/d3nik 
