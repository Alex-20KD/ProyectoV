import type { IPetRepository } from '../domain/repositories/IPetRepository'

export class ListPetsUseCase {
  constructor(private repository: IPetRepository) {}

  async execute() {
    return this.repository.listPets()
  }
}
