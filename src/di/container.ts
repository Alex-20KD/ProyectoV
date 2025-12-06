import { SupabaseUserRepository } from '../infra/repositories/SupabaseUserRepository'
import { SupabasePetRepository } from '../infra/repositories/SupabasePetRepository'
import { RegisterUserUseCase } from '../usecases/RegisterUserUseCase'
import { LoginUserUseCase } from '../usecases/LoginUserUseCase'
import { ListPetsUseCase } from '../usecases/ListPetsUseCase'

class Container {
  // Supabase-backed repositories and usecases
  public userRepository = new SupabaseUserRepository()
  public petRepository = new SupabasePetRepository()

  public registerUserUseCase = new RegisterUserUseCase(this.userRepository)
  public loginUserUseCase = new LoginUserUseCase(this.userRepository)
  public listPetsUseCase = new ListPetsUseCase(this.petRepository)
}

export const container = new Container()
