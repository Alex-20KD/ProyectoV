import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { container } from '../di/container'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)

  // initialize from repository (non-blocking)
  container.counterRepository.getCount().then((v) => {
    count.value = v
  })

  async function increment() {
    const next = await container.incrementCounterUseCase.execute()
    count.value = next
  }

  return { count, doubleCount, increment }
})
