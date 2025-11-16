<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-8">
    <div class="max-w-4xl w-full">
      <header class="text-center mb-12">
        <h1 class="text-5xl font-bold text-white mb-4 drop-shadow-lg">🎲 Randos</h1>
        <p class="text-xl text-white opacity-90">A collection of random fun web apps</p>
      </header>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <router-link
          v-for="app in apps"
          :key="app.name"
          :to="{ name: 'Rando', params: { name: app.name } }"
          class="bg-white rounded-2xl p-8 text-center shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer"
        >
          <div class="text-6xl mb-4">{{ app.icon }}</div>
          <h2 class="text-2xl font-semibold text-gray-800 mb-2">{{ app.title }}</h2>
          <p class="text-gray-600">{{ app.description }}</p>
        </router-link>
      </div>
      
      <footer class="text-center text-white mt-12 opacity-80">
        <p>More random apps coming soon! 🎉</p>
      </footer>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Home',
  setup() {
    const apps = [
      {
        name: 'dice-roller',
        icon: '🎲',
        title: 'Dice Roller',
        description: 'Roll a six-sided die and test your luck!'
      },
      {
        name: 'coin-flip',
        icon: '🪙',
        title: 'Coin Flip',
        description: 'Flip a coin and see if it lands on heads or tails!'
      },
      {
        name: 'emotion-music',
        icon: '🎵',
        title: 'Emotion Music',
        description: 'Let your face choose the perfect playlist using AI!'
      },
      {
        name: 'fitec',
        icon: '🐋',
        title: 'FITEC',
        description: 'Marine wellness solutions for cetaceans!'
      }
    ]
    
    return { apps }
  }
})
</script>
