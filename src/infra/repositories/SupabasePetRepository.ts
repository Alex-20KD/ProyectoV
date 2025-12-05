import { supabase } from '../supabase/client'
import type { IPetRepository } from '../../domain/repositories/IPetRepository'
import type { Pet } from '../../domain/entities/Pet'

export class SupabasePetRepository implements IPetRepository {
  async listPets(): Promise<Pet[]> {
    const { data, error } = await supabase.from('pets').select('*')
    if (error) throw error
    return (data ?? []) as Pet[]
  }

  async getPet(id: string): Promise<Pet | null> {
    const { data, error } = await supabase.from('pets').select('*').eq('id', id).single()
    if (error) return null
    return data as Pet
  }

  async createPet(dataIn: Partial<Pet>): Promise<Pet> {
    const { data, error } = await supabase.from('pets').insert([dataIn]).select().single()
    if (error) throw error
    return data as Pet
  }

  async adoptPet(petId: string, userId: string): Promise<boolean> {
    const { error } = await supabase.from('pets').update({ adopted: true, owner_id: userId }).eq('id', petId)
    return !error
  }
}
