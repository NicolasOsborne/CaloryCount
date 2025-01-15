export interface FoodNutrient {
  nutrientId: string
  nutrientName: string
  amount: number
  unit: string
}

export interface Food {
  id: string
  name: string
  nutrients: {
    calories: FoodNutrient
    proteins: FoodNutrient
    lipids: FoodNutrient
    glucids: FoodNutrient
  }
}

export interface NutrientSummary {
  calories: number
  proteins: number
  lipids: number
  glucids: number
}
