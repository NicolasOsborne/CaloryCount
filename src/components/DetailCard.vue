<template>
    <section class="container mt-5">
      <!-- Si tous les repas sont vides -->
      <div v-if="allMealsEmpty" class="text-uppercase fw-bold mb-3">
        Vous n'avez rien ajouté
      </div>
  
      <!-- Si un repas contient des aliments, affiche-le -->
      <div v-else>
        <!-- Petit-déjeuner -->
        <div v-if="foodStore.meals.breakfast.length > 0" class="mb-4 d-flex align-items-start">
          <div>
            <h2 class="text-uppercase fw-bold">Petit-déjeuner</h2>
            <div class="card shadow-sm p-3 custom-card">
              <ul class="list-group list-group-flush">
                <li
                  v-for="food in foodStore.meals.breakfast"
                  :key="food.fdcId"
                  class="list-group-item d-flex justify-content-between align-items-center"
                >
                  <div class="d-flex flex-column">
  <!-- Nom en haut -->
  <span class="fw-bold mb-2">{{ food.name }}</span>

  <!-- Nutriments en dessous -->
  <div class="d-flex align-items-center text-muted">
  <span class="me-3 nutri">Calories {{ food.nutrients.calories.amount || 'N/A' }} kcal</span>
  <span class="me-3 nutri">Glucides {{ food.nutrients.glucids.amount || 'N/A' }} G</span>
  <span class="nutri">Proteines {{ food.nutrients.proteins.amount || 'N/A' }} G</span>
</div>
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
          <canvas id="breakfast-chart" class="meal-chart"></canvas>
        </div>
  
        <!-- Déjeuner -->
        <div v-if="foodStore.meals.lunch.length > 0" class="mb-4 d-flex align-items-start">
          <div>
            <h2 class="text-uppercase fw-bold">Déjeuner</h2>
            <div class="card shadow-sm p-3 custom-card">
              <ul class="list-group list-group-flush">
                <li
                  v-for="food in foodStore.meals.lunch"
                  :key="food.fdcId"
                  class="list-group-item d-flex justify-content-between align-items-center"
                >
                <div class="d-flex flex-column">
  <!-- Nom en haut -->
  <span class="fw-bold mb-2">{{ food.name }}</span>

  <!-- Nutriments en dessous -->
  <div class="d-flex align-items-center text-muted">
  <span class="me-3 nutri">Calories {{ food.nutrients.calories.amount || 'N/A' }} kcal</span>
  <span class="me-3 nutri">Glucides {{ food.nutrients.glucids.amount || 'N/A' }} G</span>
  <span class="nutri">Proteines {{ food.nutrients.proteins.amount || 'N/A' }} G</span>
</div>
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
          <canvas id="lunch-chart" class="meal-chart"></canvas>
        </div>
  
        <!-- Dîner -->
        <div v-if="foodStore.meals.dinner.length > 0" class="mb-4 d-flex align-items-start">
          <div>
            <h2 class="text-uppercase fw-bold">Dîner</h2>
            <div class="card shadow-sm p-3 custom-card">
              <ul class="list-group list-group-flush">
                <li
                  v-for="food in foodStore.meals.dinner"
                  :key="food.fdcId"
                  class="list-group-item d-flex justify-content-between align-items-center"
                >
                <div class="d-flex flex-column">
  <!-- Nom en haut -->
  <span class="fw-bold mb-2">{{ food.name }}</span>

  <!-- Nutriments en dessous -->
  <div class="d-flex align-items-center text-muted">
  <span class="me-3 nutri">Calories {{ food.nutrients.calories.amount || 'N/A' }} kcal</span>
  <span class="me-3 nutri">Glucides {{ food.nutrients.glucids.amount || 'N/A' }} G</span>
  <span class="nutri">Proteines {{ food.nutrients.proteins.amount || 'N/A' }} G</span>
</div>
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
          <canvas id="dinner-chart" class="meal-chart"></canvas>
        </div>
  
        <!-- Snacks -->
        <div v-if="foodStore.meals.snacks.length > 0" class="mb-4 d-flex align-items-start">
          <div>
            <h2 class="text-uppercase fw-bold">Snacks</h2>
            <div class="card shadow-sm p-3 custom-card">
              <ul class="list-group list-group-flush">
                <li
                  v-for="food in foodStore.meals.snacks"
                  :key="food.fdcId"
                  class="list-group-item d-flex justify-content-between align-items-center"
                >
                  <div class="d-flex flex-column">
  <!-- Nom en haut -->
  <span class="fw-bold mb-2">{{ food.name }}</span>

  <!-- Nutriments en dessous -->
  <div class="d-flex align-items-center text-muted">
  <span class="me-3 nutri">Calories {{ food.nutrients.calories.amount || 'N/A' }} kcal</span>
  <span class="me-3 nutri">Glucides {{ food.nutrients.glucids.amount || 'N/A' }} G</span>
  <span class="nutri">Proteines {{ food.nutrients.proteins.amount || 'N/A' }} G</span>
</div>
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
          <canvas id="snacks-chart" class="meal-chart"></canvas>
        </div>
      </div>
    </section>
  </template>
  
  <script>
  import { defineComponent, onMounted } from 'vue';
  import { useFoodStore } from '@/stores/store';
  import Chart from 'chart.js/auto';
  
  export default defineComponent({
    name: 'DetailCard',
    computed: {
      // Accéder au store pour les repas
      foodStore() {
        return useFoodStore();
      },
  
      // Vérifier si tous les repas sont vides
      allMealsEmpty() {
        return (
          this.foodStore.meals.breakfast.length === 0 &&
          this.foodStore.meals.lunch.length === 0 &&
          this.foodStore.meals.dinner.length === 0 &&
          this.foodStore.meals.snacks.length === 0
        );
      },
    },
    methods: {
      removeFood(mealType, foodId) {
        this.foodStore.removeFoodFromMeal(mealType, foodId);
      },
  
      generateChart(mealId, mealTotals) {
        const ctx = document.getElementById(`${mealId}-chart`);
        if (ctx) {
          new Chart(ctx, {
            type: 'doughnut',
            data: {
              labels: ['Calories', 'Proteins', 'Lipids', 'Glucids'],
              datasets: [
                {
                  data: [
                    mealTotals.calories,
                    mealTotals.proteins,
                    mealTotals.lipids,
                    mealTotals.glucids,
                  ],
                  backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                  ],
                  borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                  ],
                  borderWidth: 1,
                },
              ],
            },
            options: {
              responsive: true,
            },
          });
        }
      },
    },
    mounted() {
      // Créer les graphiques pour chaque repas
      this.generateChart('breakfast', this.foodStore.totals.breakfast);
      this.generateChart('lunch', this.foodStore.totals.lunch);
      this.generateChart('dinner', this.foodStore.totals.dinner);
      this.generateChart('snacks', this.foodStore.totals.snacks);
    },
  });
  </script>
  
  <style scoped>
  .custom-card {
    width: 600px;
    margin: 0 auto;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  }
  
  .nutri{
    font-size: 10px;
  }
  .meal-chart {
    width: auto;
    max-height: 200px;
    margin-right: 800px;
  }
  </style>
  