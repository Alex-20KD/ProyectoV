// Importa la entidad User y el repositorio de User
import { User } from '../../domain/entities/User';
import { IUserRepository } from '../../domain/repositories/IUserRepository';

// Define los campos que el usuario puede actualizar
interface UpdateUserRequest {
    userId: string; // El ID del usuario cuyo perfil se va a actualizar
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    address?: string;
    // El email y el rol NO se actualizan aquí; eso requeriría otros Casos de Uso
}

export class UpdateUserProfileUseCase {

    constructor(private userRepository: IUserRepository) {}

    async execute(request: UpdateUserRequest): Promise<User> {

        // 1. Lectura: Obtener el usuario actual para modificarlo
        const existingUser = await this.userRepository.getById(request.userId);

        if (!existingUser) {
            throw new Error(`Usuario con ID ${request.userId} no encontrado.`);
        }

        // 2. Regla de Negocio: Aplicar los cambios a la entidad
        // Solo actualizamos los campos que se proporcionaron en la solicitud
        existingUser.firstName = request.firstName ?? existingUser.firstName;
        existingUser.lastName = request.lastName ?? existingUser.lastName;
        existingUser.phoneNumber = request.phoneNumber ?? existingUser.phoneNumber;
        existingUser.address = request.address ?? existingUser.address;
        existingUser.updatedAt = new Date(); // Actualizamos la fecha de modificación

        // 3. Persistencia: Llamar al repositorio para guardar la entidad modificada
        return this.userRepository.update(existingUser);
    }
}
