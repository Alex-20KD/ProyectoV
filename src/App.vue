<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="main-header">
    <div class="container">
      <div class="logo">
        <img src="@/assets/logo.svg" alt="AdoptaAmigo" />
        <span>AdoptaAmigo</span>
      </div>
      <nav>
        <RouterLink to="/">Inicio</RouterLink>
        <RouterLink to="/pets">Mascotas</RouterLink>
        <RouterLink to="/about">Sobre Nosotros</RouterLink>
        <RouterLink to="/contact">Contacto</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
.main-header {
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1rem 0;
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.logo {
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 1.5rem;
  color: #333;
}

.logo img {
  height: 40px;
  margin-right: 0.5rem;
}

nav {
  display: flex;
  gap: 1.5rem;
}

nav a {
  text-decoration: none;
  color: #555;
  font-weight: 500;
}

nav a.router-link-exact-active {
  color: #42b883;
  font-weight: bold;
}
</style>
