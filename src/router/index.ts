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
      component: () => import('../views/AddFoodView.vue'),
    },
    {
      path: '/add-food',
      name: 'add-food',
      component: () => import('../views/AddFoodView.vue'),
    },
  ],
})

export default router
