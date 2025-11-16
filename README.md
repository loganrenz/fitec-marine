# Randos


A monorepo collection of self-contained, single-page web applications for random fun activities, unified under a Vue 3 shell application.

## 🎯 Overview

This repository hosts a collection of lightweight, interactive web apps. All apps are served through a Vue 3 shell application that provides a unified interface and navigation.

## 📁 Structure

```
/
├── vercel.json              # Vercel deployment configuration
├── apps/
│   ├── shell/               # Vue 3 shell application (main entry point)
│   │   ├── src/
│   │   │   ├── components/  # IframeWrapper and other components
│   │   │   ├── views/       # Home and RandoPage views
│   │   │   ├── router/      # Vue Router configuration
│   │   │   └── ...
│   │   ├── public/
│   │   │   ├── apps/        # Auto-generated - apps copied here during build (gitignored)
│   │   │   └── vite.svg
│   │   ├── scripts/
│   │   │   └── copy-apps.js # Build script to copy apps from /apps/
│   │   └── package.json
│   ├── dice-roller/         # Original dice rolling app
│   ├── coin-flip/           # Original coin flipping app
│   ├── emotion-music/       # Original emotion-based music recommender (Vue app)
│   └── fitec/               # FITEC gag site (whale suppositories)
└── index.html               # Legacy homepage (for reference)
```

## 🎲 Available Apps

### Dice Roller
Roll a six-sided die and see what you get! Features an animated rolling effect.
- **Location:** `/apps/dice-roller/`
- **Tech:** HTML, CSS, JavaScript

### Coin Flip
Flip a coin and see if it lands on heads or tails!
- **Location:** `/apps/coin-flip/`
- **Tech:** HTML, CSS, JavaScript

### Emotion Music
An AI-powered music recommender that analyzes your facial expression and suggests the perfect playlist!
- **Location:** `/apps/emotion-music/`
- **Tech:** HTML, JavaScript, TensorFlow.js, face-api.js
- **Features:**
  - Face detection and emotion recognition using AI
  - Webcam capture or file upload
  - Privacy-focused: all processing happens locally in your browser
  - Music recommendations based on detected emotions (happy, sad, angry, etc.)

### FITEC
A professional-looking gag site for a fictional company selling whale suppositories!
- **Location:** `/apps/fitec/`
- **Tech:** HTML, CSS (static site)
- **Features:**
  - Professional corporate design that looks like a real marine veterinary company
  - Hilarious whale suppository product marketing
  - Customer review from "Captain Tracy" sailing the Salty Dawg Rally
  - Complete with OG images and proper meta tags for social sharing

## 🚀 Deployment

This repository is deployed on Vercel. The `vercel.json` configuration builds the Vue shell app (`apps/shell`) and serves it as the main application.

**Live Site:** https://randos-kappa.vercel.app/

### Page Titles

The shell application automatically sets appropriate page titles:
- Home page: "Randos - Random Fun Web Apps"
- Individual apps: "{App Name} - Randos" (e.g., "Dice Roller - Randos")
- FITEC: "FITEC - Premium Whale Suppositories"

Titles are managed via Vue Router and component lifecycle hooks for a seamless user experience.

All apps are accessible at:
- https://randos-kappa.vercel.app/ - Home page listing all apps
- https://randos-kappa.vercel.app/r/dice-roller - Dice roller in the shell
- https://randos-kappa.vercel.app/r/coin-flip - Coin flip in the shell
- https://randos-kappa.vercel.app/r/emotion-music - Emotion music in the shell
- https://randos-kappa.vercel.app/r/fitec - FITEC gag site in the shell

Or directly at:
- https://randos-kappa.vercel.app/apps/dice-roller/index.html
- https://randos-kappa.vercel.app/apps/coin-flip/index.html
- https://randos-kappa.vercel.app/apps/emotion-music/index.html
- https://randos-kappa.vercel.app/apps/fitec/index.html

## 💻 Local Development

### Single Source of Truth
**Important:** All apps have a single source in `/apps/{app-name}/`. The shell's build process automatically copies apps to `apps/shell/public/apps/` - you should NEVER manually edit files in `public/apps/` as they are auto-generated and gitignored.

### Shell Application
```bash
cd apps/shell
npm install
npm run dev    # Copies apps and starts dev server
npm run build  # Copies apps and builds for production
```

The `copy-apps` script runs automatically before dev/build and:
- Copies simple static apps directly from `/apps/`
- Copies Vue apps from their `/apps/{name}/dist/` directories

### Individual Apps
The original apps in `/apps/` are preserved in their source directories:
- `/apps/dice-roller` and `/apps/coin-flip` - Simple HTML/CSS/JS apps that can be opened directly in a browser
- `/apps/emotion-music` - A Vue 3 application that requires building:

```bash
cd apps/emotion-music
npm install
npm run build  # Build output goes to dist/
```

**Note:** The shell app automatically copies apps from `/apps/` to `public/apps/` during the build process. The `copy-apps` script runs automatically as a prebuild step. You never need to manually copy apps - just edit the source in `/apps/` and rebuild.

## 🎨 Adding New Apps

To add a new app:

### Option 1: Simple Static App (Quick)
1. Create a new directory under `/apps/` with your app name
2. Add your `index.html` and any necessary JavaScript/CSS files
3. Copy your app to `apps/shell/public/apps/<your-app-name>/`
   - If your app has absolute paths (like `/assets/...`), update them to relative paths (like `./assets/...`)
4. Add an entry in `apps/shell/src/views/Home.vue` to list your app
5. Rebuild the shell app with `npm run build`

### Option 2: Vue Component (Recommended for new apps)
1. Create a new Vue component in `apps/shell/src/components/`
2. Add a route in `apps/shell/src/router/index.ts`
3. Update the home page to link to your new app

The shell provides an `IframeWrapper` component for quickly integrating existing static apps without refactoring.
