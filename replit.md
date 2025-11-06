# Machine Flesh Archive - Replit Project Documentation

## Overview

Machine Flesh Archive is a static web gallery by Jenna Singh exploring the intersection of human bodies and technology. The project presents a curated collection of 16 items including images, videos, and articles about prosthetics, neural interfaces, and biomechanical enhancement through a dark, gallery-focused interface. Users can browse the archive, view detailed information about each item, and read the curatorial statement.

**Tech Stack:**
- **Frontend**: React with TypeScript, Vite build system
- **UI Framework**: shadcn/ui components with Radix UI primitives
- **Styling**: Tailwind CSS with custom dark theme
- **Backend**: Express.js server (serves static files only)
- **Data Storage**: Static JSON file (`public/data/gallery.json`)
- **Routing**: Wouter (lightweight client-side routing)
- **State Management**: TanStack Query (React Query)

## User Preferences

- Preferred communication style: Simple, everyday language
- Author: Jenna Singh (displayed in header)

## System Architecture

### Frontend Architecture

**Component Structure:**
- Uses React functional components with TypeScript throughout
- UI components follow the shadcn/ui pattern - Radix UI primitives wrapped with custom styling
- Page components located in `client/src/pages/`: Gallery (home), ItemDetail, CuratorialStatement, About, NotFound
- Layout components: Header (fixed navigation with author name) and Footer (removed)
- Component aliases configured for clean imports (`@/components`, `@/hooks`, `@/lib`)
- PageTransition component for smooth route animations using Framer Motion

**Design System:**
- Dark-first theme with biomechanical aesthetic inspired by Material Design
- Solid dark background (no patterns) for optimal content focus
- Typography: Inter and Roboto Mono from Google Fonts for technical precision
- Responsive grid system: 3-column desktop, 2-column tablet, 1-column mobile
- Gallery thumbnails show titles only on hover (no persistent titles below images)
- Consistent spacing using Tailwind's spacing primitives (2, 4, 6, 8, 12, 16, 24)
- Custom CSS variables for theme colors in HSL format
- Hover/active state elevations for interactive elements
- Page transitions with subtle fade and vertical motion effects

**State Management:**
- TanStack Query handles data fetching with configured query client
- Custom query functions in `lib/queryClient.ts` for fetching static JSON data
- Data is cached in memory after initial load for performance
- No global client state - relies on React Query cache and URL parameters

### Backend Architecture

**Server Structure:**
- Express.js application with TypeScript (simplified to serve static files only)
- No API routes - all data served as static JSON
- Development mode includes Vite middleware for HMR
- Production mode serves static built assets
- Serves static assets from `/attached_assets` directory
- Serves gallery data from `/data` directory (maps to `public/data`)

**Static Data:**
- Gallery data stored in `public/data/gallery.json`
- Contains 16 curated items with complete metadata
- Each item includes: id, title, hoverTitle, mediaType, mediaUrl, thumbnailUrl, subheading, aboutTheWork, relevanceToTheme, source
- Frontend fetches data once and caches it using TanStack Query
- Images use `@assets/` prefix which gets replaced with `/attached_assets/` in frontend

### Gallery Content Structure

**Data Model:**
Gallery items in `public/data/gallery.json` include:
- `id` (string): Unique identifier (kebab-case slugs for URLs)
- `title` (string): Full title displayed on detail page
- `hoverTitle` (string|null): Shorter title shown on gallery hover
- `description` (string): Legacy field (empty, replaced by aboutTheWork/relevanceToTheme)
- `mediaType` (enum): 'image', 'video', or 'article'
- `mediaUrl` (string): URL or @assets path to media
- `thumbnailUrl` (string): URL or @assets path to thumbnail
- `order` (string): Sort order for gallery display
- `subheading` (string|null): Italic subheading on detail page
- `aboutTheWork` (string|null): Description of the work
- `relevanceToTheme` (string|null): Connection to Machine Flesh theme
- `source` (string|null): Source URL reference

**Current Content:**
- 16 curated items covering medical tech, robotics, AI, performance art, wearables
- Includes video items (FKA Twigs, Arca, Neil Harbisson) using YouTube embeds
- All items feature consistent structure with poetic subheadings and structured descriptions

### Build & Development

**Development Workflow:**
- Vite dev server with HMR for instant feedback
- Express server runs concurrently via `tsx` (TypeScript executor)
- Shared types between client/server via `shared/` directory
- Path aliases resolve at build time and IDE level

**Production Build:**
- Client builds to `dist/public` via Vite
- Server bundles to `dist/index.js` via esbuild
- Single Node.js process serves static files and JSON data
- External packages not bundled (uses node_modules at runtime)

**Type Safety:**
- Strict TypeScript throughout
- Shared schema types in `shared/schema.ts` for type consistency
- JSON data structure matches TypeScript interfaces

## External Dependencies

### UI Component Library
- **shadcn/ui**: Component collection built on Radix UI primitives
- **Radix UI**: Headless UI components for accessibility (20+ packages including Dialog, Dropdown, Popover, etc.)
- **Tailwind CSS**: Utility-first CSS framework with custom configuration
- **class-variance-authority**: Type-safe variant styling for components
- **Lucide React**: Icon library for UI elements

### Data & Validation
- **Zod**: Schema validation and type inference
- Database packages (Drizzle, Neon) are installed but not actively used in static architecture

### Development Tools
- **Vite**: Frontend build tool and dev server
- **esbuild**: Server bundler for production
- **tsx**: TypeScript execution for development server
- **@replit/vite-plugin-***: Replit-specific development enhancements (error overlay, dev banner, cartographer)

### Data Management
- **TanStack Query**: Client-side data fetching and caching
- Data loaded from static JSON file on initial page load
- Cached in memory for subsequent navigation

### Router
- **Wouter**: Lightweight React router (~1.2KB) as alternative to React Router

### Media Sources
- **Unsplash**: External image hosting for gallery thumbnails and media (referenced in sample data)
- External URLs for article PDFs and video content

### Fonts
- **Google Fonts**: Inter and Roboto Mono served via CDN for typography system