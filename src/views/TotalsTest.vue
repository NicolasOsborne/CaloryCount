<template>
  <div class="totals">
    <h2>Today's Totals</h2>
    <p>Calories: {{ foodStore.totals.all.calories }} kcal</p>
    <p>Proteins: {{ foodStore.totals.all.proteins }} g</p>
    <p>Lipids: {{ foodStore.totals.all.lipids }} g</p>
    <p>Glucids: {{ foodStore.totals.all.glucids }} g</p>
  </div>

  <div v-for="(mealTotal, meal) in foodStore.totals" :key="meal">
    <h3>{{ meal }}:</h3>
    <p>Calories: {{ mealTotal.calories }} kcal</p>
    <p>Proteins: {{ mealTotal.proteins }} g</p>
    <p>Lipids: {{ mealTotal.lipids }} g</p>
    <p>Glucids: {{ mealTotal.glucids }} g</p>
  </div>
</template>

<script lang="ts">
import { useFoodStore } from '@/stores/store'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TotalsTest',
  setup() {
    const foodStore = useFoodStore()
    return { foodStore }
  },
  computed: {
    total() {
      return this.foodStore.totals
    },
  },
})
</script>
