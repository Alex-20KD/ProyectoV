export interface ICounterRepository {
  getCount(): Promise<number>
  increment(): Promise<number>
}
