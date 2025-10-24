# Randos

A monorepo collection of self-contained, single-page web applications for random fun activities.

## 🎯 Overview

This repository hosts a collection of lightweight, interactive web apps. Each app is completely self-contained and can run independently without any build process or dependencies.

## 📁 Structure

```
/
├── index.html          # Homepage with links to all apps
├── apps/
│   ├── dice-roller/    # Dice rolling app
│   │   ├── index.html
│   │   └── script.js
│   ├── coin-flip/      # Coin flipping app
│   │   ├── index.html
│   │   └── script.js
│   └── emotion-music/  # Emotion-based music recommender
│       └── index.html
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

This repository is designed to be deployed on Vercel or any static hosting platform. Simply point your deployment to the root directory, and all apps will be accessible.

## 💻 Local Development

No build process required! Simply open `index.html` in your browser to get started, or open individual app `index.html` files directly.

## 🎨 Adding New Apps

To add a new app:
1. Create a new directory under `/apps/`
2. Add your `index.html` and any necessary JavaScript/CSS files
3. Update the root `index.html` to link to your new app
4. Keep apps self-contained and lightweight
