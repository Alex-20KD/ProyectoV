// Importa entidades y repositorios
import { Pet } from '../../domain/entities/Pet';
import { IPetRepository } from '../../domain/repositories/IPetRepository';
import { IUserRepository } from '../../domain/repositories/IUserRepository';

// Definición de los estados posibles para mayor seguridad
type NewStatus = 'Available' | 'PendingAdoption' | 'Adopted' | 'MedicalHold' | 'Retired';

interface ChangePetStatusRequest {
    petId: string;
    newStatus: NewStatus;
    actingUserId: string; // ID del usuario que realiza el cambio (Admin/Manager)
}

export class ChangePetStatusUseCase {

    constructor(
        private petRepository: IPetRepository,
        private userRepository: IUserRepository,
    ) {}

    async execute(request: ChangePetStatusRequest): Promise<Pet> {

        // 1. Regla de Negocio: Verificar Permisos
        const actingUser = await this.userRepository.getById(request.actingUserId);

        // Usamos el método canManageAdoptions() definido en la entidad User
        if (!actingUser || !actingUser.canManageAdoptions()) {
            throw new Error('Permiso denegado. Solo administradores pueden cambiar el estado de la mascota.');
        }

        // 2. Lectura: Obtener la mascota actual
        const petToUpdate = await this.petRepository.getPet(request.petId);

        if (!petToUpdate) {
            throw new Error(`Mascota con ID ${request.petId} no encontrada.`);
        }

        // 3. Regla de Negocio: Aplicar el cambio de estado a la entidad
        petToUpdate.status = request.newStatus;

        // Regla adicional: Si el estado es "Adopted", hay que hacer una doble comprobación (opcionalmente)
        if (request.newStatus === 'Adopted' && petToUpdate.status !== 'Adopted') {
             // Lógica compleja de negocio: podría requerir el IAdoptionApplicationRepository aquí
             // para confirmar que existe una solicitud finalizada.
        }

        // 4. Persistencia: Guardar la entidad Pet modificada
        return this.petRepository.updatePet(petToUpdate);
    }
}
