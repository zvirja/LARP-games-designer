export enum EntityType {
  Character,
  Goal,
  Inventory,
  Relation
}

export class Entity {
  constructor(public readonly id: number, public readonly type: EntityType, public readonly label: string) { }
}
