<template>
  <section class="container mt-4">
    <div class="card mt-5" style="width: 100%; margin: 0 auto;">
      <div class="card-body">
        <div class="d-flex justify-content-between">
          <h5 class="card-title">Bonjour {{ name }}</h5>
          <p class="card-text">{{ formattedDate }}</p>
        </div>

        <div class="mt-3">
          <div class="d-flex">
            <div class="p-2 border-end" style="flex: 1;">
              <h4> TO DO : (344)</h4>
              <p> Calorie consommée </p>
            </div>
            <div class="p-2 border-end" style="flex: 1;">
              <h4> TO DO : (1720)</h4>
              <p> Calorie restante </p>
            </div>
            <div class="p-2 border-end" style="flex: 1;">
              <h4> TO DO : (2200)</h4>
              <p> Objectif de calories </p>
            </div>
          </div>
        </div>

        <!-- Ligne de séparation -->
        <hr class="my-4">

        <!-- 4 Colonnes : Calories, Lipides, Glucides, Protéines -->
        <div class="row">
          <div class="col text-center">
            <h5>Calories</h5>
            <p>500 kcal</p> <!-- Remplace par la valeur dynamique -->
          </div>
          <div class="col text-center">
            <h5>Lipides</h5>
            <p>20 g</p> <!-- Remplace par la valeur dynamique -->
          </div>
          <div class="col text-center">
            <h5>Glucides</h5>
            <p>75 g</p> <!-- Remplace par la valeur dynamique -->
          </div>
          <div class="col text-center">
            <h5>Protéines</h5>
            <p>30 g</p> <!-- Remplace par la valeur dynamique -->
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
    };
  },
  computed: {
    formattedDate() {
      const options = { weekday: 'long', day: 'numeric', month: 'long' };
      return new Intl.DateTimeFormat('fr-FR', options).format(this.currentDate);
    },
  },
};
</script>

<style scoped>
.card {
  margin: 0 auto;
}

.card-body {
  padding: 20px;
}

hr.my-4 {
  border: 0;
  border-top: 1px solid #ccc;
  margin: 20px 0;
}
</style>
