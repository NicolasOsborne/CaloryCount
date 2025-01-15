import { defineStore } from 'pinia'

export const useFoodStore = defineStore('foodStore', {
  state: () => ({
    foods: [],
    meals: {
      breakfast: [],
      lunch: [],
      dinner: [],
      snacks: [],
    },
  }),
})
