# HelpConnect - Helper Application

A comprehensive helper application that connects people who need help with those who can provide assistance.

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

## Troubleshooting

If styles are not appearing:

1. Make sure all dependencies are installed:
   ```bash
   npm install
   ```

2. Clear your browser cache and restart the dev server:
   ```bash
   npm run dev
   ```

3. Check that the CSS is being imported in `main.tsx`:
   ```typescript
   import './styles/globals.css'
   ```

4. Verify that Tailwind CSS v4 is properly configured in `vite.config.ts`

## Features

- **Role-based Authentication**: Users can sign up as helpers or needers
- **Helper Dashboard**: Browse requests, accept tasks, track earnings
- **Needer Dashboard**: Create requests, track status, communicate with helpers
- **Real-time Updates**: Track request status and helper responses
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- React 18 with TypeScript
- Tailwind CSS v4
- Shadcn/ui components
- Radix UI primitives
- Lucide React icons
- Vite build tool