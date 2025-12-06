import { supabase } from '../supabase/client'
import type { IUserRepository } from '../../domain/repositories/IUserRepository'
import type { User, UserRole } from '../../domain/entities/User'

export class SupabaseUserRepository implements IUserRepository {
  async getById(id: string): Promise<User | null> {
    const { data, error } = await supabase.from('profiles').select('*').eq('id', id).single()
    if (error) return null
    return this.mapToEntity(data)
  }

  async listUsers(role?: UserRole): Promise<User[]> {
    let query = supabase.from('profiles').select('*')
    if (role) {
      query = query.eq('role', role)
    }
    const { data, error } = await supabase.from('profiles').select('*')
    if (error) throw error
    return (data || []).map((d) => this.mapToEntity(d))
  }

  async create(data: Omit<User, 'createdAt' | 'updatedAt' | 'id'> & { id: string }): Promise<User> {
    // Nota: Supabase Auth crea el ID, así que lo pasamos aquí para crear el perfil
    const dbData = {
      id: data.id,
      email: data.email,
      first_name: data.firstName,
      last_name: data.lastName,
      phone_number: data.phoneNumber,
      address: data.address,
      role: data.role,
      is_active: data.isActive,
      organization_id: data.organizationId,
    }
    const { data: created, error } = await supabase
      .from('profiles')
      .insert(dbData)
      .select()
      .single()
    if (error) throw error
    return this.mapToEntity(created)
  }

  async update(user: User): Promise<User> {
    const dbData = {
      first_name: user.firstName,
      last_name: user.lastName,
      phone_number: user.phoneNumber,
      address: user.address,
      role: user.role,
      is_active: user.isActive,
      organization_id: user.organizationId,
      updated_at: new Date(),
    }
    const { data, error } = await supabase
      .from('profiles')
      .update(dbData)
      .eq('id', user.id)
      .select()
      .single()
    if (error) throw error
    return this.mapToEntity(data)
  }

  async delete(id: string): Promise<void> {
    const { error } = await supabase.from('profiles').delete().eq('id', id)
    if (error) throw error
  }

  private mapToEntity(data: any): User {
    return {
      id: data.id,
      email: data.email,
      firstName: data.first_name,
      lastName: data.last_name,
      phoneNumber: data.phone_number,
      address: data.address,
      role: data.role as UserRole,
      isActive: data.is_active,
      organizationId: data.organization_id,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
      // Métodos de la clase User se pierden al mapear así, 
      // idealmente deberíamos instanciar `new User(...)`
      // pero por ahora mantenemos la estructura de datos.
      // Para recuperar los métodos:
      canManageAdoptions: () =>
        data.role === 'Admin' || data.role === 'ShelterManager',
      isAdopter: () => data.role === 'Adopter',
    } as User
  }
}

