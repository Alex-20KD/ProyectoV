// Importa la entidad User y el repositorio de User
import { User } from '../../domain/entities/User';
import { IUserRepository } from '../../domain/repositories/IUserRepository';

export class GetUserUseCase {

    // Inyección de Dependencia
    constructor(private userRepository: IUserRepository) {}

    /**
     * Obtiene un usuario por su ID único.
     */
    async execute(userId: string): Promise<User> {

        // 1. Validación: Asegurar que se proporciona un ID.
        if (!userId) {
            throw new Error('El ID de usuario es requerido.');
        }

        // 2. Lectura: Obtener el usuario del repositorio.
        const user = await this.userRepository.getById(userId);

        // 3. Regla de Negocio: Si el usuario no existe, lanzar un error.
        if (!user) {
            throw new Error(`Usuario con ID ${userId} no encontrado.`);
        }

        return user;
    }
}
