<template>
  <section class="container mt-4">
    <div class="card mt-5 shadow-lg rounded" style="width: 100%; margin: 0 auto;">
      <div class="card-body">
        <div class="d-flex justify-content-between">
          <h5 class="card-title font-weight-bold">Bonjour {{ name }}</h5>
          <p class="card-text">{{ formattedDate }}</p>
        </div>

        <div class="mt-3">
          <div class="d-flex">
            <div class="p-2 border-end" style="flex: 1;">
              <h4>{{ foodStore.totals.all.calories }} kcal</h4>
              <p>Calories consommées</p>
            </div>
            <div class="p-2 border-end" style="flex: 1;">
              <h4>{{ remainingCalories }} kcal</h4>
              <p>Calories restantes</p>
            </div>
            <div class="p-2 border-end" style="flex: 1;">
              <h4>{{ calorieGoal }} kcal</h4>
              <p>Objectif de calories</p>
            </div>
          </div>
        </div>

        <hr class="my-4">

        <div class="row">
          <!-- Lipides -->
          <div class="col text-center">
            <h5 class="text-warning">Lipides</h5>
            <p>{{ foodStore.totals.all.lipids }} g / {{ nutrientGoals.lipids }} g</p> <!-- Objectif Lipides dynamique -->
            <div class="progress">
              <div
                  class="progress-bar bg-warning"
                  role="progressbar"
                  :style="{ width: lipidsProgress + '%' }"
                  :aria-valuenow="foodStore.totals.all.lipids"
                  aria-valuemin="0"
                  aria-valuemax="100"
              ></div>
            </div>
          </div>

          <!-- Glucides -->
          <div class="col text-center">
            <h5 class="text-info">Glucides</h5>
            <p>{{ foodStore.totals.all.glucids }} g / {{ nutrientGoals.carbs }} g</p> <!-- Objectif Glucides dynamique -->
            <div class="progress">
              <div
                  class="progress-bar bg-info"
                  role="progressbar"
                  :style="{ width: carbsProgress + '%' }"
                  :aria-valuenow="foodStore.totals.all.glucids"
                  aria-valuemin="0"
                  aria-valuemax="100"
              ></div>
            </div>
          </div>

          <!-- Protéines -->
          <div class="col text-center">
            <h5 class="text-success">Protéines</h5>
            <p>{{ foodStore.totals.all.proteins }} g / {{ nutrientGoals.proteins }} g</p> <!-- Objectif Protéines dynamique -->
            <div class="progress">
              <div
                  class="progress-bar bg-success"
                  role="progressbar"
                  :style="{ width: proteinsProgress + '%' }"
                  :aria-valuenow="foodStore.totals.all.proteins"
                  aria-valuemin="0"
                  aria-valuemax="100"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useFoodStore } from '@/stores/store';

export default defineComponent({
  name: 'DynamicTotalsCard',
  setup() {
    const foodStore = useFoodStore();

    // Définir les objectifs pour chaque nutriment
    const nutrientGoals = {
      lipids: 85,  // Objectif Lipides
      carbs: 310,   // Objectif Glucides
      proteins: 125, // Objectif Protéines
    };

    const calorieGoal = 2400; // Objectif de calories

    return {
      foodStore,
      calorieGoal,
      nutrientGoals,
    };
  },
  computed: {
    name() {
      return "John"; // Remplacez par un nom dynamique
    },
    formattedDate() {
      const options = { weekday: 'long', day: 'numeric', month: 'long' };
      return new Intl.DateTimeFormat('fr-FR', options).format(new Date());
    },
    remainingCalories() {
      return this.calorieGoal - this.foodStore.totals.all.calories;
    },
    lipidsProgress() {
      return (this.foodStore.totals.all.lipids / this.nutrientGoals.lipids) * 100;
    },
    carbsProgress() {
      return (this.foodStore.totals.all.glucids / this.nutrientGoals.carbs) * 100;
    },
    proteinsProgress() {
      return (this.foodStore.totals.all.proteins / this.nutrientGoals.proteins) * 100;
    },
  },
});
</script>

