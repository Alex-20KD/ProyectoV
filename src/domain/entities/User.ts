// Define los roles posibles que un usuario puede tener en el sistema
export type UserRole = 'Adopter' | 'Admin' | 'ShelterManager'

export class User {
  constructor(
    // Identificación y Core
    public id: string,
    public email: string,

    // Datos Personales y de Contacto (Necesarios para la adopción)
    public firstName: string,
    public lastName: string,
    public phoneNumber: string,
    public address: string, // Dirección donde vive el adoptante (crucial)

    // Roles y Permisos (Regla de Negocio)
    public role: UserRole,
    public isActive: boolean = true, // Para cuentas activas/suspendidas

    // Vínculos (Opcional, basado en el rol)
    // El ID de la organización si el usuario es un 'ShelterManager'
    public organizationId?: string | null,

    // Fechas de Auditoría
    public createdAt: Date = new Date(), // ASIGNAR VALOR POR DEFECTO
    public updatedAt: Date = new Date(), // ASIGNAR VALOR POR DEFECTO
  ) {}

  // Métodos que encapsulan la lógica de negocio del usuario

  /**
   * Determina si el usuario tiene permisos de alto nivel para aprobar/gestionar.
   */
  canManageAdoptions(): boolean {
    return this.role === 'Admin' || this.role === 'ShelterManager'
  }

  /**
   * Determina si el usuario solo puede solicitar adopciones.
   */
  isAdopter(): boolean {
    return this.role === 'Adopter'
  }
}
