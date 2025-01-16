<template>
  <div v-if="food" class="modal-backdrop fade show"></div>
  <div
    v-if="food"
    class="modal fade show"
    tabindex="-1"
    style="display: block"
    @click.self="onClose"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div
          class="modal-header d-flex align-items-center justify-content-between"
        >
          <h5 class="modal-title">{{ food.name }}</h5>
          <i class="bi bi-x-lg close" @click="onClose"></i>
        </div>
        <div class="modal-body">
          <div class="mt-4 d-flex justify-content-between">
            <div
              v-for="nutrient in filteredNutrients"
              :key="nutrient.nutrientId"
              class="text-center mx-2"
            >
              <b
                class="mt-2"
                :class="{
                  'text-warning': nutrient.nutrientName === 'Lipides',
                  'text-success': nutrient.nutrientName === 'Protéines',
                  'text-info': nutrient.nutrientName === 'Glucides',
                  'text-danger': nutrient.nutrientName === 'Calories',
                }"
              >
                {{ nutrient.nutrientName }}
              </b>
              <p class="mt-2">{{ nutrient.amount }} {{ nutrient.unit }}</p>
            </div>
          </div>
          <div class="form-group mt-4">
            <label for="mealType">Ajouter à un repas :</label>
            <select
              class="form-select mt-2 mb-4"
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
            class="btn btn-outline add-button"
            @click="onAddFood"
          >
            Ajouter au repas
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { Food } from '@/types/types'

export default defineComponent({
  name: 'FoodModal',
  props: {
    food: {
      type: Object as () => Food | null,
      required: true,
    },
  },
  emits: ['close', 'add-food'],
  data() {
    return {
      selectedMealType: 'breakfast' as
        | 'breakfast'
        | 'lunch'
        | 'dinner'
        | 'snacks',
    }
  },
  computed: {
    filteredNutrients() {
      if (!this.food) return []

      const displayedNutrients = ['calories', 'proteins', 'lipids', 'glucids']
      const nutrientList = []

      for (const nutrientKey of displayedNutrients) {
        const nutrient =
          this.food.nutrients[nutrientKey as keyof typeof this.food.nutrients]
        nutrientList.push(nutrient)
      }

      return nutrientList
    },
  },
  methods: {
    onClose() {
      this.$emit('close')
    },
    onAddFood() {
      this.$emit('add-food', {
        food: this.food,
        mealType: this.selectedMealType,
      })
    },
  },
})
</script>
<style scoped>
.modal.fade {
  opacity: 0;
  transition: opacity 0.3s ease;
}
.modal.fade.show {
  opacity: 1;
}

.modal-backdrop.fade {
  opacity: 0;
  transition: opacity 0.3s ease;
}
.modal-backdrop.fade.show {
  opacity: 0.5;
}

.close {
  cursor: pointer;
}

.add-button {
  border-color: #28a745;
  background-color: #28a745;
  color: white;
  transition: all 0.3s ease;
}

.add-button:hover {
  background-color: white;
  color: #28a745;
}
</style>
