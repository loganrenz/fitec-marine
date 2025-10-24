<script setup lang="ts">
import { onMounted } from 'vue';
import { useEmotionDetection } from './composables/useEmotionDetection';
import { useMusicKit } from './composables/useMusicKit';

const emotionDetection = useEmotionDetection();
const musicKit = useMusicKit();

onMounted(async () => {
  // Initialize ML models and MusicKit in parallel
  await Promise.all([
    emotionDetection.initialize(),
    musicKit.initialize()
  ]);
});
</script>

<template>
  <div id="app" class="min-h-screen flex items-center justify-center p-4">
    <RouterView />
  </div>
</template>

<style scoped>
/* App-specific styles if needed */
</style>
