<template>
  <div>
    <NavigationBar />
  </div>
  <section class="container mt-4">
      <DaylyCal />
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import NavigationBar from './components/Navbar.vue';
import DaylyCal from "./components/DaylyCal.vue";

export default defineComponent({
  name: 'App',
  components: {
    DaylyCal,
    NavigationBar,
  },
});
</script>
