export enum RelationType {
  Primary,
  Auxiliary
}

export class Relation {
  constructor(
    public readonly id: number,
    public readonly type: RelationType,
    public readonly label: string,
    public readonly idFrom: number,
    public readonly idTo: number) { }
}
