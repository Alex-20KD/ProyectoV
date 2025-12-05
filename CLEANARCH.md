# Clean Architecture - Project Scaffold

Esta carpeta muestra un ejemplo mínimo para aplicar Clean Architecture en este proyecto Vue + Pinia.

Capas y propósito
- `src/domain`: Entidades y contratos (interfaces) que representan el núcleo independiente de frameworks.
- `src/usecases`: Casos de uso (aplicación) que implementan la lógica de negocio usando interfaces del dominio.
- `src/infra`: Implementaciones concretas (repositorios, adaptadores) que dependen de las abstracciones del dominio.
- `src/di`: Contenedor simple para inyectar dependencias concretas en adaptadores/presentation.

Ejemplo implementado
- `Counter` entity
- `ICounterRepository` interface
- `CounterLocalRepository` que persiste en `localStorage`
- `IncrementCounterUseCase` que encapsula la lógica de incremento
- `src/stores/counter.ts` refactorizado para usar el use case vía el contenedor DI

Cómo usar
1. En cualquier componente, importa el store normal: `useCounterStore()` y usa `count` y `increment()`.
2. Para añadir una nueva feature: crear la entidad en `domain`, la interfaz de repositorio, el caso de uso en `usecases` y una implementación concreta en `infra`. Registrar en `di/container.ts`.

Notas
- Este es un scaffold ligero pensado para aplicaciones cliente. Para apps más complejas puedes usar un contenedor DI más robusto.

Supabase integration
- Install the client library: `npm install @supabase/supabase-js`
- Add environment variables in a `.env` file at project root (Vite):
	- `VITE_SUPABASE_URL=https://your-project.supabase.co`
	- `VITE_SUPABASE_ANON_KEY=your-anon-key`
- The project includes `src/infra/supabase/client.ts` which reads `import.meta.env.VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
- Repositories: `SupabaseUserRepository`, `SupabasePetRepository` that map domain repository interfaces to Supabase calls.

Quick start for Supabase features
1. Create the `pets` table in Supabase with fields like `id`, `name`, `species`, `age`, `adopted`, `owner_id`.
2. Start the dev server: `npm run dev` and open the `PetsView` at `/pets` (add a route if needed).
