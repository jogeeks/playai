# AI Serendipity Generator Machine

An immersive 3D web experience inspired by Burning Man's desert aesthetic, featuring three interactive AI-powered art installations.

## Overview

Step onto a digital Playa and interact with three sacred artifacts, each powered by Claude AI to create unique, personalized experiences aligned with Burning Man's 10 Principles.

## The Three Artifacts

### The Serendipity Dispenser
A golden obelisk that generates personalized missions. Tell it what you seek—adventure, connection, creativity, learning, or self-discovery—and receive a unique directive calibrated to your spirit. Features advanced settings to tune intensity, social factor, and weirdness levels.

### The Reflective Oracle
A reflective chrome cube that doesn't give answers—it asks questions. Share your thoughts and receive reflections that reveal what you already know but haven't yet admitted. Engage in a philosophical dialogue with an AI that mirrors your inner wisdom.

### The Temple of Transmutation
A sacred geometric lantern where you offer your burdens to the digital fire. The Temple transforms what weighs you down into wisdom and strength. Fear becomes curiosity. Anger becomes passion. Doubt becomes determination.

## Features

- **Immersive 3D Environment**: Explore a procedurally-generated desert landscape with React Three Fiber
- **AI-Powered Interactions**: Each artifact uses Claude AI to generate unique, personalized content
- **Tutorial Mode**: "First Time Here?" guided tour explains each artifact
- **About Page**: Learn the lore and history of the Playa Artifacts
- **Responsive Design**: Works on desktop and mobile devices
- **Accessibility**: Keyboard navigation, screen reader support, and ARIA labels

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **3D Graphics**: React Three Fiber, Three.js, @react-three/drei
- **Styling**: Tailwind CSS, Radix UI, Framer Motion
- **State Management**: Zustand
- **Backend**: Express.js
- **AI**: Anthropic Claude API
- **Database**: PostgreSQL with Drizzle ORM

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up your environment variables (see below)
4. Run the development server: `npm run dev`
5. Open your browser to `http://localhost:5000`

## Environment Variables

The application uses Replit AI Integrations for Claude API access. If running outside Replit, you'll need:

- `AI_INTEGRATIONS_ANTHROPIC_API_KEY` - Your Anthropic API key
- `AI_INTEGRATIONS_ANTHROPIC_BASE_URL` - Anthropic API base URL
- `DATABASE_URL` - PostgreSQL connection string (optional, for user persistence)

## The 10 Principles

This experience is inspired by Burning Man's 10 Principles:

1. **Radical Inclusion** - Everyone is welcome
2. **Gifting** - Unconditional giving
3. **Decommodification** - No commercial transactions
4. **Radical Self-reliance** - Discover your inner resources
5. **Radical Self-expression** - Express your unique gifts
6. **Communal Effort** - Creative cooperation
7. **Civic Responsibility** - Assume responsibility
8. **Leaving No Trace** - Clean up after yourself
9. **Participation** - Transformative change through participation
10. **Immediacy** - Overcome barriers to experience

## License

MIT

## Acknowledgments

- Inspired by the art and spirit of Burning Man
- Built with love on Replit
