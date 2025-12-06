// Importa la entidad Pet y el repositorio de Pet
import { Pet } from '../../domain/entities/Pet';
import { IPetRepository } from '../../domain/repositories/IPetRepository';

// Define el tipo de datos de entrada (Input DTO) que el Use Case necesita
interface CreatePetRequest {
    name: string;
    description: string;
    speciesId: string;
    breedId: string;
    gender: string;
    age: number;
    size: string;
    organizationId: string;
    imageUrl: string;
}

export class CreatePetUseCase {

    constructor(private petRepository: IPetRepository) {}

    async execute(request: CreatePetRequest): Promise<Pet> {

        // 1. Regla de Negocio: Validar datos esenciales
        if (!request.name || !request.speciesId || !request.organizationId) {
            throw new Error('El nombre, especie y organización son campos requeridos.');
        }

        // 2. Creación de la entidad (el ID se generará en la infraestructura,
        // por eso usamos Partial<Pet> o un objeto sin ID, o simplemente se puede asignar un nuevo GUID aquí)

        // En este ejemplo, pasamos un objeto sin ID para que el repositorio (infraestructura) lo asigne.
        const newPetData: Partial<Pet> = {
            name: request.name,
            description: request.description,
            speciesId: request.speciesId,
            breedId: request.breedId,
            gender: request.gender,
            age: request.age,
            size: request.size,
            organizationId: request.organizationId,
            imageUrl: request.imageUrl,
            status: 'Available', // Regla: toda mascota creada inicialmente está 'Available'
        };

        // 3. Persistencia: Llama a la interfaz del repositorio
        return this.petRepository.createPet(newPetData);
    }
}
