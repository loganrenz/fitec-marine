import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { EmotionResult } from '@/types';

export const useEmotionStore = defineStore('emotion', () => {
  // State
  const currentEmotion = ref<EmotionResult | null>(null);
  const history = ref<EmotionResult[]>([]);
  const isDetecting = ref(false);
  const modelsLoaded = ref(false);
  const error = ref<string | null>(null);

  // Getters
  const hasEmotion = computed(() => currentEmotion.value !== null);
  const emotionLabel = computed(() => 
    currentEmotion.value?.emotion 
      ? currentEmotion.value.emotion.charAt(0).toUpperCase() + currentEmotion.value.emotion.slice(1)
      : null
  );
  const confidencePercent = computed(() => 
    currentEmotion.value ? Math.round(currentEmotion.value.confidence * 100) : 0
  );

  // Actions
  function setEmotion(emotion: EmotionResult) {
    currentEmotion.value = emotion;
    history.value.push(emotion);
    // Keep only last 10 detections
    if (history.value.length > 10) {
      history.value.shift();
    }
  }

  function clearEmotion() {
    currentEmotion.value = null;
  }

  function setDetecting(value: boolean) {
    isDetecting.value = value;
  }

  function setModelsLoaded(value: boolean) {
    modelsLoaded.value = value;
  }

  function setError(message: string | null) {
    error.value = message;
  }

  function clearHistory() {
    history.value = [];
  }

  function reset() {
    currentEmotion.value = null;
    history.value = [];
    isDetecting.value = false;
    error.value = null;
  }

  return {
    // State
    currentEmotion,
    history,
    isDetecting,
    modelsLoaded,
    error,
    // Getters
    hasEmotion,
    emotionLabel,
    confidencePercent,
    // Actions
    setEmotion,
    clearEmotion,
    setDetecting,
    setModelsLoaded,
    setError,
    clearHistory,
    reset,
  };
});
