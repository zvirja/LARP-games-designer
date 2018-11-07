import { Omit, Mutable } from "../utils/type";

export enum EntityType {
  Character,
  Goal,
  Inventory,
  Relation
}

export class Entity {
  constructor(public readonly id: number, public readonly type: EntityType, public readonly label: string, public readonly description?: string) { }
}

export type EntityUpdate = Omit<Partial<Mutable<Entity>>, 'id' | 'type'>
