<template>
  <div class="w-full h-full">
    <iframe
      :src="src"
      class="w-full h-[calc(100vh-4rem)] border-none"
      ref="frame"
      loading="lazy"
    ></iframe>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'IframeWrapper',
  props: {
    name: { type: String, required: false }
  },
  setup(props) {
    const route = useRoute()
    const appName = computed(() => props.name || route.params.name)
    // public/apps/<name>/index.html will be served as /apps/<name>/index.html
    const src = computed(() => `/apps/${String(appName.value)}/index.html`)
    return { src }
  }
})
</script>

<style scoped>
/* ensure iframe fills container */
</style>
