# 🎵 Emotion Music Recommender - Vue 3 SPA

An AI-powered music recommendation app that analyzes your facial expressions using MediaPipe and TensorFlow.js, then suggests personalized Apple Music playlists based on your detected emotion.

## ✨ Features

- **Advanced Emotion Detection**: Uses MediaPipe BlazeFace for face detection and facial landmark analysis
- **8 Emotion Types**: Detects happy, sad, angry, surprised, fearful, disgusted, neutral, and contempt
- **Apple MusicKit v3 Integration**: Full integration with Apple Music for playlist search and playback
- **Real-time Camera Capture**: Take photos with your webcam or upload images
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **TypeScript**: Strict type safety throughout the application
- **State Management**: Pinia stores for emotion and music state
- **Accessible**: ARIA labels and keyboard navigation support

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Apple Developer Account (for MusicKit developer token)
- Modern browser with WebGL support (Chrome, Safari, or Firefox)

### Installation

1. Clone the repository and navigate to the app directory:
```bash
cd apps/emotion-music
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file from the example:
```bash
cp .env.example .env
```

4. Add your Apple MusicKit developer token to `.env`:
```env
VITE_MUSICKIT_DEVELOPER_TOKEN=your_jwt_token_here
```

### Development

Run the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

Build the app:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## 🎹 Apple MusicKit Setup

To enable full Apple Music integration:

1. Join the [Apple Developer Program](https://developer.apple.com/programs/) ($99/year)
2. Create a MusicKit Identifier in [Certificates, Identifiers & Profiles](https://developer.apple.com/account/resources/identifiers/list)
3. Generate a private key (.p8) for MusicKit
4. Create a JWT developer token using the private key
   - See [Apple's guide](https://developer.apple.com/documentation/applemusicapi/generating_developer_tokens)
5. Add the token to your `.env` file

**Note**: The app will work without a token, but will only show static song recommendations with search links.

## 🏗️ Project Structure

```
src/
├── components/          # Vue components
│   ├── EmotionCapture.vue    # Camera/file input modal
│   └── PlaylistResults.vue   # Playlist display component
├── composables/         # Reusable logic
│   ├── useEmotionDetection.ts   # ML emotion detection
│   └── useMusicKit.ts           # Apple Music integration
├── config/              # Configuration files
│   └── emotionMapping.ts        # Emotion to music mappings
├── stores/              # Pinia state stores
│   ├── emotionStore.ts
│   └── musicStore.ts
├── types/               # TypeScript type definitions
│   └── index.ts
├── views/               # Page components
│   ├── HomeView.vue
│   └── ResultsView.vue
├── router/              # Vue Router configuration
│   └── index.ts
├── App.vue              # Root component
├── main.ts              # App entry point
└── style.css            # Global styles (Tailwind)
```

## 🧪 Testing

Run unit tests:
```bash
npm run test
```

## 📦 Technologies

- **Frontend Framework**: Vue 3.5+ with Composition API
- **Build Tool**: Vite 7+
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS 4+
- **State Management**: Pinia 3+
- **Routing**: Vue Router 4+
- **Utilities**: VueUse
- **ML Libraries**: 
  - MediaPipe Tasks Vision (face detection)
  - TensorFlow.js 4+ (emotion classification)
- **Music API**: Apple MusicKit v3

## 🌐 Browser Compatibility

- Chrome 90+
- Safari 14+
- Firefox 88+
- Edge 90+

Requires WebGL support for optimal ML performance. Falls back to CPU if WebGL is unavailable.

## 📱 Deployment

### Vercel

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

### Netlify

1. Build the app:
```bash
npm run build
```

2. Deploy the `dist` folder to Netlify

### Environment Variables

Make sure to set `VITE_MUSICKIT_DEVELOPER_TOKEN` in your deployment platform's environment variables.

## 🔒 Security & Privacy

- All emotion detection happens **locally in your browser** - no images are sent to external servers
- MusicKit tokens are stored securely in localStorage
- Camera access requires explicit user permission
- No personal data is collected or transmitted

## 🎨 Customization

### Adding New Emotions

Edit `src/config/emotionMapping.ts` to add or modify emotion-to-music mappings.

### Styling

The app uses Tailwind CSS. Customize the theme in `tailwind.config.js`.

## 📝 License

Part of the Randos monorepo. See main repository for license information.

## 🤝 Contributing

Contributions are welcome! Please ensure:
- Code passes TypeScript strict checks
- Components are accessible (ARIA labels, keyboard nav)
- Changes are tested in multiple browsers

## 📚 Resources

- [Vue 3 Documentation](https://vuejs.org/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Apple MusicKit Documentation](https://developer.apple.com/documentation/musickit/)
- [MediaPipe Tasks Vision](https://developers.google.com/mediapipe/solutions/vision/face_landmarker)
- [TensorFlow.js](https://www.tensorflow.org/js)
