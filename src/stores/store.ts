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
    allMeals(state) {
      return [
        ...state.meals.breakfast,
        ...state.meals.lunch,
        ...state.meals.dinner,
        ...state.meals.snacks,
      ]
    },
    totals(state) {
      const calculateTotals = (foods: Food[]) => {
        return foods.reduce(
          (totals, food) => {
            if (food.nutrients) {
              totals.calories += food.nutrients.calories.amount || 0
              totals.proteins += food.nutrients.proteins.amount || 0
              totals.lipids += food.nutrients.lipids.amount || 0
              totals.glucids += food.nutrients.glucids.amount || 0
            }
            return totals
          },
          { calories: 0, proteins: 0, lipids: 0, glucids: 0 }
        )
      }

      return {
        breakfast: calculateTotals(state.meals.breakfast),
        lunch: calculateTotals(state.meals.lunch),
        dinner: calculateTotals(state.meals.dinner),
        snacks: calculateTotals(state.meals.snacks),
        all: calculateTotals([
          ...state.meals.breakfast,
          ...state.meals.lunch,
          ...state.meals.dinner,
          ...state.meals.snacks,
        ]),
      }
    },
  },
  actions: {
    addFoodToMeal(mealType: keyof typeof this.meals, food: Food) {
      console.log('Adding food to:', mealType, food); 
      this.meals[mealType].push(food)
    },
    removeFoodFromMeal(mealType: keyof typeof this.meals, foodId: string) {
      this.meals[mealType] = this.meals[mealType].filter((f) => f.id !== foodId)
    },
  },
})
