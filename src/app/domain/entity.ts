import { Omit, Mutable } from "../utils/type";

export enum EntityType {
  Character,
  Goal,
  Inventory
}

export class Entity {
  static getDiff(before: Readonly<Entity>, after: Readonly<Entity>): EntityUpdate | undefined {
    let update: EntityUpdate = {};

    if (before.label !== after.label) {
      update.label = after.label;
    }

    if (before.description !== after.description) {
      update.description = after.description;
    }

    if (Object.keys(update).length > 0) {
      return update;
    }

    return undefined;
  }

  constructor(public readonly id: number, public readonly type: EntityType, public readonly label: string, public readonly description?: string) { }
}

export type EntityUpdate = Omit<Partial<Mutable<Entity>>, 'id' | 'type'>
