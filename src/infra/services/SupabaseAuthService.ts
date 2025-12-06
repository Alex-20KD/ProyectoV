import { supabase } from '../supabase/client'
import type { IAuthService } from '../../domain/services/IAuthService'

export class SupabaseAuthService implements IAuthService {
  async login(email: string, password: string): Promise<string> {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    const user = data.user
    if (!user) throw new Error('No user returned after login')
    return user.id
  }

  async register(email: string, password: string): Promise<string> {
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) throw error
    const user = data.user
    if (!user) throw new Error('No user returned after register')
    return user.id
  }

  async getCurrentUserId(): Promise<string | null> {
    const {
      data: { session },
    } = await supabase.auth.getSession()
    if (!session?.user) return null
    return session.user.id
  }

  async logout(): Promise<void> {
    await supabase.auth.signOut()
  }
}

