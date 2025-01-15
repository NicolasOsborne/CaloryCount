import { defineStore } from 'pinia'
import type { Food } from '../types/types'

export const useFoodStore = defineStore('foodStore', {
  state: () => ({
    meals: {
      breakfast: [] as Food[],
      lunch: [] as Food[],
      dinner: [] as Food[],
      snacks: [] as Food[],
    },
  }),
  getters: {
    allMeals: (state) => {
      return [
        ...state.meals.breakfast,
        ...state.meals.lunch,
        ...state.meals.dinner,
        ...state.meals.snacks,
      ];
    },
  },
})
