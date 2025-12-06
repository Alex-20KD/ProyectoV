// Importa las interfaces necesarias de la capa domain
import { IAuthService } from '../../domain/services/IAuthService';
import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { User, UserRole } from '../../domain/entities/User';

// Define el tipo de datos de entrada (incluyendo la contraseña para el IAuthService)
interface RegisterUserRequest {
    email: string;
    password: string; // Importante: Aquí manejamos la contraseña temporalmente
    firstName: string;
    lastName: string;
    phoneNumber: string;
    address: string;
    role: UserRole;
}

export class RegisterUserUseCase {

    constructor(
        private authService: IAuthService, // Servicio de seguridad
        private userRepository: IUserRepository // Repositorio de datos del perfil
    ) {}

    async execute(request: RegisterUserRequest): Promise<User> {

        // 1. Regla de Negocio: Validar seguridad
        if (request.password.length < 8) {
            throw new Error('La contraseña debe tener al menos 8 caracteres.');
        }

        // 2. ORQUESTACIÓN (Seguridad): Crea la cuenta de autenticación.
        // El IAuthService (Infraestructura) hashea la contraseña y devuelve el ID único.
        const newUserId = await this.authService.register(request.email, request.password);

        // 3. ORQUESTACIÓN (Datos): Crea la entidad User en la base de datos de perfiles.
        const newUserProfile = await this.userRepository.create({
            id: newUserId, // Usamos el ID generado por el Auth Service
            email: request.email,
            firstName: request.firstName,
            lastName: request.lastName,
            phoneNumber: request.phoneNumber,
            address: request.address,
            role: request.role,
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        return newUserProfile;
    }
}
