<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useEmotionStore } from '@/stores/emotionStore';
import { useMusicStore } from '@/stores/musicStore';
import { useMusicKit } from '@/composables/useMusicKit';
import { emotionMusicMap } from '@/config/emotionMapping';
import PlaylistResults from '@/components/PlaylistResults.vue';

const router = useRouter();
const emotionStore = useEmotionStore();
const musicStore = useMusicStore();
const musicKit = useMusicKit();

const isSearching = ref(false);
const searchComplete = ref(false);

const emotion = computed(() => emotionStore.currentEmotion);
const emotionData = computed(() => 
  emotion.value ? emotionMusicMap[emotion.value.emotion] : null
);
const confidencePercent = computed(() => emotionStore.confidencePercent);

onMounted(async () => {
  // Redirect if no emotion detected
  if (!emotion.value) {
    router.push({ name: 'home' });
    return;
  }

  // Search for playlists if MusicKit is ready, otherwise just show fallback songs
  if (emotionData.value) {
    if (musicKit.isReady.value) {
      await searchPlaylists();
    } else {
      // Mark as complete to show fallback songs
      searchComplete.value = true;
    }
  }
});

async function searchPlaylists() {
  if (!emotionData.value) return;

  isSearching.value = true;
  try {
    const playlists = await musicKit.searchPlaylists(emotionData.value.searchQuery, 5);
    
    if (playlists.length > 0 && musicStore.isAuthorized) {
      // Auto-play random playlist
      const success = await musicKit.playRandomPlaylist(playlists);
      if (success && musicStore.currentPlaylist) {
        // Show toast notification
        console.log(`Playing ${musicStore.currentPlaylist.attributes.name}!`);
      }
    }
  } catch (error) {
    console.error('Search error:', error);
  } finally {
    isSearching.value = false;
    searchComplete.value = true;
  }
}

function goBack() {
  emotionStore.clearEmotion();
  musicStore.clearPlaylists();
  router.push({ name: 'home' });
}
</script>

<template>
  <div class="container-card">
    <!-- Emotion Display -->
    <div v-if="emotion && emotionData" class="mb-8">
      <div class="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl p-8 text-center">
        <div class="text-7xl mb-4" role="img" :aria-label="`${emotion.emotion} emotion`">
          {{ emotionData.icon }}
        </div>
        <h2 class="text-3xl font-bold mb-2">{{ emotionStore.emotionLabel }}</h2>
        <p class="text-lg opacity-90">{{ confidencePercent }}% confidence</p>
      </div>
    </div>

    <!-- Recommendations Section -->
    <div v-if="emotionData" class="bg-gray-50 rounded-2xl p-6">
      <h3 class="text-xl font-bold text-gray-800 mb-4">
        🎧 Your {{ emotionData.vibe }} Playlist
      </h3>

      <!-- Loading State -->
      <div v-if="isSearching" class="text-center py-8">
        <div class="animate-spin rounded-full h-12 w-12 border-b-4 border-indigo-500 mx-auto mb-4"></div>
        <p class="text-gray-600">Searching for the perfect music...</p>
      </div>

      <!-- Results -->
      <div v-else-if="searchComplete">
        <PlaylistResults :emotion-data="emotionData" />
      </div>
    </div>

    <!-- Back Button -->
    <button
      class="w-full mt-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-xl transition-colors"
      @click="goBack"
      aria-label="Try again"
    >
      ← Try Again
    </button>
  </div>
</template>

<style scoped>
/* Component-specific styles */
</style>
