export interface FoodNutrient {
    nutrientId: number;    
    nutrientName: string;
    amount: number;    
    unit: string;  
  }

export interface Food {
    fdcId: number;
    description: string;
    foodNutrients: FoodNutrient[];
  }