// Archivo: domain/repositories/IUserRepository.ts

import type { User } from '../entities/User'
import type { UserRole } from '../entities/User' // Importamos el tipo de rol si lo definiste en la entidad

export interface IUserRepository {
  /**
   * Obtiene un usuario por su ID.
   * Este es el método que usarán los Casos de Uso (Use Cases) después
   * de que el servicio de autenticación (IAuthService) haya identificado al usuario.
   */
  getById(id: string): Promise<User | null>

  /**
   * Obtiene una lista de usuarios.
   * Es esencial para la vista de Administración.
   */
  listUsers(role?: UserRole): Promise<User[]>

  /**
   * Crea el perfil de usuario.
   * Es llamado por el 'RegisterUserUseCase' DESPUÉS de que el IAuthService ha creado la cuenta de seguridad.
   * Recibe el ID del servicio de autenticación.
   */
  create(
    data: Omit<User, 'createdAt' | 'updatedAt' | 'canManageAdoptions' | 'isAdopter'>,
  ): Promise<User>

  /**
   * Actualiza los datos no sensibles del perfil (nombre, teléfono, dirección, rol).
   * Usado por el 'UpdateProfileUseCase' y 'ChangeUserRoleUseCase'.
   */
  update(user: User): Promise<User>

  /**
   * Elimina un usuario.
   * Es una función de administración.
   */
  delete(id: string): Promise<void>
}
