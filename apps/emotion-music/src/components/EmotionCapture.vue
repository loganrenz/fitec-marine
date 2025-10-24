<script setup lang="ts">
import { ref, onUnmounted } from 'vue';
import { useEmotionDetection } from '@/composables/useEmotionDetection';

const emit = defineEmits<{
  close: [];
  'emotion-detected': [];
}>();

const emotionDetection = useEmotionDetection();

const showSourceModal = ref(true);
const showWebcam = ref(false);
const videoRef = ref<HTMLVideoElement | null>(null);
const canvasRef = ref<HTMLCanvasElement | null>(null);
const fileInputRef = ref<HTMLInputElement | null>(null);
const videoStream = ref<MediaStream | null>(null);
const isAnalyzing = ref(false);
const errorMessage = ref('');

async function startWebcam() {
  try {
    showSourceModal.value = false;
    errorMessage.value = '';
    
    videoStream.value = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'user', width: 1280, height: 720 },
      audio: false
    });

    if (videoRef.value) {
      videoRef.value.srcObject = videoStream.value;
      showWebcam.value = true;
    }
  } catch (error) {
    console.error('Webcam access error:', error);
    errorMessage.value = 'Unable to access camera. Please check permissions and try uploading an image instead.';
  }
}

function stopWebcam() {
  if (videoStream.value) {
    videoStream.value.getTracks().forEach(track => track.stop());
    videoStream.value = null;
  }
  showWebcam.value = false;
}

async function capturePhoto() {
  if (!videoRef.value || !canvasRef.value) return;

  isAnalyzing.value = true;
  errorMessage.value = '';

  try {
    // Capture current frame
    const canvas = canvasRef.value;
    const video = videoRef.value;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(video, 0, 0);
    }

    // Stop webcam
    stopWebcam();

    // Create image from canvas
    const img = new Image();
    img.onload = async () => {
      await analyzeImage(img);
    };
    img.src = canvas.toDataURL();
  } catch (error) {
    console.error('Capture error:', error);
    errorMessage.value = 'Failed to capture photo. Please try again.';
    isAnalyzing.value = false;
  }
}

function selectFile() {
  showSourceModal.value = false;
  fileInputRef.value?.click();
}

async function handleFileSelect(event: Event) {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  
  if (!file) return;

  isAnalyzing.value = true;
  errorMessage.value = '';

  try {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const img = new Image();
      img.onload = async () => {
        await analyzeImage(img);
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  } catch (error) {
    console.error('File read error:', error);
    errorMessage.value = 'Failed to read image file.';
    isAnalyzing.value = false;
  }
}

async function analyzeImage(img: HTMLImageElement) {
  try {
    const result = await emotionDetection.detectFromImage(img);
    
    if (result) {
      emit('emotion-detected');
    } else {
      errorMessage.value = emotionDetection.error.value || 'No face detected. Please try another image.';
      isAnalyzing.value = false;
    }
  } catch (error) {
    console.error('Analysis error:', error);
    errorMessage.value = 'Failed to analyze image. Please try again.';
    isAnalyzing.value = false;
  }
}

function handleClose() {
  stopWebcam();
  emit('close');
}

function handleOverlayClick(event: MouseEvent) {
  if (event.target === event.currentTarget) {
    handleClose();
  }
}

onUnmounted(() => {
  stopWebcam();
});
</script>

<template>
  <div 
    class="modal-overlay"
    @click="handleOverlayClick"
    role="dialog"
    aria-modal="true"
    aria-labelledby="modal-title"
  >
    <!-- Source Selection Modal -->
    <div v-if="showSourceModal" class="modal-content">
      <div class="p-4 text-center font-semibold text-gray-600 text-sm border-b border-gray-200">
        <h2 id="modal-title">Choose Image Source</h2>
      </div>
      <div class="p-2">
        <button
          class="w-full py-4 text-lg text-blue-500 hover:bg-gray-50 transition-colors border-b border-gray-100"
          @click="startWebcam"
          aria-label="Take photo with camera"
        >
          📷 Take Photo
        </button>
        <button
          class="w-full py-4 text-lg text-blue-500 hover:bg-gray-50 transition-colors border-b border-gray-100"
          @click="selectFile"
          aria-label="Choose from library"
        >
          🖼️ Choose from Library
        </button>
        <button
          class="w-full py-4 text-lg text-red-500 hover:bg-gray-50 transition-colors font-semibold mt-2 rounded-xl"
          @click="handleClose"
          aria-label="Cancel"
        >
          Cancel
        </button>
      </div>
    </div>

    <!-- Webcam View -->
    <div v-else-if="showWebcam" class="modal-content max-h-screen overflow-hidden">
      <div class="relative bg-black">
        <video
          ref="videoRef"
          autoplay
          playsinline
          class="w-full"
          aria-label="Webcam video feed"
        />
        <canvas ref="canvasRef" class="hidden" />
      </div>
      <div class="p-4 space-y-2">
        <button
          class="w-full py-3 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 transition-colors"
          @click="capturePhoto"
          :disabled="isAnalyzing"
          aria-label="Capture photo"
        >
          {{ isAnalyzing ? 'Analyzing...' : 'Capture Photo' }}
        </button>
        <button
          class="w-full py-3 bg-gray-500 text-white font-semibold rounded-xl hover:bg-gray-600 transition-colors"
          @click="stopWebcam"
          :disabled="isAnalyzing"
          aria-label="Stop camera"
        >
          Stop Camera
        </button>
      </div>
    </div>

    <!-- Analyzing State -->
    <div v-else-if="isAnalyzing" class="modal-content p-8">
      <div class="text-center">
        <div class="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-500 mx-auto mb-4"></div>
        <p class="text-lg font-semibold text-gray-700">Analyzing your emotion...</p>
        <p class="text-sm text-gray-500 mt-2">This may take a moment</p>
      </div>
    </div>

    <!-- Error Message -->
    <div v-if="errorMessage" class="fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-red-50 text-red-700 px-6 py-3 rounded-xl shadow-lg max-w-md mx-4">
      <p class="text-sm font-medium">{{ errorMessage }}</p>
    </div>

    <!-- Hidden File Input -->
    <input
      ref="fileInputRef"
      type="file"
      accept="image/*"
      class="hidden"
      @change="handleFileSelect"
      aria-label="File input for image selection"
    />
  </div>
</template>

<style scoped>
/* Component-specific animations */
</style>
