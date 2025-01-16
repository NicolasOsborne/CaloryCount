<script>
import { defineComponent } from 'vue'
import { useFoodStore } from '@/stores/store'

export default defineComponent({
  name: 'DetailCard',

  computed: {
    // Accéder au store pour les repas
    foodStore() {
      return useFoodStore()
    },

    // Vérifier si tous les repas sont vides
    allMealsEmpty() {
      return (
        this.foodStore.meals.breakfast.length === 0 &&
        this.foodStore.meals.lunch.length === 0 &&
        this.foodStore.meals.dinner.length === 0 &&
        this.foodStore.meals.snacks.length === 0
      )
    },
  },
  methods: {
    removeFood(mealType, foodId) {
      console.log(mealType)
      this.foodStore.removeFoodFromMeal(mealType, foodId)
    },
  },
})
</script>

<template>
  <section class="container mt-5">
    <!-- Si tous les repas sont vides -->
    <div v-if="allMealsEmpty" class="text-uppercase fw-bold mb-3">
      Vous n'avez rien ajouté
    </div>

    <!-- Si un repas contient des aliments, affiche-le -->
    <div v-else>
      <!-- Petit-déjeuner -->
      <div v-if="foodStore.meals.breakfast.length > 0" class="mb-4">
        <h2 class="text-uppercase fw-bold">Petit-déjeuner</h2>
        <div class="card shadow-sm p-3 custom-card">
          <ul class="list-group list-group-flush">
            <li
              v-for="food in foodStore.meals.breakfast"
              :key="food.fdcId"
              class="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <span class="fw-bold">{{ food.name }}</span>
                <span class="text-muted"
                  >{{ food.nutrients.calories.amount || 'N/A' }} kcal</span
                >
              </div>
              <button
                class="btn btn-outline-danger btn-sm rounded-circle delete"
                title="Supprimer"
                @click="removeFood('breakfast', food.id)"
              >
                <i class="bi bi-trash"></i>
              </button>
            </li>
          </ul>
        </div>
      </div>

      <!-- Déjeuner -->
      <div v-if="foodStore.meals.lunch.length > 0" class="mb-4">
        <h2 class="text-uppercase fw-bold">Déjeuner</h2>
        <div class="card shadow-sm p-3 custom-card">
          <ul class="list-group list-group-flush">
            <li
              v-for="food in foodStore.meals.lunch"
              :key="food.fdcId"
              class="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <span class="fw-bold">{{ food.name }}</span>
                <span class="text-muted"
                  >{{ food.nutrients.calories.amount || 'N/A' }} kcal</span
                >
              </div>
              <button
                class="btn btn-outline-danger btn-sm rounded-circle delete"
                title="Supprimer"
                @click="removeFood('lunch', food.id)"
              >
                <i class="bi bi-trash"></i>
              </button>
            </li>
          </ul>
        </div>
      </div>

      <!-- Dîner -->
      <div v-if="foodStore.meals.dinner.length > 0" class="mb-4">
        <h2 class="text-uppercase fw-bold">Dîner</h2>
        <div class="card shadow-sm p-3 custom-card">
          <ul class="list-group list-group-flush">
            <li
              v-for="food in foodStore.meals.dinner"
              :key="food.fdcId"
              class="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <span class="fw-bold">{{ food.name }}</span>
                <span class="text-muted"
                  >{{ food.nutrients.calories.amount || 'N/A' }} kcal</span
                >
              </div>
              <button
                class="btn btn-outline-danger btn-sm rounded-circle delete"
                title="Supprimer"
                @click="removeFood('dinner', food.id)"
              >
                <i class="bi bi-trash"></i>
              </button>
            </li>
          </ul>
        </div>
      </div>

      <!-- Snacks -->
      <div v-if="foodStore.meals.snacks.length > 0" class="mb-4">
        <h2 class="text-uppercase fw-bold">Snacks</h2>
        <div class="card shadow-sm p-3 custom-card">
          <ul class="list-group list-group-flush">
            <li
              v-for="food in foodStore.meals.snacks"
              :key="food.fdcId"
              class="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <span class="fw-bold">{{ food.name }}</span>
                <span class="text-muted"
                  >{{ food.nutrients.calories.amount || 'N/A' }} kcal</span
                >
              </div>
              <button
                class="btn btn-outline-danger btn-sm rounded-circle delete"
                title="Supprimer"
                @click="removeFood('snacks', food.id)"
              >
                <i class="bi bi-trash"></i>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.custom-card {
  max-width: 600px;
  margin: 0 auto;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}
</style>

<style scoped>
.card {
  margin: 0;
  width: 600px;
}
.delete {
  background-color: transparent;
  border: none;
  color: red;
  font-size: 1.5rem;
  cursor: pointer;
}
</style>
