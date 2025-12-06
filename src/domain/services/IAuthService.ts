export interface IAuthService {
  /**
   * Registra un usuario en el sistema de autenticación (Supabase Auth).
   * @param email El correo electrónico del usuario.
   * @param password La contraseña (texto plano, el servicio se encarga de encriptar).
   * @returns Una promesa con el ID único (UUID) generado por el sistema de autenticación.
   */
  register(email: string, password: string): Promise<string>

  /**
   * Inicia sesión con las credenciales proporcionadas.
   * @param email El correo electrónico.
   * @param password La contraseña.
   * @returns Una promesa con el ID del usuario autenticado si es exitoso.
   */
  login(email: string, password: string): Promise<string>

  /**
   * Cierra la sesión activa del usuario.
   */
  logout(): Promise<void>

  /**
   * Verifica si hay un usuario logueado actualmente (útil para recargar la página).
   * @returns El ID del usuario si está logueado, o null si no lo está.
   */
  getCurrentUserId(): Promise<string | null>
}
