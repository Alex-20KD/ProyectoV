<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { container } from '../di/container'

const pets = ref([])
const loading = ref(false)
const error = ref<string | null>(null)

async function load() {
  loading.value = true
  error.value = null
  try {
    pets.value = await container.listPetsUseCase.execute()
  } catch (e: any) {
    error.value = e?.message ?? String(e)
  } finally {
    loading.value = false
  }
}

onMounted(load)
</script>

<template>
  <main>
    <h1>Mascotas disponibles</h1>
    <div v-if="loading">Cargando...</div>
    <div v-if="error">Error: {{ error }}</div>
    <ul v-if="!loading">
      <li v-for="p in pets" :key="p.id">{{ p.name }} — {{ p.species }}</li>
    </ul>
  </main>
</template>
