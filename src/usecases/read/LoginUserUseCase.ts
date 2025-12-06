import type { IAuthService } from '../../domain/services/IAuthService'

export class LoginUserUseCase {
  constructor(private authService: IAuthService) {}

  async execute(email: string, password: string) {
    return this.authService.login(email, password)
  }
}
