import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DetailsView from '../views/DetailsView.vue'
import AddFoodView from '../views/AddFoodView.vue'

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
      component: DetailsView,
    },
    {
      path: '/add-food',
      name: 'add-food',
      component: AddFoodView,
    },
  ],
})

export default router
