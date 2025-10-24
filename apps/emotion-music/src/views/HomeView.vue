<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { useEmotionStore } from '@/stores/emotionStore';
import { useMusicStore } from '@/stores/musicStore';
import { useEmotionDetection } from '@/composables/useEmotionDetection';
import { useMusicKit } from '@/composables/useMusicKit';
import EmotionCapture from '@/components/EmotionCapture.vue';

const router = useRouter();
const emotionStore = useEmotionStore();
const musicStore = useMusicStore();
const emotionDetection = useEmotionDetection();
const musicKit = useMusicKit();

const showCaptureModal = ref(false);
const statusMessage = ref('Initializing AI models...');
const statusType = ref<'info' | 'success' | 'error' | 'warning'>('info');
const showAuthSection = ref(false);

// Allow the app to work even if MusicKit fails to load
const isReady = computed(() => emotionStore.modelsLoaded);

onMounted(async () => {
  // Check if models are already loaded
  if (!emotionStore.modelsLoaded) {
    statusMessage.value = 'Loading AI models... This may take a moment.';
    const emotionReady = await emotionDetection.initialize();
    
    if (!emotionReady) {
      statusMessage.value = 'Error loading AI models. Please refresh the page.';
      statusType.value = 'error';
      return;
    }
  }

  // Initialize MusicKit
  if (!musicKit.isReady.value) {
    const musicReady = await musicKit.initialize();
    if (musicReady) {
      showAuthSection.value = true;
    }
  } else {
    showAuthSection.value = true;
  }

  statusMessage.value = 'Ready! Click the button to get started.';
  statusType.value = 'success';
});

onUnmounted(() => {
  emotionDetection.cleanup();
});

function openCaptureModal() {
  showCaptureModal.value = true;
}

function closeCaptureModal() {
  showCaptureModal.value = false;
}

async function handleEmotionDetected() {
  closeCaptureModal();
  // Navigate to results page
  await router.push({ name: 'results' });
}

async function handleAuthorize() {
  const success = await musicKit.authorize();
  if (success) {
    statusMessage.value = 'Apple Music authorized successfully!';
    statusType.value = 'success';
  } else {
    statusMessage.value = musicKit.error.value || 'Authorization failed';
    statusType.value = 'error';
  }
}

async function handleUnauthorize() {
  await musicKit.unauthorize();
  statusMessage.value = 'Apple Music disconnected';
  statusType.value = 'info';
}
</script>

<template>
  <div class="container-card">
    <header class="text-center mb-6">
      <h1 class="text-4xl font-bold text-gray-800 mb-2">
        🎵 Emotion Music
      </h1>
      <p class="text-gray-600 text-sm">
        Let your face choose the perfect playlist
      </p>
    </header>

    <!-- Status Message -->
    <div :class="`status-${statusType}`" role="status" aria-live="polite">
      {{ statusMessage }}
    </div>

    <!-- Main Action Button -->
    <button
      class="btn-primary mb-4"
      :disabled="!isReady"
      @click="openCaptureModal"
      aria-label="Select image to analyze emotion"
    >
      Select Image
    </button>

    <!-- Auth Section -->
    <div v-if="showAuthSection" class="mb-4">
      <button
        v-if="!musicStore.isAuthorized"
        class="btn-secondary w-full"
        @click="handleAuthorize"
        aria-label="Authorize Apple Music"
      >
        Authorize Apple Music
      </button>
      <button
        v-else
        class="btn-secondary w-full"
        @click="handleUnauthorize"
        aria-label="Unauthorize Apple Music"
      >
        Unauthorize Apple Music
      </button>
      <p class="text-xs text-gray-500 text-center mt-2">
        Connect to play songs directly
      </p>
    </div>

    <!-- Back Link -->
    <a
      href="../../index.html"
      class="block text-center mt-8 text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
    >
      ← Back to Home
    </a>

    <!-- Capture Modal -->
    <Teleport to="body">
      <EmotionCapture
        v-if="showCaptureModal"
        @close="closeCaptureModal"
        @emotion-detected="handleEmotionDetected"
      />
    </Teleport>
  </div>
</template>

<style scoped>
/* Component-specific styles if needed */
</style>
