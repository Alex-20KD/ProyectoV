import type { Pet } from '../entities/Pet'

export interface IPetRepository {
  listPets(): Promise<Pet[]>
  getPet(id: string): Promise<Pet | null>
  createPet(data: Partial<Pet>): Promise<Pet>
  adoptPet(petId: string, userId: string): Promise<boolean>
}
