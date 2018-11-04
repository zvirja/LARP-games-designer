type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export enum EntityType {
  Character,
  Goal,
  Inventory,
  Relation
}

export class Entity {
  constructor(public readonly id: number, public readonly type: EntityType, public readonly label: string) { }
}

export type EntityUpdate = Omit<Partial<Entity>, 'id' | 'type'>
