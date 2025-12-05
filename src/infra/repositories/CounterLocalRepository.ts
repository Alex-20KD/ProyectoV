import type { ICounterRepository } from '../../domain/repositories/ICounterRepository'

const STORAGE_KEY = 'app.counter'

export class CounterLocalRepository implements ICounterRepository {
  private readStorage(): number {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? Number(raw) : 0
    } catch (e) {
      return 0
    }
  }

  private writeStorage(value: number) {
    try {
      localStorage.setItem(STORAGE_KEY, String(value))
    } catch (e) {
      // ignore
    }
  }

  async getCount(): Promise<number> {
    return this.readStorage()
  }

  async increment(): Promise<number> {
    const current = this.readStorage()
    const next = current + 1
    this.writeStorage(next)
    return next
  }
}
