export class Pet {
  constructor(
    public id: string,
    public name: string,
    public species: string,
    public age?: number,
    public adopted: boolean = false
  ) {}
}
