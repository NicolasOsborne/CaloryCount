<script>
import { getFoodDetails, getFoodList, searchFood } from '@/api/api'

export default {
  data() {
    return {
      foodList: [],
      foodDetails: null,
      searchResults: [],
      query: '',
      loading: true,
      error: null,
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

    async loadFoodDetails(fdcId) {
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
      } catch (error) {
        this.error = 'Failed to fetch search results'
        this.loading = false
      }
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

<template>
  <div class="food">
    <h1>This is a test page</h1>
  </div>
  <div>
    <input
      type="text"
      v-model="query"
      @input="searchFood"
      placeholder="Rechercher..."
    />
    <button type="button" @click="searchFood">Rechercher</button>
    <p v-if="loading">Searching...</p>
    <p v-if="error">{{ error }}</p>
    <ul>
      <li v-for="result in searchResults" :key="result.fdcId">
        {{ result.description }}
      </li>
    </ul>
  </div>
  <h2>Food List :</h2>
  <ul>
    <li v-for="food in foodList" :key="food.fdcId">
      <span>{{ food.description }} - </span
      ><span v-if="food.foodNutrients"
        >{{
          food.foodNutrients.find((nutrient) => nutrient.number === '208')
            ?.amount
        }}
        kcal</span
      >
      <button @click="loadFoodDetails(food.fdcId)">Voir détails</button>
    </li>
  </ul>
  <div v-if="foodDetails">
    <h2>Food Details</h2>
    <p>{{ foodDetails.description }}</p>
    <ul>
      <li v-for="nutrient in filteredNutrients" :key="nutrient.nutrient.id">
        {{ nutrient.nutrient.name }}: {{ nutrient.amount }}
        {{ nutrient.nutrient.unitName }}
      </li>
    </ul>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .food {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
input[type='text'] {
  padding: 8px;
  margin-right: 8px;
}

button {
  padding: 8px 16px;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
