import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import RandoPage from '../views/RandoPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL || '/'),
  routes: [
    { 
      path: '/', 
      name: 'Home', 
      component: Home,
      meta: { title: 'Randos - Random Fun Web Apps' }
    },
    // quick iframe-based route for migrated or legacy apps
    { 
      path: '/r/:name', 
      name: 'Rando', 
      component: RandoPage,
      meta: { title: 'Randos' }
    }
  ]
})

// Update document title on route change
router.afterEach((to) => {
  const defaultTitle = 'Randos - Random Fun Web Apps'
  document.title = (to.meta.title as string) || defaultTitle
})

export default router
