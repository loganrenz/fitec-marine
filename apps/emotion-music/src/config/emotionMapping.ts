import type { EmotionMusicMapping, EmotionType } from '@/types';

export const emotionMusicMap: Record<EmotionType, EmotionMusicMapping> = {
  happy: {
    vibe: 'Upbeat & Energetic',
    icon: '😊',
    searchQuery: 'upbeat energetic pop playlist',
    fallbackSongs: [
      { title: 'Happy', artist: 'Pharrell Williams', icon: '🎉' },
      { title: 'Walking on Sunshine', artist: 'Katrina and the Waves', icon: '☀️' },
      { title: "Don't Stop Me Now", artist: 'Queen', icon: '⚡' },
      { title: 'Good as Hell', artist: 'Lizzo', icon: '💫' },
      { title: "Can't Stop the Feeling", artist: 'Justin Timberlake', icon: '🎵' }
    ]
  },
  sad: {
    vibe: 'Calm & Reflective',
    icon: '😢',
    searchQuery: 'calm reflective melancholy playlist',
    fallbackSongs: [
      { title: 'Someone Like You', artist: 'Adele', icon: '🌧️' },
      { title: 'The Night We Met', artist: 'Lord Huron', icon: '🌙' },
      { title: 'Hurt', artist: 'Johnny Cash', icon: '💔' },
      { title: 'Mad World', artist: 'Gary Jules', icon: '🌊' },
      { title: 'Skinny Love', artist: 'Bon Iver', icon: '🍂' }
    ]
  },
  angry: {
    vibe: 'Intense & Powerful',
    icon: '😠',
    searchQuery: 'intense powerful rock metal playlist',
    fallbackSongs: [
      { title: 'Break Stuff', artist: 'Limp Bizkit', icon: '🔥' },
      { title: 'Killing in the Name', artist: 'Rage Against the Machine', icon: '⚡' },
      { title: 'Bodies', artist: 'Drowning Pool', icon: '💥' },
      { title: 'Last Resort', artist: 'Papa Roach', icon: '🎸' },
      { title: 'Chop Suey!', artist: 'System of a Down', icon: '🤘' }
    ]
  },
  surprised: {
    vibe: 'Unexpected & Fun',
    icon: '😲',
    searchQuery: 'fun upbeat surprising pop playlist',
    fallbackSongs: [
      { title: 'Uptown Funk', artist: 'Mark Ronson ft. Bruno Mars', icon: '🎺' },
      { title: 'September', artist: 'Earth, Wind & Fire', icon: '🎉' },
      { title: 'Mr. Blue Sky', artist: 'Electric Light Orchestra', icon: '☀️' },
      { title: 'Dynamite', artist: 'BTS', icon: '💥' },
      { title: 'Levitating', artist: 'Dua Lipa', icon: '✨' }
    ]
  },
  fearful: {
    vibe: 'Soothing & Comforting',
    icon: '😨',
    searchQuery: 'soothing comforting chill ambient playlist',
    fallbackSongs: [
      { title: 'Weightless', artist: 'Marconi Union', icon: '🌊' },
      { title: 'Breathe Me', artist: 'Sia', icon: '🌙' },
      { title: 'Fix You', artist: 'Coldplay', icon: '⭐' },
      { title: 'Safe & Sound', artist: 'Capital Cities', icon: '🏡' },
      { title: 'The A Team', artist: 'Ed Sheeran', icon: '🎵' }
    ]
  },
  disgusted: {
    vibe: 'Alternative & Edgy',
    icon: '🤢',
    searchQuery: 'alternative edgy grunge rock playlist',
    fallbackSongs: [
      { title: 'Smells Like Teen Spirit', artist: 'Nirvana', icon: '🎸' },
      { title: 'Bitter Sweet Symphony', artist: 'The Verve', icon: '🎻' },
      { title: 'Creep', artist: 'Radiohead', icon: '🌑' },
      { title: 'Seven Nation Army', artist: 'The White Stripes', icon: '⚡' },
      { title: 'Boulevard of Broken Dreams', artist: 'Green Day', icon: '🛣️' }
    ]
  },
  neutral: {
    vibe: 'Chill & Easy Listening',
    icon: '😐',
    searchQuery: 'chill easy listening indie playlist',
    fallbackSongs: [
      { title: 'Riptide', artist: 'Vance Joy', icon: '🌊' },
      { title: 'Budapest', artist: 'George Ezra', icon: '🎵' },
      { title: 'Ho Hey', artist: 'The Lumineers', icon: '🎸' },
      { title: 'Some Nights', artist: 'fun.', icon: '🌙' },
      { title: 'The Middle', artist: 'Zedd, Maren Morris & Grey', icon: '✨' }
    ]
  },
  contempt: {
    vibe: 'Dark & Brooding',
    icon: '😒',
    searchQuery: 'dark alternative indie moody playlist',
    fallbackSongs: [
      { title: 'Hurt', artist: 'Nine Inch Nails', icon: '🖤' },
      { title: 'Black', artist: 'Pearl Jam', icon: '🌑' },
      { title: 'Fake Plastic Trees', artist: 'Radiohead', icon: '🥀' },
      { title: 'Where Is My Mind?', artist: 'Pixies', icon: '🌊' },
      { title: 'Karma Police', artist: 'Radiohead', icon: '🚔' }
    ]
  }
};
