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
      ]
    },
    totals: (state) => {
      const calculateTotals = (foods: Food[]) => {
        return foods.reduce(
          (totals, food) => {
            if (!food.foodNutrients) return totals

            food.foodNutrients.forEach((nutrient) => {
              if (!nutrient.nutrientName || nutrient.amount === undefined)
                return

              if (nutrient.nutrientName === 'Energy')
                totals.calories += nutrient.amount
              if (nutrient.nutrientName === 'Protein')
                totals.proteins += nutrient.amount
              if (nutrient.nutrientName === 'Total lipid (fat)')
                totals.lipids += nutrient.amount
              if (nutrient.nutrientName === 'Sugars, total including NLEA')
                totals.sugars += nutrient.amount
            })

            return totals
          },
          { calories: 0, proteins: 0, lipids: 0, sugars: 0 }
        )
      }

      return {
        breakfast: calculateTotals(state.meals.breakfast),
        lunch: calculateTotals(state.meals.lunch),
        dinner: calculateTotals(state.meals.dinner),
        snacks: calculateTotals(state.meals.snacks),
        all: calculateTotals(this.allMeals),
      }
    },
  },
  actions: {
    addFoodToMeal(mealType: keyof typeof this.meals, food: Food) {
      this.meals[mealType].push(food)
    },
    removeFoodFromMeal(mealType: keyof typeof this.meals, foodId: number) {
      this.meals[mealType] = this.meals[mealType].filter(
        (f) => f.fdcId !== foodId
      )
    },
  },
})
