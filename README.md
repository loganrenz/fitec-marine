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
│   │   │   └── apps/        # Static apps copied here during build
│   │   │       ├── dice-roller/
│   │   │       ├── coin-flip/
│   │   │       └── emotion-music/
│   │   └── package.json
│   ├── dice-roller/         # Original dice rolling app
│   ├── coin-flip/           # Original coin flipping app
│   └── emotion-music/       # Original emotion-based music recommender (Vue app)
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

## 🚀 Deployment

This repository is deployed on Vercel. The `vercel.json` configuration builds the Vue shell app (`apps/shell`) and serves it as the main application.

**Live Site:** https://randos-kappa.vercel.app/

All apps are accessible at:
- https://randos-kappa.vercel.app/ - Home page listing all apps
- https://randos-kappa.vercel.app/r/dice-roller - Dice roller in the shell
- https://randos-kappa.vercel.app/r/coin-flip - Coin flip in the shell
- https://randos-kappa.vercel.app/r/emotion-music - Emotion music in the shell

Or directly at:
- https://randos-kappa.vercel.app/apps/dice-roller/index.html
- https://randos-kappa.vercel.app/apps/coin-flip/index.html
- https://randos-kappa.vercel.app/apps/emotion-music/index.html

## 💻 Local Development

### Shell Application
```bash
cd apps/shell
npm install
npm run dev    # Start development server
npm run build  # Build for production
```

### Individual Apps
The original apps in `/apps/` are preserved in their source directories:
- `/apps/dice-roller` and `/apps/coin-flip` - Simple HTML/CSS/JS apps that can be opened directly in a browser
- `/apps/emotion-music` - A Vue 3 application that requires building:

```bash
cd apps/emotion-music
npm install
npm run build  # Build output goes to dist/
```

**Note:** The shell app automatically includes pre-built versions of all apps in its `public/apps/` directory. During development, if you make changes to an original app, you'll need to manually copy it to the shell's public directory and rebuild.

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
