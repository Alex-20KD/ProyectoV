import { SupabaseUserRepository } from '../infra/repositories/SupabaseUserRepository'
import { SupabasePetRepository } from '../infra/repositories/SupabasePetRepository'
import { SupabaseAuthService } from '../infra/services/SupabaseAuthService'

import { RegisterUserUseCase } from '../usecases/create/RegisterUserUseCase'
import { LoginUserUseCase } from '../usecases/read/LoginUserUseCase'
import { ListPetsUseCase } from '../usecases/read/ListPetsUseCase'
import { CreatePetUseCase } from '../usecases/create/CreatePetUseCase'

class Container {
  // Services & Repositories
  public authService = new SupabaseAuthService()
  public userRepository = new SupabaseUserRepository()
  public petRepository = new SupabasePetRepository()

  // Use Cases
  public registerUserUseCase = new RegisterUserUseCase(this.authService, this.userRepository)
  public loginUserUseCase = new LoginUserUseCase(this.authService)
  public listPetsUseCase = new ListPetsUseCase(this.petRepository)
  public createPetUseCase = new CreatePetUseCase(this.petRepository)
}

export const container = new Container()

