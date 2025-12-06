// Importar la Entidad y el Tipo de Estado que acabas de crear
import type { AdoptionApplication, ApplicationStatus } from '../entities/AdoptionApplication';

export interface IAdoptionApplicationRepository {
  /**
   * Guarda una nueva solicitud de adopción en la base de datos.
   * Usado por el 'SubmitApplicationUseCase'.
   */
  save(application: AdoptionApplication): Promise<AdoptionApplication>;

  /**
   * Obtiene una solicitud específica por su ID.
   */
  getById(id: string): Promise<AdoptionApplication | null>;

  /**
   * Lista todas las solicitudes, con opción de filtrar por estado.
   * Usado por el 'ListApplicationsUseCase' para el panel del Admin.
   */
  list(status?: ApplicationStatus): Promise<AdoptionApplication[]>;

  /**
   * Actualiza el estado de la solicitud.
   * Usado por el 'ApproveApplicationUseCase' o 'RejectApplicationUseCase'.
   */
  updateStatus(id: string, newStatus: ApplicationStatus): Promise<AdoptionApplication | null>;

  /**
   * Busca solicitudes de un usuario específico.
   * Usado por el 'GetUserApplicationsUseCase' para el historial del Adoptante.
   */
  getByUserId(userId: string): Promise<AdoptionApplication[]>;
}
