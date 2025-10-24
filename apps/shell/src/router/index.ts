import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import RandoPage from '../views/RandoPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL || '/'),
  routes: [
    { path: '/', name: 'Home', component: Home },
    // quick iframe-based route for migrated or legacy apps
    { path: '/r/:name', name: 'Rando', component: RandoPage }
  ]
})

export default router
