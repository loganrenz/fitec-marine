// Emotion detection types
export type EmotionType = 
  | 'happy' 
  | 'sad' 
  | 'angry' 
  | 'surprised' 
  | 'fearful' 
  | 'disgusted' 
  | 'neutral'
  | 'contempt';

export interface EmotionResult {
  emotion: EmotionType;
  confidence: number;
  expressions: Record<string, number>;
  timestamp: number;
}

export interface EmotionMusicMapping {
  vibe: string;
  icon: string;
  searchQuery: string;
  fallbackSongs: Song[];
}

export interface Song {
  title: string;
  artist: string;
  icon: string;
}

// Apple MusicKit types
export interface AppleMusicPlaylist {
  id: string;
  type: 'playlists';
  href: string;
  attributes: {
    name: string;
    description?: {
      standard?: string;
    };
    artwork?: {
      url: string;
      width?: number;
      height?: number;
      bgColor?: string;
      textColor1?: string;
    };
    curatorName?: string;
    playParams?: {
      id: string;
      kind: string;
    };
  };
}

export interface AppleMusicSearchResponse {
  results: {
    playlists?: {
      data: AppleMusicPlaylist[];
      href: string;
      next?: string;
    };
  };
}

export interface MusicKitConfig {
  developerToken: string;
  app: {
    name: string;
    build: string;
  };
}

// Component state types
export interface LoadingState {
  isLoading: boolean;
  message: string;
  progress?: number;
}

export interface ErrorState {
  hasError: boolean;
  message: string;
  code?: string;
}

// Camera/capture types
export type InputSource = 'camera' | 'file';

export interface CaptureOptions {
  source: InputSource;
  autoCapture?: boolean;
  captureDelay?: number;
}
