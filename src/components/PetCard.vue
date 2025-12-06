<script setup lang="ts">
import type { Pet } from '@/domain/entities/Pet'

defineProps<{
  pet: Pet
}>()
</script>

<template>
  <div class="pet-card">
    <img :src="pet.imageUrl || '/placeholder.jpg'" :alt="pet.name" class="pet-image" />
    <div class="pet-info">
      <h3>{{ pet.name }}</h3>
      <p class="pet-details">{{ pet.breed }} - {{ pet.age }} años</p>
      <p class="pet-description">{{ pet.description }}</p>
    </div>
    <div v-if="pet.urgent" class="urgent-banner">Urgente</div>
  </div>
</template>

<style scoped>
.pet-card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: relative;
  background-color: white;
}

.pet-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.pet-info {
  padding: 1rem;
}

.pet-info h3 {
  margin: 0 0 0.5rem;
}

.pet-details {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.urgent-banner {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #42b883;
  color: white;
  padding: 0.3rem 0.7rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: bold;
}
</style>
