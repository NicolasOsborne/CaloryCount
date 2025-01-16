<template>
  <section class="container mt-4">
    <!-- Vérifier s'il y a des repas valides dans foodStore.totals -->
    <div v-if="!hasMeals" class="alert alert-info d-flex justify-content-between align-items-center" role="alert">
      <span>Veuillez renseigner vos repas.</span>
      <!-- Bouton + avec lien vers la page de recherche -->
      <router-link to="/add-food" class="ms-2">
        <button class="btn btn-primary">
          <i class="bi bi-plus"></i> Ajouter
        </button>
      </router-link>
    </div>

    <!-- Itération sur chaque repas dans foodStore.totals sauf 'all' -->
    <div v-for="(mealData, meal) in foodStore.totals" :key="meal">
      <!-- Affichage conditionnel de la carte pour chaque repas, sauf 'all' -->
      <div v-if="meal !== 'all' && isMealValid(mealData)" class="card mt-5 shadow-lg rounded" style="width: 100%; margin: 0 auto;">
        <div class="card-body">
          <div class="d-flex justify-content-between">
            <h5 class="card-title font-weight-bold">{{ formatMealName(meal) }}</h5>
            <p class="card-text"><strong>Calories : </strong> {{ mealData.calories }} kcal</p>
          </div>
          <div class="mt-3">
            <!-- Utilisation de d-flex pour aligner les colonnes et le bouton sur la même ligne -->
            <div class="d-flex justify-content-between align-items-center">
              <div class="row w-100">
                <div class="col text-center">
                  <h6 class="text-warning">Lipides</h6>
                  <p>{{ mealData.lipids }} g</p>
                </div>
                <div class="col text-center">
                  <h6 class="text-info">Glucides</h6>
                  <p>{{ mealData.glucids }} g</p>
                </div>
                <div class="col text-center">
                  <h6 class="text-success">Protéines</h6>
                  <p>{{ mealData.proteins }} g</p>
                </div>
              </div>
              <!-- Bouton Voir Détails sur la même ligne -->
              <router-link to="/recap" class="btn btn-light">Voir Détails</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { useFoodStore } from '@/stores/store'
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'MealsCard',
  setup() {
    const foodStore = useFoodStore()

    // Fonction pour vérifier si un repas est valide
    const isMealValid = (mealData) => {
      return mealData && mealData.calories && mealData.lipids && mealData.glucids && mealData.proteins
    }

    // Fonction pour formater le nom du repas (par exemple, "breakfast" devient "Petit Déjeuner")
    const formatMealName = (meal) => {
      const mealNames = {
        breakfast: "Petit Déjeuner",
        lunch: "Déjeuner",
        dinner: "Dîner",
        snack: "Snack",
      }
      return mealNames[meal] || meal // Si le nom du repas n'est pas trouvé, on utilise le nom brut
    }

    // Vérifier si le store contient des repas valides
    const hasMeals = computed(() => {
      return Object.keys(foodStore.totals).some(meal => meal !== 'all' && isMealValid(foodStore.totals[meal]))
    })

    return { foodStore, isMealValid, formatMealName, hasMeals }
  },
})
</script>

<style scoped>
.card {
  margin: 0 auto;
  transition: box-shadow 0.3s ease, transform 0.3s ease; /* Animation lors du hover */
}

.card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2), 0 2px 4px rgba(0, 0, 0, 0.1); /* Ombre au survol */
  transform: translateY(-5px); /* Effet de légère élévation */
}

.card-body {
  padding: 20px;
}

hr.my-4 {
  border: 0;
  border-top: 1px solid #ccc;
  margin: 20px 0;
}

.btn {
  padding: 10px 20px;
  transition: background-color 0.3s ease;
}

.btn-light {
  background-color: #f8f9fa; /* Couleur de fond claire */
  border: 1px solid #ddd; /* Bordure gris clair */
  color: #6c757d; /* Texte gris */
}

.btn-light:hover {
  background-color: #e2e6ea; /* Changement de couleur au survol */
}

.btn-primary {
  display: flex;
  align-items: center;
  font-size: 1rem;
}

.card-title {
  font-size: 1.5rem; /* Agrandissement du titre */
  color: #333;
}

.card-text {
  font-size: 1.2rem; /* Agrandissement du texte des calories */
}

.row {
  margin-top: 20px;
}

.col h6 {
  font-weight: bold; /* Gras pour les titres des macronutriments */
  font-size: 1rem;
}

.col p {
  font-size: 1.1rem; /* Taille agréable pour les quantités */
  color: #555;
}

.shadow-lg {
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
}

.rounded {
  border-radius: 10px; /* Bords arrondis pour la carte */
}

.d-flex {
  display: flex;
  align-items: center;
}

.justify-content-between {
  justify-content: space-between;
}

.alert-info {
  margin-top: 20px;
  font-size: 1.2rem;
  text-align: center;
  font-weight: bold;
}

.ms-2 {
  margin-left: 0.5rem; /* Espacement pour le bouton */
}

.bi-plus {
  margin-right: 5px; /* Espacement entre le signe + et le texte */
}
</style>
