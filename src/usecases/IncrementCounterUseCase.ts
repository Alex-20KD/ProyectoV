import type { ICounterRepository } from '../domain/repositories/ICounterRepository'

export class IncrementCounterUseCase {
  constructor(private repository: ICounterRepository) {}

  async execute(): Promise<number> {
    return this.repository.increment()
  }
}
