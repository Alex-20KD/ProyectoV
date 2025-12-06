// Importa las entidades y repositorios necesarios
import { AdoptionApplication } from '../domain/entities/AdoptionApplication';
import { IAdoptionApplicationRepository } from '../domain/repositories/IAdoptionApplicationRepository';
import { IUserRepository } from '../domain/repositories/IUserRepository';
import { IPetRepository } from '../domain/repositories/IPetRepository';

// Define el tipo de datos que recibe el Use Case (Input DTO)
interface SubmitApplicationRequest {
    adopterUserId: string;
    petId: string;
    housingType: 'Apartment' | 'House';
    hasOtherPets: boolean;
    livingSituation: string;
    petExperience: string;
    // ... más campos del formulario ...
}

export class SubmitAdoptionApplicationUseCase {

    constructor(
        private applicationRepository: IAdoptionApplicationRepository,
        private userRepository: IUserRepository,
        private petRepository: IPetRepository, // Inyección del repositorio de mascotas
    ) {}

    async execute(request: SubmitApplicationRequest): Promise<AdoptionApplication> {

        // 1. Regla de Negocio: Validar que el usuario que solicita exista y sea un Adoptante.
        const user = await this.userRepository.getById(request.adopterUserId);

        if (!user || user.role !== 'Adopter') {
            throw new Error('Solo los usuarios con rol de Adoptante pueden enviar solicitudes.');
        }

        // 2. Regla de Negocio: Verificar que la mascota esté disponible.
        const pet = await this.petRepository.getPet(request.petId);

        // Usamos la propiedad 'status' que definimos en la entidad Pet
        if (!pet || pet.status !== 'Available') {
            throw new Error('Esta mascota no está disponible para adopción en este momento.');
        }

        // 3. Regla de Negocio: Crear la Entidad de la Solicitud.
        // Nota: En un proyecto real, usarías una biblioteca como 'uuid' para generar el ID.
        const newApplication = new AdoptionApplication(
            `app-${Date.now()}`, // ID temporal generado
            request.petId,
            request.adopterUserId,
            'Submitted' as ApplicationStatus, // Estado inicial
            new Date(), // submittedDate
            new Date(), // lastUpdateDate
            request.housingType,
            request.hasOtherPets,
            request.livingSituation,
            request.petExperience,
            // reviewerUserId y rejectionReason se dejan indefinidos
        );

        // 4. Persistencia: Usar el repositorio para guardar la solicitud.
        const savedApplication = await this.applicationRepository.save(newApplication);

        // Opcional: Una regla de negocio secundaria podría ser:
        // pet.status = 'PendingAdoption';
        // await this.petRepository.updatePet(pet);
        // Esta acción se suele hacer en el Use Case de Aprobación, no aquí.

        return savedApplication;
    }
}
