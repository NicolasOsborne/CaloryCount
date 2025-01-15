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
          <div
            class="col-4"
            v-for="result in searchResults"
            :key="result.fdcId"
          >
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">{{ result.description }}</h5>
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
          role="dialog"
          aria-hidden="true"
          style="display: block"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">{{ modalFood.description }}</h5>
                <button type="button" class="close" @click="closeModal">
                  <span aria-hidden="true">&times;</span>
                </button>
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

export default {
  data() {
    return {
      foodList: [] as Food[],
      foodDetails: null as Food | null,
      searchResults: [] as Food[],
      query: '',
      loading: true,
      error: null,
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
        this.loading(false)
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
        this.searchResults = data.foods
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
      const displayedNutrients = ['208', '203', '205', '204']
      return (
        this.foodDetails?.foodNutrients.filter((nutrient) =>
          displayedNutrients.includes(nutrient.nutrient.number)
        ) || []
      )
    },
  },

  mounted() {
    this.loadFoodList()
  },
}
</script>

<style></style>
