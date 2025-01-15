<template>
  <div>
    <NavigationBar />
    <router-view />
  </div>
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
