// Importa la entidad Pet y el repositorio de Pet
import { Pet } from '../../domain/entities/Pet';
import { IPetRepository } from '../../domain/repositories/IPetRepository';

// Opcionalmente, puedes definir parámetros de filtrado
interface ListPetsRequest {
    speciesId?: string;
    size?: string;
}

export class ListPetsUseCase {

    // Inyección de Dependencia
    constructor(private petRepository: IPetRepository) {}

    /**
     * Obtiene todas las mascotas disponibles, con filtros opcionales.
     */
    async execute(request?: ListPetsRequest): Promise<Pet[]> {

        // 1. Lectura: Obtener todas las mascotas del repositorio (la infraestructura las filtra)
        // Nota: En una implementación avanzada, el repositorio recibiría los filtros
        // para optimizar la consulta a la base de datos (e.g., Supabase).
        const allPets = await this.petRepository.listPets();

        // 2. Regla de Negocio: Filtrar en el Use Case (si el repositorio no lo hizo)
        // Solo mostramos las que están 'Available' (según la lógica que definimos en la entidad Pet).
        let availablePets = allPets.filter(pet => pet.status === 'Available');

        // 3. Aplicar Filtros de la Solicitud (si existen)
        if (request?.speciesId) {
            availablePets = availablePets.filter(pet => pet.speciesId === request.speciesId);
        }
        if (request?.size) {
            availablePets = availablePets.filter(pet => pet.size === request.size);
        }

        return availablePets;
    }
}
