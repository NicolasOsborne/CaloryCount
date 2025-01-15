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
              <h4> TO DO : (344)</h4>
              <p> Calorie consommée </p>
              <!-- Pas de barre de progression ni couleur pour les calories -->
            </div>
            <div class="p-2 border-end" style="flex: 1;">
              <h4> TO DO : (1720)</h4>
              <p> Calorie restante </p>
              <!-- Pas de barre de progression ni couleur pour les calories restantes -->
            </div>
            <div class="p-2 border-end" style="flex: 1;">
              <h4> TO DO : (2200)</h4>
              <p> Objectif de calories </p>
              <!-- Pas de barre de progression ni couleur pour l'objectif -->
            </div>
          </div>
        </div>

        <!-- Ligne de séparation -->
        <hr class="my-4">

        <!-- 3 Colonnes : Lipides, Glucides, Protéines -->
        <div class="row">
          <div class="col text-center">
            <h5 class="text-warning">Lipides</h5>
            <p>20 g</p>
            <!-- Barre de progression pour les lipides -->
            <div class="progress">
              <div class="progress-bar bg-warning" role="progressbar" :style="{ width: lipidsProgress + '%' }" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
          </div>
          <div class="col text-center">
            <h5 class="text-info">Glucides</h5>
            <p>75 g</p>
            <!-- Barre de progression pour les glucides -->
            <div class="progress">
              <div class="progress-bar bg-info" role="progressbar" :style="{ width: carbsProgress + '%' }" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
          </div>
          <div class="col text-center">
            <h5 class="text-success">Protéines</h5>
            <p>30 g</p>
            <!-- Barre de progression pour les protéines -->
            <div class="progress">
              <div class="progress-bar bg-success" role="progressbar" :style="{ width: proteinsProgress + '%' }" aria-valuenow="30" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      name: "John", // Remplace avec ton nom dynamique
      currentDate: new Date(), // Date actuelle
      lipidsAmount: 20, // Exemple de lipides
      carbsAmount: 75, // Exemple de glucides
      proteinsAmount: 30, // Exemple de protéines
    };
  },
  computed: {
    formattedDate() {
      const options = { weekday: 'long', day: 'numeric', month: 'long' };
      return new Intl.DateTimeFormat('fr-FR', options).format(this.currentDate);
    },
    lipidsProgress() {
      return (this.lipidsAmount / 100) * 100;
    },
    carbsProgress() {
      return (this.carbsAmount / 100) * 100;
    },
    proteinsProgress() {
      return (this.proteinsAmount / 100) * 100;
    },
  },
};
</script>

<style scoped>
.card {
  margin: 0 auto;
  transition: box-shadow 0.3s ease, transform 0.3s ease; /* Animation lors du hover */
}

.card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2), 0 2px 8px rgba(0, 0, 0, 0.1); /* Ombre au survol */
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

.col h5 {
  font-weight: bold; /* Gras pour les titres des macronutriments */
  font-size: 1.2rem;
}

.col p {
  font-size: 1.1rem; /* Taille agréable pour les quantités */
  color: #555;
}

.progress {
  height: 12px;
  border-radius: 10px;
}

.progress-bar {
  border-radius: 10px;
}

.text-warning {
  color: #ffc107;
}

.text-info {
  color: #17a2b8;
}

.text-success {
  color: #28a745;
}
</style>
