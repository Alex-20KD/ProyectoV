<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { container } from '@/di/container'
import type { Pet } from '@/domain/entities/Pet'
import PetCard from '@/components/PetCard.vue'

const pets = ref<Pet[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

async function loadPets() {
  loading.value = true
  error.value = null
  try {
    pets.value = await container.listPetsUseCase.execute()
  } catch (e: unknown) {
    if (e instanceof Error) {
      error.value = e.message
    } else {
      error.value = 'Error al cargar las mascotas'
    }
  } finally {
    loading.value = false
  }
}

onMounted(loadPets)
</script>

<template>
  <div>
    <section class="hero">
      <div class="hero-content">
        <h1>Encuentra a tu compañero ideal</h1>
        <p>Estos pequeños están esperando un hogar lleno de amor.</p>
      </div>
    </section>

    <main class="container">
      <div v-if="loading">Cargando mascotas...</div>
      <div v-if="error" class="error-message">{{ error }}</div>
      <div v-if="!loading && !error" class="pets-grid">
        <PetCard v-for="pet in pets" :key="pet.id" :pet="pet" />
      </div>
    </main>
  </div>
</template>

<style scoped>
.hero {
  background-image: url('https://i.imgur.com/s2p3mGz.jpeg');
  background-size: cover;
  background-position: center;
  padding: 4rem 2rem;
  text-align: center;
  color: white;
  position: relative;
}

.hero::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
}

.hero-content {
  position: relative;
  z-index: 1;
}

.hero h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.hero p {
  font-size: 1.2rem;
}

.container {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.pets-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

.error-message {
  color: red;
  text-align: center;
}
</style>
