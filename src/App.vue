<template>
  <div>
    <NavigationBar />
    <router-view />
  </div>
  <section class="container mt-4">
    <DaylyCal />
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NavigationBar from './components/Navbar.vue'

export default defineComponent({
  name: 'App',
  components: {
    NavigationBar,
  },
})
</script>
