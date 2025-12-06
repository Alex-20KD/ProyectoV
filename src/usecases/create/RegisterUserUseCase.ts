import type { IUserRepository } from '../../domain/repositories/IUserRepository'
import type { IAuthService } from '../../domain/services/IAuthService'
import type { User, UserRole } from '../../domain/entities/User'

export interface RegisterUserRequest {
  email: string
  password: string
  firstName: string
  lastName: string
  phoneNumber: string
  address: string
  role: UserRole
}

export class RegisterUserUseCase {
  constructor(
    private authService: IAuthService,
    private userRepository: IUserRepository
  ) {}

  async execute(request: RegisterUserRequest): Promise<User> {
    // 1. Crear cuenta de autenticación
    const userId = await this.authService.register(request.email, request.password)

    // 2. Crear perfil de usuario
    const userProfile = await this.userRepository.create({
      id: userId,
      email: request.email,
      firstName: request.firstName,
      lastName: request.lastName,
      phoneNumber: request.phoneNumber,
      address: request.address,
      role: request.role,
      isActive: true,
      organizationId: null
    })

    return userProfile
  }
}

