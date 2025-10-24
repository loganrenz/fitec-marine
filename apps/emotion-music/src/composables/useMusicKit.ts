import { ref, computed } from 'vue';
import { useStorage } from '@vueuse/core';
import type { AppleMusicPlaylist } from '@/types';
import { useMusicStore } from '@/stores/musicStore';

// Extend Window type for MusicKit
declare global {
  interface Window {
    MusicKit: any;
  }
}

export function useMusicKit() {
  const musicStore = useMusicStore();
  const musicKit = ref<any>(null);
  const isReady = ref(false);
  const error = ref<string | null>(null);
  const storefront = ref('us');
  
  // Get developer token from environment or use the provided one
  const developerToken = import.meta.env.VITE_MUSICKIT_DEVELOPER_TOKEN || 
    'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ijg5Nzg2NFE5WTQifQ.eyJpc3MiOiJGVlNZN0NGQzNTIiwiaWF0IjoxNzYxMjgyNDM2LCJleHAiOjE3NzY4MzQ0MzZ9.-Dl1DK9Ce39KY07ts_ZLBuGb8TLJd1M_AfCYNQsIGoIUuDcJdqlZMe9HxOOvkbWPhi5BIGWdZHvXmacelrjsvg';

  // Store auth state in localStorage
  const authState = useStorage('musickit-auth', { isAuthorized: false });

  const isAuthorized = computed(() => musicStore.isAuthorized);

  // Initialize MusicKit
  async function initialize(): Promise<boolean> {
    if (!developerToken || developerToken === 'YOUR_DEVELOPER_TOKEN_HERE') {
      error.value = 'MusicKit developer token not configured';
      console.warn('MusicKit developer token not set');
      return false;
    }

    try {
      // Wait for MusicKit to load
      await waitForMusicKit();

      if (!window.MusicKit) {
        throw new Error('MusicKit failed to load');
      }

      // Configure MusicKit
      await window.MusicKit.configure({
        developerToken,
        app: {
          name: 'Emotion Music Recommender',
          build: '1.0.0'
        }
      });

      musicKit.value = window.MusicKit.getInstance();
      isReady.value = true;

      // Check if already authorized
      if (musicKit.value.isAuthorized) {
        musicStore.setAuthorized(true);
        authState.value.isAuthorized = true;
      }

      // Listen to authorization changes
      musicKit.value.addEventListener('authorizationStatusDidChange', (event: any) => {
        const authorized = event.authorizationStatus === 3; // MusicKit.AuthorizationStatus.AUTHORIZED
        musicStore.setAuthorized(authorized);
        authState.value.isAuthorized = authorized;
      });

      console.log('MusicKit initialized successfully');
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to initialize MusicKit';
      error.value = message;
      console.error('MusicKit initialization error:', err);
      return false;
    }
  }

  // Wait for MusicKit to be available
  function waitForMusicKit(timeout = 10000): Promise<void> {
    return new Promise((resolve, reject) => {
      if (window.MusicKit) {
        resolve();
        return;
      }

      const startTime = Date.now();
      const checkInterval = setInterval(() => {
        if (window.MusicKit) {
          clearInterval(checkInterval);
          resolve();
        } else if (Date.now() - startTime > timeout) {
          clearInterval(checkInterval);
          reject(new Error('MusicKit load timeout'));
        }
      }, 100);
    });
  }

  // Authorize user
  async function authorize(): Promise<boolean> {
    if (!musicKit.value) {
      error.value = 'MusicKit not initialized';
      return false;
    }

    try {
      const token = await musicKit.value.authorize();
      musicStore.setAuthorized(!!token);
      authState.value.isAuthorized = !!token;
      return !!token;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Authorization failed';
      error.value = message;
      console.error('Authorization error:', err);
      return false;
    }
  }

  // Unauthorize user
  async function unauthorize(): Promise<void> {
    if (!musicKit.value) return;

    try {
      await musicKit.value.unauthorize();
      musicStore.setAuthorized(false);
      authState.value.isAuthorized = false;
    } catch (err) {
      console.error('Unauthorize error:', err);
    }
  }

  // Search for playlists
  async function searchPlaylists(query: string, limit = 5): Promise<AppleMusicPlaylist[]> {
    if (!musicKit.value || !isReady.value) {
      error.value = 'MusicKit not ready';
      return [];
    }

    try {
      musicStore.setSearching(true);
      musicStore.setSearchError(null);

      const response = await musicKit.value.api.music(`/v1/catalog/${storefront.value}/search`, {
        params: {
          term: query,
          types: 'playlists',
          limit: limit.toString()
        }
      });

      const playlists = response.playlists?.data || [];
      musicStore.setPlaylists(playlists);
      
      return playlists;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Search failed';
      error.value = message;
      musicStore.setSearchError(message);
      console.error('Search error:', err);
      return [];
    } finally {
      musicStore.setSearching(false);
    }
  }

  // Set queue and play playlist
  async function playPlaylist(playlistId: string): Promise<boolean> {
    if (!musicKit.value || !isAuthorized.value) {
      error.value = 'Please authorize Apple Music first';
      return false;
    }

    try {
      await musicKit.value.setQueue({ playlist: playlistId });
      await musicKit.value.play();
      musicStore.setPlaying(true);
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Playback failed';
      error.value = message;
      console.error('Playback error:', err);
      
      // Check if subscription error
      if (message.includes('subscription') || message.includes('ACCESS_NOT_ALLOWED')) {
        error.value = 'Apple Music subscription required';
      }
      
      return false;
    }
  }

  // Play random playlist from array
  async function playRandomPlaylist(playlists: AppleMusicPlaylist[]): Promise<boolean> {
    if (playlists.length === 0) {
      error.value = 'No playlists available';
      return false;
    }

    const randomIndex = Math.floor(Math.random() * playlists.length);
    const selectedPlaylist = playlists[randomIndex];
    
    if (!selectedPlaylist) {
      error.value = 'Invalid playlist selection';
      return false;
    }
    
    musicStore.setCurrentPlaylist(selectedPlaylist);
    return await playPlaylist(selectedPlaylist.id);
  }

  // Play/pause control
  async function togglePlayback(): Promise<void> {
    if (!musicKit.value) return;

    try {
      if (musicKit.value.isPlaying) {
        await musicKit.value.pause();
        musicStore.setPlaying(false);
      } else {
        await musicKit.value.play();
        musicStore.setPlaying(true);
      }
    } catch (err) {
      console.error('Toggle playback error:', err);
    }
  }

  // Skip to next track
  async function skipToNext(): Promise<void> {
    if (!musicKit.value) return;

    try {
      await musicKit.value.skipToNextItem();
    } catch (err) {
      console.error('Skip error:', err);
    }
  }

  // Skip to previous track
  async function skipToPrevious(): Promise<void> {
    if (!musicKit.value) return;

    try {
      await musicKit.value.skipToPreviousItem();
    } catch (err) {
      console.error('Skip error:', err);
    }
  }

  // Set volume (0-1)
  function setVolume(volume: number): void {
    if (!musicKit.value) return;
    musicKit.value.volume = Math.max(0, Math.min(1, volume));
  }

  return {
    musicKit,
    isReady,
    isAuthorized,
    error,
    storefront,
    initialize,
    authorize,
    unauthorize,
    searchPlaylists,
    playPlaylist,
    playRandomPlaylist,
    togglePlayback,
    skipToNext,
    skipToPrevious,
    setVolume
  };
}
