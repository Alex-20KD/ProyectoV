export class Pet {
  constructor(
    public id: string,
    public name: string,
    public description: string, // Descripción
    public organizationId: string, // Quién lo tiene
    public imageUrl: string, // Foto
    public speciesId: string, // ID de la especie
    public breedId: string, // ID de la raza
    public gender: string, // Género
    public age: number,
    public size: string, // Tamaño: Small, Medium, Large
    public status: 'Available' | 'PendingAdoption' | 'Adopted' = 'Available', // Estado más detallado
  ) {}

  isAdopted(): boolean {
    return this.status === 'Adopted'
  }
}
