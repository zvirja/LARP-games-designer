export enum EntityType {
  Character,
  Goal,
  Inventory,
  Relation
}

export class Entity {
  constructor(public readonly id: number, public readonly type: EntityType, public readonly label: string) {
  }
}

// export class Character extends Entity {
//   constructor(id: number, public readonly name: string) {
//     super(id);
//   }
// }

export class Relation {
  constructor(public readonly idFrom: number, public readonly idTo: number) {
  }
}
