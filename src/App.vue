<template>
  <div>
    <NavigationBar />
    <router-view />
  </div>
  <div>
    <NavigationBar />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NavigationBar from './components/Navbar.vue'

export default defineComponent({
  components: {
    NavigationBar,
  },
})
</script>
