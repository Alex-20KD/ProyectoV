// Define los posibles estados de una solicitud, crucial para el administrador.
export type ApplicationStatus =
  | 'Submitted' // Enviada, en cola para revisión
  | 'UnderReview' // Si un Manager/Admin la ha tomado para revisar
  | 'Approved' // Aprobada, el siguiente paso es el contacto y la entrega
  | 'Rejected' // Rechazada
  | 'Completed' // Adopción finalizada (Pet.status debe ser 'Adopted')

export class AdoptionApplication {
  constructor(
    // 1. Identificación y Vínculos (quién solicitó y qué)
    public id: string,
    public petId: string, // El ID de la mascota solicitada
    public adopterUserId: string, // El ID del usuario adoptante

    // 2. Estado y Fechas (la columna vertebral del proceso)
    public status: ApplicationStatus = 'Submitted', // Estado actual de la solicitud
    public submittedDate: Date,
    public lastUpdateDate: Date,

    // 3. Respuestas al Formulario (Datos cruciales para la toma de decisiones)
    // Estos campos reemplazan el formulario de adopción en papel.
    public housingType: 'Apartment' | 'House', // ¿Vive en casa o apartamento?
    public hasOtherPets: boolean,
    public livingSituation: string, // Detalle de la situación de vida (ej. "Tengo 2 niños", "Vivo solo")
    public petExperience: string, // Experiencia previa con mascotas

    // 4. Revisión y Auditoría (Usado por el Admin/Manager)
    public reviewerUserId?: string, // El ID del Admin/Manager que tomó la última acción
    public rejectionReason?: string, // Razón si fue rechazada
  ) {}

  // Lógica de Negocio (Para usar en Use Cases)

  isFinalized(): boolean {
    return this.status === 'Rejected' || this.status === 'Completed'
  }

  isReadyForReview(): boolean {
    return this.status === 'Submitted'
  }
}
