import { CounterLocalRepository } from '../infra/repositories/CounterLocalRepository'
import { IncrementCounterUseCase } from '../usecases/IncrementCounterUseCase'

import { SupabaseUserRepository } from '../infra/repositories/SupabaseUserRepository'
import { SupabasePetRepository } from '../infra/repositories/SupabasePetRepository'
import { RegisterUserUseCase } from '../usecases/RegisterUserUseCase'
import { LoginUserUseCase } from '../usecases/LoginUserUseCase'
import { ListPetsUseCase } from '../usecases/ListPetsUseCase'

class Container {
  // existing counter
  public counterRepository = new CounterLocalRepository()
  public incrementCounterUseCase = new IncrementCounterUseCase(
    this.counterRepository
  )

  // Supabase-backed repositories and usecases
  public userRepository = new SupabaseUserRepository()
  public petRepository = new SupabasePetRepository()

  public registerUserUseCase = new RegisterUserUseCase(this.userRepository)
  public loginUserUseCase = new LoginUserUseCase(this.userRepository)
  public listPetsUseCase = new ListPetsUseCase(this.petRepository)
}

export const container = new Container()
