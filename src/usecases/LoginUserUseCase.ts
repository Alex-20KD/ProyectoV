import type { IUserRepository } from '../domain/repositories/IUserRepository'

export class LoginUserUseCase {
  constructor(private repository: IUserRepository) {}

  async execute(email: string, password: string) {
    return this.repository.login(email, password)
  }
}
