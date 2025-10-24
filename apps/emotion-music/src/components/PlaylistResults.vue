<script setup lang="ts">
import { computed } from 'vue';
import { useMusicStore } from '@/stores/musicStore';
import { useMusicKit } from '@/composables/useMusicKit';
import type { EmotionMusicMapping, Song } from '@/types';

interface Props {
  emotionData: EmotionMusicMapping;
}

defineProps<Props>();

const musicStore = useMusicStore();
const musicKit = useMusicKit();

const hasPlaylists = computed(() => musicStore.playlists.length > 0);

async function playPlaylist(playlistId: string) {
  if (!musicStore.isAuthorized) {
    alert('Please authorize Apple Music to play playlists.');
    return;
  }

  const success = await musicKit.playPlaylist(playlistId);
  if (!success) {
    alert(musicKit.error.value || 'Failed to play playlist. Please ensure you have an active Apple Music subscription.');
  }
}

function getArtworkUrl(url: string | undefined, size = 200): string {
  if (!url) return '';
  return url.replace('{w}', size.toString()).replace('{h}', size.toString());
}

function searchSong(song: Song) {
  const searchTerm = encodeURIComponent(`${song.title} ${song.artist}`);
  window.open(`https://music.apple.com/search?term=${searchTerm}`, '_blank');
}
</script>

<template>
  <div>
    <!-- Apple Music Playlists (if authorized and found) -->
    <div v-if="hasPlaylists && musicStore.isAuthorized" class="space-y-4">
      <div
        v-for="playlist in musicStore.playlists"
        :key="playlist.id"
        class="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
      >
        <div class="flex items-center gap-4">
          <!-- Artwork -->
          <img
            v-if="playlist.attributes.artwork"
            :src="getArtworkUrl(playlist.attributes.artwork.url, 80)"
            :alt="playlist.attributes.name"
            class="w-20 h-20 rounded-lg object-cover"
          />
          
          <!-- Info -->
          <div class="flex-1 min-w-0">
            <h4 class="font-semibold text-gray-800 truncate">
              {{ playlist.attributes.name }}
            </h4>
            <p v-if="playlist.attributes.curatorName" class="text-sm text-gray-500 truncate">
              {{ playlist.attributes.curatorName }}
            </p>
          </div>

          <!-- Play Button -->
          <button
            class="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white font-medium rounded-lg transition-colors flex-shrink-0"
            @click="playPlaylist(playlist.id)"
            :aria-label="`Play ${playlist.attributes.name}`"
          >
            ▶️ Play
          </button>
        </div>
      </div>

      <!-- Currently Playing Toast -->
      <div
        v-if="musicStore.currentPlaylist && musicStore.isPlaying"
        class="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-xl"
        role="status"
      >
        <p class="text-sm font-medium">
          🎵 Now Playing: {{ musicStore.currentPlaylist.attributes.name }}
        </p>
      </div>
    </div>

    <!-- Fallback Songs (if not authorized or no results) -->
    <div v-else class="space-y-3">
      <p class="text-sm text-gray-600 italic mb-3">
        {{ musicStore.isAuthorized 
          ? 'No playlists found. Here are some recommended songs:' 
          : 'Authorize Apple Music for personalized playback, or search these on Apple Music:' 
        }}
      </p>

      <div
        v-for="song in emotionData.fallbackSongs"
        :key="song.title"
        class="bg-white rounded-xl p-3 shadow-sm hover:shadow-md transition-shadow"
      >
        <div class="flex items-center gap-3">
          <!-- Icon -->
          <div class="text-2xl flex-shrink-0" role="img" :aria-label="song.icon">
            {{ song.icon }}
          </div>

          <!-- Info -->
          <div class="flex-1 min-w-0">
            <h4 class="font-semibold text-gray-800 text-sm truncate">
              {{ song.title }}
            </h4>
            <p class="text-xs text-gray-500 truncate">
              {{ song.artist }}
            </p>
          </div>

          <!-- Search Button -->
          <button
            class="px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors flex-shrink-0"
            @click="searchSong(song)"
            :aria-label="`Search for ${song.title} by ${song.artist}`"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Component-specific styles */
</style>
