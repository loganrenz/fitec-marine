<template>
  <div class="h-screen flex flex-col">
    <header v-if="!hideToolbar" class="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-4 flex items-center justify-between">
      <div class="flex items-center gap-4">
        <router-link to="/" class="text-white hover:text-gray-200 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </router-link>
        <h1 class="text-2xl font-semibold text-white">{{ displayName }}</h1>
      </div>
    </header>
    <div class="flex-1">
      <IframeWrapper :name="name" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import IframeWrapper from '../components/IframeWrapper.vue'
import { useRoute } from 'vue-router'

// Apps that should hide the toolbar
const HIDE_TOOLBAR_APPS = ['fitec']

export default defineComponent({
  name: 'RandoPage',
  components: { IframeWrapper },
  setup() {
    const route = useRoute()
    const name = computed(() => String(route.params.name || ''))
    const hideToolbar = computed(() => HIDE_TOOLBAR_APPS.includes(name.value))
    const displayName = computed(() => {
      return name.value
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    })
    return { name, displayName, hideToolbar }
  }
})
</script>
