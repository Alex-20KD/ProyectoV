import { supabase } from '../supabase/client'
import type { IUserRepository } from '../../domain/repositories/IUserRepository'
import type { User } from '../../domain/entities/User'

export class SupabaseUserRepository implements IUserRepository {
  async register(email: string, password: string): Promise<User> {
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) throw error
    const user = data?.user
    return { id: user?.id ?? '', email: user?.email ?? '' }
  }

  async login(email: string, password: string): Promise<User> {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    const user = data?.user
    return { id: user?.id ?? '', email: user?.email ?? '' }
  }

  async getCurrentUser(): Promise<User | null> {
    const { data } = await supabase.auth.getUser()
    const user = data?.user
    if (!user) return null
    return { id: user.id, email: user.email ?? '' }
  }
}
