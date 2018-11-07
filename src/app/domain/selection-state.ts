import { Relation } from "./relation";

export class SelectionState {
  constructor(private readonly _selection: ReadonlySet<number>, private readonly _relations: ReadonlyArray<Relation>) { }

  private _cachedSelectedRelations?: Set<number>;

  isEntitySelected(id: number) {
    return this._selection.has(id);
  }

  isRelationSelected(id: number) {
    if (!this._cachedSelectedRelations) {
      const selectedRelations = this._relations
        .filter(r => this.isEntitySelected(r.entities[0]) && this.isEntitySelected(r.entities[1]))
        .map(r => r.id);

      this._cachedSelectedRelations = new Set(selectedRelations);
    }

    return this._cachedSelectedRelations.has(id);
  }
}
