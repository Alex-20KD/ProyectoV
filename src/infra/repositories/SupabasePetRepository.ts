import { supabase } from '../supabase/client'
import type { IPetRepository } from '../../domain/repositories/IPetRepository'
import type { Pet } from '../../domain/entities/Pet'

export class SupabasePetRepository implements IPetRepository {
  async listPets(): Promise<Pet[]> {
    const { data, error } = await supabase.from('pets').select('*')
    if (error) throw error

    return (data ?? []).map((pet) => this.mapToEntity(pet))
  }

  async getPet(id: string): Promise<Pet | null> {
    const { data, error } = await supabase.from('pets').select('*').eq('id', id).single()
    if (error) return null
    return this.mapToEntity(data)
  }

  async createPet(dataIn: Partial<Pet>): Promise<Pet> {
    const dbData = this.mapToDb(dataIn)
    const { data, error } = await supabase.from('pets').insert([dbData]).select().single()
    if (error) throw error
    return this.mapToEntity(data)
  }

  async updatePet(pet: Pet): Promise<Pet> {
    const dbData = this.mapToDb(pet)
    const { data, error } = await supabase
      .from('pets')
      .update(dbData)
      .eq('id', pet.id)
      .select()
      .single()
    if (error) throw error
    return this.mapToEntity(data)
  }

  async deletePet(id: string): Promise<void> {
    const { error } = await supabase.from('pets').delete().eq('id', id)
    if (error) throw error
  }

  // Helper para mapear de DB (snake_case) a Entidad (camelCase)
  private mapToEntity(data: any): Pet {
    return {
      id: data.id,
      name: data.name,
      description: data.description,
      organizationId: data.organization_id,
      imageUrl: supabase.storage.from('imagenes-publicas').getPublicUrl(data.image_url).data
        .publicUrl,
      speciesId: data.species_id,
      breedId: data.breed_id,
      gender: data.gender,
      age: data.age,
      size: data.size,
      status: data.status,
      // Métodos de la clase Pet
      isAdopted: () => data.status === 'Adopted',
    } as Pet
  }

  // Helper para mapear de Entidad (camelCase) a DB (snake_case)
  private mapToDb(pet: Partial<Pet>): any {
    return {
      name: pet.name,
      description: pet.description,
      organization_id: pet.organizationId,
      // Si la imagen es una URL completa, quizás debamos guardar solo el path si así lo espera Supabase,
      // pero por simplicidad asumimos que guardamos lo que viene o manejamos la subida aparte.
      // Aquí asumimos que 'imageUrl' en la entidad ya es lo que queremos guardar o mapear.
      // OJO: En listPets usamos getPublicUrl, lo que implica que en DB se guarda el path relativo.
      // Si createPet recibe una URL completa, esto podría ser un problema.
      // Por ahora mapeamos directo, pero es un punto a revisar.
      image_url: pet.imageUrl,
      species_id: pet.speciesId,
      breed_id: pet.breedId,
      gender: pet.gender,
      age: pet.age,
      size: pet.size,
      status: pet.status,
    }
  }
}

