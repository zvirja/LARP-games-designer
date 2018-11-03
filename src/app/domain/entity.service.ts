import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Entity, EntityType } from "./entity";
import { Relation, RelationType } from "./relation";

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

@Injectable({ providedIn: 'root' })
export class EntityService {
  private _idCounter = 0;

  private _entities$ = new BehaviorSubject<Entity[]>([
    // Chars
    new Entity(this._idCounter++, EntityType.Character, 'Alex'),
    new Entity(this._idCounter++, EntityType.Character, 'Olga'),
    new Entity(this._idCounter++, EntityType.Character, 'Afen'),

    // Goals
    new Entity(this._idCounter++, EntityType.Goal, 'Find the heaven'),
    new Entity(this._idCounter++, EntityType.Goal, 'Destroy the world'),
    new Entity(this._idCounter++, EntityType.Goal, 'Find a cup of tea'),

    // Inventory
    new Entity(this._idCounter++, EntityType.Inventory, 'Knife'),
    new Entity(this._idCounter++, EntityType.Inventory, 'Pen'),
    new Entity(this._idCounter++, EntityType.Inventory, 'Teapot'),
  ]);
  get entities$(): Observable<ReadonlyArray<Entity>> {
    return this._entities$.asObservable();
  }
  private get entities() {
    return this._entities$.value;
  }

  private _relations$ = new BehaviorSubject<Relation[]>([]);
  get relations$() {
    return this._relations$.asObservable();
  }
  private get relations() {
    return this._relations$.value;
  }

  findEntityById(id: number) {
    const index = this.entities.findIndex(x => x.id === id);
    if (index === -1) {
      return null;
    }

    return this.entities[index];
  }

  createEntity(type: EntityType, label: string) {
    const newEntity = new Entity(this._idCounter++, type, label);
    this._entities$.next([...this.entities, newEntity])
    return newEntity;
  }

  deleteEntityWithRelations(id: number) {
    const index = this.entities.findIndex(v => v.id === id);
    if (index === -1) {
      return false;
    }

    const newEntities = [...this.entities];
    newEntities.splice(index, 1);
    this._entities$.next(newEntities);

    // Remove all the relations related to the current entity.
    const newRelations = this.relations.filter(x => x.idFrom !== id && x.idTo !== id);
    if (newRelations.length !== this.relations.length) {
      this._relations$.next(newRelations);
    }

    return true;
  }

  updateEntity(id: number, newValues: Omit<Partial<Entity>, 'id' | 'type'>) {
    const index = this.entities.findIndex(x => x.id === id);
    if (index < 0) {
      throw new Error(`Unable to find char by id: ${id}`);
    }

    const entity = this.entities[index];
    const newProps = {
      ...entity,
      ...newValues
    }
    const newChar = new Entity(entity.id, entity.type, newProps.label);
    let copy = [...this.entities];
    copy[index] = newChar;
    this._entities$.next(copy)
  }

  addRelation(type: RelationType, label: string, idFrom: number, idTo: number) {
    this.assertEntityExists(idFrom);
    this.assertEntityExists(idTo);

    const relation = new Relation(this._idCounter++, type, label, idFrom, idTo)
    this._relations$.next([...this.relations, relation])

    return relation;
  }

  deleteRelation(relationId: number) {
    const index = this.relations.findIndex(x => x.id === relationId);
    if (!index) {
      return false;
    }

    const newRelations = [...this.relations];
    newRelations.splice(index, 1);
    this._relations$.next(newRelations);

    return true;
  }

  findAllRelatedEntities(entityId: number) {
    this.assertEntityExists(entityId);

    const result = this.relations
      .reduce((memo, r) => {
        if (r.idFrom === entityId) {
          memo.add(r.idTo)
        }

        if (r.idTo === entityId) {
          memo.add(r.idFrom)
        }

        return memo;
      }, new Set<number>());

    return Array.from(result)
      .map(id => this.findEntityById(id))
      .filter((x): x is Entity => !!x);
  }

  private assertEntityExists(id: number) {
    if (!this.findEntityById(id)) {
      throw new Error(`Entity with id ${id} does not exist.`)
    }
  }
}
