// Archivo: domain/repositories/IPetRepository.ts

import type { Pet } from '../entities/Pet'

export interface IPetRepository {

  // Lectura
  listPets(): Promise<Pet[]>
  getPet(id: string): Promise<Pet | null>

  // Escritura
  createPet(data: Partial<Pet>): Promise<Pet>

  /**
   * Actualiza completamente o parcialmente la entidad Pet.
   * ¡Este método será usado por el Use Case para cambiar el estado a 'Adopted'!
   */
  updatePet(pet: Pet): Promise<Pet>

  // Opcional, pero recomendado
  deletePet(id: string): Promise<void>
}
