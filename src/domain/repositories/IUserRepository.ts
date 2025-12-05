import type { User } from '../entities/User'

export interface IUserRepository {
  register(email: string, password: string): Promise<User>
  login(email: string, password: string): Promise<User>
  getCurrentUser(): Promise<User | null>
}
