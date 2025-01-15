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
            class="btn btn-outline-success"
            type="submit"
            @click="searchFood"
          >
            Rechercher
          </button>
        </form>

        <div>
          <p v-if="loading">Searching...</p>
          <p v-if="error">{{ error }}</p>
        </div>

        <div class="row">
          <div class="col-4" v-for="result in searchResults" :key="result.id">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">{{ result.name }}</h5>
                <button class="btn btn-primary" @click="openModal(result)">
                  Voir détails
                </button>
              </div>
            </div>
          </div>
        </div>

        <div
          v-if="modalFood"
          class="modal fade show"
          tabindex="-1"
          style="display: block"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">{{ modalFood.name }}</h5>
                <button
                  type="button"
                  class="close"
                  @click="closeModal"
                ></button>
              </div>
              <div class="modal-body">
                <ul>
                  <li
                    v-for="nutrient in filteredNutrients"
                    :key="nutrient.nutrientId"
                  >
                    {{ nutrient.nutrientName }}: {{ nutrient.amount }}
                    {{ nutrient.unit }}
                  </li>
                </ul>
                <div class="form-group">
                  <label for="mealType">Ajouter à un repas :</label>
                  <select
                    class="form-control"
                    id="mealType"
                    v-model="selectedMealType"
                  >
                    <option value="breakfast">Petit déjeuner</option>
                    <option value="lunch">Déjeuner</option>
                    <option value="dinner">Dîner</option>
                    <option value="snacks">Snack</option>
                  </select>
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  @click="closeModal"
                >
                  Fermer
                </button>
                <button
                  type="button"
                  class="btn btn-success"
                  @click="addFoodToMeal"
                >
                  Ajouter au repas
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { getFoodDetails, getFoodList, searchFood } from '@/api/api'
import { useFoodStore } from '@/stores/store'
import type { Food } from '@/types/types'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AddFoodView',

  data() {
    return {
      foodList: [] as Food[],
      foodDetails: null as Food | null,
      searchResults: [] as Food[],
      query: '',
      loading: true,
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
    async loadFoodList() {
      this.loading = true
      this.error = null
      try {
        this.foodList = await getFoodList()
      } catch (error) {
        this.error = 'Failed to fetch data'
        this.loading = false
      }
    },

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

  mounted() {
    this.loadFoodList()
  },
})
</script>

<style></style>
