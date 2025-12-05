import type { IUserRepository } from '../domain/repositories/IUserRepository'

export class RegisterUserUseCase {
  constructor(private repository: IUserRepository) {}

  async execute(email: string, password: string) {
    return this.repository.register(email, password)
  }
}
