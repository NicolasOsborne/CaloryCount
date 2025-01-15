<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
    <div class="container-fluid">
      <a class="navbar-brand ms-3" href="#">CaloryCount</a>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul class="navbar-nav">
          <!-- Icône de recherche -->
          <li class="nav-item me-3">
            <router-link to="/food" class="nav-link">
              <i class="bi bi-search" style="font-size: 1.2rem"></i>
            </router-link>
          </li>

          <li class="nav-item me-3">
            <router-link to="/recap" class="nav-link">
              <i class="bi bi-bell" style="font-size: 1.2rem"></i>
            </router-link>
          </li>

          <li class="nav-item">
            <router-link to="/" class="nav-link">
              <i class="bi bi-person-circle" style="font-size: 1.2rem"></i>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'NavigationBar',
})
</script>
