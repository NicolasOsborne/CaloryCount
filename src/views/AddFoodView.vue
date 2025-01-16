<template>
  <section class="container mt-4">
    <div class="card mt-5" style="width: 100%; margin: 0 auto">
      <div class="card-body">
        <h1 class="card-title">Ajouter des aliments</h1>
        <p class="card-text">
          Recherchez les aliments que vous avez consommé aujourd'hui pour les
          ajouter à votre consommation quotidienne :
        </p>
        <form
          class="form-inline my-4 d-flex align-items-center justify-content-between"
          @submit.prevent="searchFood"
        >
          <input
            class="form-control me-4"
            type="search"
            placeholder="Rechercher un aliment..."
            aria-label="Rechercher un aliment"
            v-model="query"
            @input="searchFood"
          />
          <button
            class="btn btn-outline search-button"
            type="submit"
            @click="searchFood"
          >
            Rechercher
          </button>
        </form>
      </div>
    </div>
    <div class="d-flex align-items-center justify-content-center">
      <span
        v-if="loading"
        class="spinner-grow text-danger mt-4"
        role="status"
      ></span>
      <span
        v-if="loading"
        class="spinner-grow text-warning mt-4"
        role="status"
      ></span>
      <span
        v-if="loading"
        class="spinner-grow text-info mt-4"
        role="status"
      ></span>
      <span
        v-if="loading"
        class="spinner-grow text-success mt-4"
        role="status"
      ></span>
    </div>

    <p v-if="error">{{ error }}</p>

    <div class="row mt-4">
      <div class="col-4 g-4" v-for="result in searchResults" :key="result.id">
        <div class="card food-card">
          <div
            class="card-body d-flex flex-row justify-content-between align-items-center shadow-md rounded"
          >
            <h5 class="card-title">{{ result.name }}</h5>
            <button
              class="btn btn-outline-success btn-sm rounded-circle d-flex align-items-center justify-content-center custom-hover"
              title="Ajouter"
              @click="openModal(result)"
            >
              <i class="bi bi-plus-lg"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
    <FoodModal
      v-if="modalFood"
      :food="modalFood"
      @close="closeModal"
      @add-food="handleAddFood"
    />
  </section>
</template>

<script lang="ts">
import { getFoodDetails, searchFood } from '@/api/api'
import { useFoodStore } from '@/stores/store'
import type { Food } from '@/types/types'
import { defineComponent } from 'vue'
import FoodModal from '@/components/FoodModal.vue'

export default defineComponent({
  name: 'AddFoodView',

  components: {
    FoodModal,
  },

  data() {
    return {
      foodList: [] as Food[],
      foodDetails: null as Food | null,
      searchResults: [] as Food[],
      query: '',
      loading: false,
      error: null as string | null,
      modalFood: null as Food | null,
      selectedMealType: 'breakfast' as
        | 'breakfast'
        | 'lunch'
        | 'dinner'
        | 'snacks',
    }
  },
  methods: {
    async loadFoodDetails(fdcId: string) {
      this.loading = true
      this.error = null
      try {
        this.foodDetails = await getFoodDetails(fdcId)
      } catch (error) {
        this.error = 'Failed to fetch data'
      } finally {
        this.loading = false
      }
    },

    async searchFood() {
      if (!this.query) {
        this.loading = false
        this.searchResults = []
        return
      }

      this.loading = true
      this.error = null
      try {
        const data = await searchFood(this.query)
        this.searchResults = data.foods.map((food: any) => {
          const foodNutrients = food.foodNutrients || []

          const getNutrientAmount = (nutrientId: number) => {
            const nutrient = foodNutrients.find(
              (n: any) => n.nutrientId === nutrientId
            )
            if (!nutrient) {
              return 0
            }
            return nutrient.value
          }

          return {
            id: food.fdcId,
            name: food.description,
            nutrients: {
              calories: {
                nutrientId: 1008,
                nutrientName: 'Calories',
                amount: getNutrientAmount(1008),
                unit: 'kcal',
              },
              proteins: {
                nutrientId: 1003,
                nutrientName: 'Protéines',
                amount: getNutrientAmount(1003),
                unit: 'g',
              },
              lipids: {
                nutrientId: 1004,
                nutrientName: 'Lipides',
                amount: getNutrientAmount(1004),
                unit: 'g',
              },
              glucids: {
                nutrientId: 1005,
                nutrientName: 'Glucides',
                amount: getNutrientAmount(1005),
                unit: 'g',
              },
            },
          }
        })
        this.loading = false
      } catch (error) {
        this.error = 'Failed to fetch search results'
        this.loading = false
      } finally {
        this.loading = false
      }
    },

    openModal(food: Food) {
      this.modalFood = food
    },

    closeModal() {
      this.modalFood = null
    },

    addFoodToMeal() {
      const foodStore = useFoodStore()
      if (this.modalFood) {
        foodStore.addFoodToMeal(this.selectedMealType, this.modalFood)
      }
      this.closeModal()
    },

    handleAddFood({ food, mealType }: { food: Food; mealType: string }) {
      const foodStore = useFoodStore()
      foodStore.addFoodToMeal(mealType as keyof typeof foodStore.meals, food)
      this.closeModal()
    },
  },

  computed: {
    filteredNutrients() {
      if (!this.modalFood) return []

      const displayedNutrients = ['calories', 'proteins', 'lipids', 'glucids']
      const nutrientList = []

      for (const nutrientKey of displayedNutrients) {
        const nutrient =
          this.modalFood.nutrients[
            nutrientKey as keyof typeof this.modalFood.nutrients
          ]
        nutrientList.push(nutrient)
      }

      return nutrientList
    },
  },
})
</script>

<style scoped>
.search-button {
  border-color: #28a745;
  background-color: #28a745;
  color: white;
  transition: all 0.3s ease;
}

.search-button:hover {
  background-color: white;
  color: #28a745;
}

.food-card {
  margin: 0 auto;
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}

.food-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2), 0 2px 8px rgba(0, 0, 0, 0.1);
  transform: translateY(-5px);
}

.custom-hover {
  width: 40px;
  height: 40px;
  border-radius: 999;
  font-size: 1.5rem;
  cursor: pointer;
  background-color: #28a745;
  color: white;
  border-color: #28a745;
  transition: all 0.3s ease;
}

.custom-hover:hover {
  background-color: white;
  color: #28a745;
  border-color: #28a745;
}
</style>
