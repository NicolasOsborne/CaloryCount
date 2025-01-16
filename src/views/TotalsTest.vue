<template>
  <div class="totals">
    <h2>Today's Totals</h2>
    <canvas id="totalsChart"></canvas>

    <p>Calories: {{ foodStore.totals.all.calories }} kcal</p>
    <p>Proteins: {{ foodStore.totals.all.proteins }} g</p>
    <p>Lipids: {{ foodStore.totals.all.lipids }} g</p>
    <p>Glucids: {{ foodStore.totals.all.glucids }} g</p>
  </div>

  <div v-for="(mealTotal, meal) in foodStore.totals" :key="meal" class="meal-totals">
    <h3>{{ meal }}:</h3>
    <p>Calories: {{ mealTotal.calories }} kcal</p>
    <p>Proteins: {{ mealTotal.proteins }} g</p>
    <p>Lipids: {{ mealTotal.lipids }} g</p>
    <p>Glucids: {{ mealTotal.glucids }} g</p>
    <div class="progress-bars">
      <div :id="meal + '-calories-progress'" class="progress-bar"></div>
      <div :id="meal + '-proteins-progress'" class="progress-bar"></div>
      <div :id="meal + '-lipids-progress'" class="progress-bar"></div>
      <div :id="meal + '-glucids-progress'" class="progress-bar"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { useFoodStore } from '@/stores/store'
import { defineComponent, onMounted } from 'vue'
import Chart from 'chart.js/auto'
import ProgressBar from 'progressbar.js'

export default defineComponent({
  name: 'TotalsTest',
  setup() {
    const foodStore = useFoodStore()

    onMounted(() => {
      // Chart.js for daily totals
      const ctx = document.getElementById('totalsChart') as HTMLCanvasElement
      if (ctx) {
        new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: ['Calories', 'Proteins', 'Lipids', 'Glucids'],
            datasets: [
              {
                label: 'Daily Totals',
                data: [
                  foodStore.totals.all.calories,
                  foodStore.totals.all.proteins,
                  foodStore.totals.all.lipids,
                  foodStore.totals.all.glucids,
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
            plugins: {
              legend: {
                display: true,
              },
            },
          },
        })
      }

      // ProgressBar.js for individual meal totals
      Object.entries(foodStore.totals).forEach(([meal, mealTotal]) => {
        if (meal === 'all') return // Skip the 'all' totals

        const nutrients = ['calories', 'proteins', 'lipids', 'glucids']
        nutrients.forEach((nutrient) => {
          const id = `#${meal}-${nutrient}-progress`
          const progress = new ProgressBar.Line(id, {
            strokeWidth: 4,
            color: getColorForNutrient(nutrient),
            trailColor: '#e0e0e0',
            trailWidth: 4,
            duration: 800,
            easing: 'easeInOut',
          })

          progress.animate(mealTotal[nutrient] / 100) // Assume goal is 100 for demo purposes
        })
      })
    })

    // Helper function for colors
    const getColorForNutrient = (nutrient: string): string => {
      switch (nutrient) {
        case 'calories':
          return 'rgba(255, 99, 132, 1)' // Red
        case 'proteins':
          return 'rgba(54, 162, 235, 1)' // Blue
        case 'lipids':
          return 'rgba(255, 206, 86, 1)' // Yellow
        case 'glucids':
          return 'rgba(75, 192, 192, 1)' // Green
        default:
          return 'rgba(0, 0, 0, 1)' // Default Black
      }
    }

    return { foodStore }
  },
})
</script>

<style scoped>
#totalsChart {
  max-width: 600px;
  margin: 0 auto 20px;
}

.meal-totals {
  margin-top: 20px;
}

.progress-bars {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.progress-bar {
  width: 100%;
  height: 8px;
}
</style>
