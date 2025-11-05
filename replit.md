# Machine Flesh Archive - Replit Project Documentation

## Overview

Machine Flesh Archive is a web-based gallery application exploring the intersection of human bodies and technology. The project presents a curated collection of images, videos, and articles about prosthetics, neural interfaces, and biomechanical enhancement through a dark, gallery-focused interface.

**Tech Stack:**
- **Frontend**: React with TypeScript, Vite build system
- **UI Framework**: shadcn/ui components with Radix UI primitives
- **Styling**: Tailwind CSS with custom dark theme
- **Backend**: Express.js server
- **Database**: PostgreSQL via Neon serverless
- **ORM**: Drizzle ORM
- **Routing**: Wouter (lightweight client-side routing)
- **State Management**: TanStack Query (React Query)

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Component Structure:**
- Uses React functional components with TypeScript throughout
- UI components follow the shadcn/ui pattern - Radix UI primitives wrapped with custom styling
- Page components located in `client/src/pages/`: Gallery (home), ItemDetail, NotFound
- Layout components: Header (fixed navigation) and Footer
- Component aliases configured for clean imports (`@/components`, `@/hooks`, `@/lib`)

**Design System:**
- Dark-first theme with biomechanical aesthetic inspired by Material Design
- Typography: Inter and Roboto Mono from Google Fonts for technical precision
- Responsive grid system: 3-column desktop, 2-column tablet, 1-column mobile
- Consistent spacing using Tailwind's spacing primitives (2, 4, 6, 8, 12, 16, 24)
- Custom CSS variables for theme colors in HSL format
- Hover/active state elevations for interactive elements

**State Management:**
- TanStack Query handles server state with configured query client
- Custom query functions in `lib/queryClient.ts` for API communication
- No global client state - relies on React Query cache and URL parameters

### Backend Architecture

**Server Structure:**
- Express.js application with TypeScript
- Modular route registration pattern in `server/routes.ts`
- In-memory storage implementation with interface for future database migration
- Development mode includes Vite middleware for HMR
- Production mode serves static built assets

**API Endpoints:**
- `GET /api/gallery` - Fetch all gallery items
- `GET /api/gallery/:id` - Fetch single gallery item by ID

**Storage Layer:**
- `IStorage` interface defines contract for data operations
- `MemStorage` class provides in-memory implementation with seeded sample data
- Designed for easy swap to database-backed storage (Drizzle ORM already configured)
- Sample data includes prosthetics, neural interfaces, and theoretical articles

### Database Architecture

**Schema Design (Drizzle ORM):**
- `users` table: Basic authentication structure (id, username, password)
- `galleryItems` table: Core content storage with fields:
  - id (UUID primary key)
  - title, description (text)
  - mediaType (enum: 'image', 'video', 'article')
  - mediaUrl, thumbnailUrl (external URLs)
  - order (varchar for custom sorting)

**Database Configuration:**
- PostgreSQL dialect configured via Neon serverless driver
- Migration files output to `./migrations` directory
- Schema defined in `shared/schema.ts` for type sharing between client/server
- Zod schemas generated from Drizzle tables for validation

**Current State:**
- Database schema defined but using in-memory storage
- Ready for migration with `npm run db:push` command
- Requires `DATABASE_URL` environment variable for database connection

### Build & Development

**Development Workflow:**
- Vite dev server with HMR for instant feedback
- Express server runs concurrently via `tsx` (TypeScript executor)
- Shared types between client/server via `shared/` directory
- Path aliases resolve at build time and IDE level

**Production Build:**
- Client builds to `dist/public` via Vite
- Server bundles to `dist/index.js` via esbuild
- Single Node.js process serves both API and static files
- External packages not bundled (uses node_modules at runtime)

**Type Safety:**
- Strict TypeScript throughout
- Shared schema types ensure client-server contract
- Zod validation for runtime type checking on API boundaries

## External Dependencies

### UI Component Library
- **shadcn/ui**: Component collection built on Radix UI primitives
- **Radix UI**: Headless UI components for accessibility (20+ packages including Dialog, Dropdown, Popover, etc.)
- **Tailwind CSS**: Utility-first CSS framework with custom configuration
- **class-variance-authority**: Type-safe variant styling for components
- **Lucide React**: Icon library for UI elements

### Database & ORM
- **Drizzle ORM**: TypeScript ORM for PostgreSQL with migration support
- **@neondatabase/serverless**: Neon serverless PostgreSQL driver
- **drizzle-zod**: Automatic Zod schema generation from Drizzle tables
- **connect-pg-simple**: PostgreSQL session store (configured but not actively used)

### Development Tools
- **Vite**: Frontend build tool and dev server
- **esbuild**: Server bundler for production
- **tsx**: TypeScript execution for development server
- **@replit/vite-plugin-***: Replit-specific development enhancements (error overlay, dev banner, cartographer)

### Form & Data Management
- **React Hook Form**: Form state management with `@hookform/resolvers` for validation
- **TanStack Query**: Server state management and caching
- **Zod**: Schema validation and type inference
- **date-fns**: Date manipulation utilities

### Router
- **Wouter**: Lightweight React router (~1.2KB) as alternative to React Router

### Media Sources
- **Unsplash**: External image hosting for gallery thumbnails and media (referenced in sample data)
- External URLs for article PDFs and video content

### Fonts
- **Google Fonts**: Inter and Roboto Mono served via CDN for typography system