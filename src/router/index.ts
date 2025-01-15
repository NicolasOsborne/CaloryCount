import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/recap',
      name: 'recap',
      component: () => import('../views/TestView.vue'),
    },
    {
      path: '/food',
      name: 'food',
      component: () => import('../views/TestView.vue'),
    },
  ],
})

export default router
