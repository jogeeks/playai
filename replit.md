# AI Serendipity Generator Machine

## Overview

An immersive 3D web experience inspired by Burning Man's desert aesthetic, featuring three interactive AI-powered art installations. Users explore a mystical desert environment and interact with three distinct machines: the Serendipity Dispenser (generates personalized missions), the Reflective Oracle (conversational AI guide), and the Temple (transforms burdens into wisdom). The application combines React Three Fiber for 3D rendering with Anthropic's Claude AI for intelligent content generation.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React 18 with TypeScript and Vite for development/building

**3D Graphics Engine**: 
- React Three Fiber (@react-three/fiber) for declarative Three.js rendering
- @react-three/drei for pre-built 3D components (Float, Text, Sky, OrbitControls, etc.)
- Custom procedurally-generated desert terrain with sine wave displacement
- Three distinct 3D machine models with animated states (hover, processing, active)

**State Management**:
- Zustand with subscribeWithSelector middleware
- Centralized store managing: active machine selection, dispenser settings (intensity, social, weirdness), oracle chat history, temple transmutation state, and audio preferences
- Mission types: Connection, Creativity, Adventure, Learning, Self-Discovery

**UI Component Library**:
- Radix UI primitives for accessible components (Dialog, Slider, Switch, Button, etc.)
- Shadcn/ui design system with Tailwind CSS v4 (new @theme inline syntax)
- Custom fonts: Orbitron (cyberpunk headers), Rajdhani (tech UI), Cinzel (divine/ancient text)

**Routing**: Wouter for lightweight client-side routing

**Animation**: Framer Motion for UI transitions and reveals

**Styling**: 
- Tailwind CSS with custom theme variables for mission colors and divine/ancient aesthetics
- CSS variables for dynamic theming (background, foreground, mission-specific colors)
- PostCSS with Autoprefixer

### Backend Architecture

**Server Framework**: Express.js with TypeScript

**Build System**:
- ESBuild for server bundling with selective dependency bundling (allowlist approach to reduce syscalls)
- Vite for client bundling with custom plugins
- Separate dev/production modes

**API Endpoints**:
- `GET /api/health` - Health check with Claude connectivity test
- `POST /api/dispenser` - Generate serendipity missions based on user aspirations and advanced settings (intensity, social factor, absurdity)

**Development Middleware**:
- Vite dev server with HMR over WebSocket (`/vite-hmr`)
- Custom logging middleware tracking request duration and response data
- Raw body preservation for webhook validation

**Static File Serving**: 
- Production: Serves pre-built client from `dist/public`
- Development: Vite middleware with dynamic template reloading

**Custom Vite Plugins**:
- `vite-plugin-meta-images`: Automatically updates OpenGraph meta tags with correct Replit deployment URLs
- Replit-specific plugins: cartographer (dev mode), dev-banner (dev mode), runtime-error-modal

### Data Storage

**User Schema**: PostgreSQL with Drizzle ORM
- Users table with id (UUID), username (unique), password
- Drizzle schema defined in `shared/schema.ts`
- Migration output directory: `./migrations`

**In-Memory Storage**: MemStorage class implementing IStorage interface for development/testing
- User CRUD operations without database dependency
- Uses Map-based storage with UUID generation

**Database Configuration**:
- Neon serverless PostgreSQL (@neondatabase/serverless)
- Environment variable: `DATABASE_URL`
- Drizzle Kit for schema management and migrations

### External Dependencies

**AI Service**:
- Anthropic Claude API (claude-sonnet-4-5 model)
- Environment variables: `AI_INTEGRATIONS_ANTHROPIC_API_KEY`, `AI_INTEGRATIONS_ANTHROPIC_BASE_URL`
- Mission generation with JSON-formatted responses
- Calibrated to user settings (intensity 0-100, social 0-100, absurdity/weirdness 0-100)

**Third-Party Services**:
- Replit-specific integrations for deployment domain detection
- OpenGraph image serving from `/public/opengraph.{png|jpg|jpeg}`

**Key Libraries**:
- Three.js (@types/three) for 3D type definitions
- @tanstack/react-query for data fetching and caching
- Zod for runtime schema validation (drizzle-zod integration)
- Lucide React for icon components

**Session Management**: 
- Express-session with connect-pg-simple for PostgreSQL session store
- Memory store (memorystore) available as fallback

**Deployment**:
- Production build outputs to `dist/` directory
- Client assets to `dist/public`
- Server bundle to `dist/index.cjs` (CommonJS for Node.js execution)
- Environment detection via `NODE_ENV` and `REPL_ID`