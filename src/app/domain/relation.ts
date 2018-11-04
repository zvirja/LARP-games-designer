type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export enum RelationType {
  Primary,
  Auxiliary
}

export class Relation {
  constructor(
    public readonly id: number,
    public readonly type: RelationType,
    public readonly label: string,
    public readonly entities: Readonly<[number, number]>) { }
}

export type RelationUpdate = Omit<Partial<Relation>, 'id'>
