import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { AppleMusicPlaylist, EmotionType } from '@/types';

export const useMusicStore = defineStore('music', () => {
  // State
  const isAuthorized = ref(false);
  const playlists = ref<AppleMusicPlaylist[]>([]);
  const currentPlaylist = ref<AppleMusicPlaylist | null>(null);
  const isPlaying = ref(false);
  const isSearching = ref(false);
  const searchError = ref<string | null>(null);
  const currentEmotion = ref<EmotionType | null>(null);

  // Getters
  const hasPlaylists = computed(() => playlists.value.length > 0);
  const playlistCount = computed(() => playlists.value.length);

  // Actions
  function setAuthorized(value: boolean) {
    isAuthorized.value = value;
  }

  function setPlaylists(data: AppleMusicPlaylist[]) {
    playlists.value = data;
  }

  function addPlaylist(playlist: AppleMusicPlaylist) {
    playlists.value.push(playlist);
  }

  function setCurrentPlaylist(playlist: AppleMusicPlaylist | null) {
    currentPlaylist.value = playlist;
  }

  function setPlaying(value: boolean) {
    isPlaying.value = value;
  }

  function setSearching(value: boolean) {
    isSearching.value = value;
  }

  function setSearchError(message: string | null) {
    searchError.value = message;
  }

  function setCurrentEmotion(emotion: EmotionType | null) {
    currentEmotion.value = emotion;
  }

  function clearPlaylists() {
    playlists.value = [];
    currentPlaylist.value = null;
  }

  function reset() {
    playlists.value = [];
    currentPlaylist.value = null;
    isPlaying.value = false;
    isSearching.value = false;
    searchError.value = null;
    currentEmotion.value = null;
  }

  return {
    // State
    isAuthorized,
    playlists,
    currentPlaylist,
    isPlaying,
    isSearching,
    searchError,
    currentEmotion,
    // Getters
    hasPlaylists,
    playlistCount,
    // Actions
    setAuthorized,
    setPlaylists,
    addPlaylist,
    setCurrentPlaylist,
    setPlaying,
    setSearching,
    setSearchError,
    setCurrentEmotion,
    clearPlaylists,
    reset,
  };
});
