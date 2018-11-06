import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Entity, EntityType, EntityUpdate } from "./entity";
import { Relation, RelationType, RelationUpdate } from "./relation";
import { filter, map } from "rxjs/operators";
import * as _ from 'lodash';

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

  private _relations$ = new BehaviorSubject<Relation[]>([
    new Relation(this._idCounter++, RelationType.Primary, 'Loves', [0, 1]),
    new Relation(this._idCounter++, RelationType.Auxiliary, 'Wants', [0, 2]),
    new Relation(this._idCounter++, RelationType.Auxiliary, 'Dream', [0, 4])
  ]);
  get relations$() {
    return this._relations$.asObservable();
  }
  private get relations() {
    return this._relations$.value;
  }

  findEntityById(id: number): Entity | undefined {
    return _.find(this.entities, { id });
  }

  watchEntityById(id: number): Observable<Entity | undefined> {
    return this.entities$.pipe(
      map(values => _.find(values, { id }))
    )
  }

  createEntity(type: EntityType, label: string, description?: string) {
    const newEntity = new Entity(this._idCounter++, type, label, description);
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
    const newRelations = this.relations.filter(x => x.entities[0] !== id && x.entities[1] !== id);
    if (newRelations.length !== this.relations.length) {
      this._relations$.next(newRelations);
    }

    return true;
  }

  updateEntity(id: number, newValues: EntityUpdate) {
    const index = this.entities.findIndex(x => x.id === id);
    if (index < 0) {
      throw new Error(`Unable to find char by id: ${id}`);
    }

    const entity = this.entities[index];
    const newProps = {
      ...entity,
      ...newValues
    }
    const newChar = new Entity(entity.id, entity.type, newProps.label, newProps.description);
    let copy = [...this.entities];
    copy[index] = newChar;
    this._entities$.next(copy)
  }

  addRelation(type: RelationType, label: string, entities: [number, number]) {
    this.assertEntityExists(entities[0]);
    this.assertEntityExists(entities[1]);

    const relation = new Relation(this._idCounter++, type, label, entities)
    this._relations$.next([...this.relations, relation])

    return relation;
  }

  deleteRelation(relationId: number) {
    this._relations$.next(this.relations.filter(r => r.id !== relationId));
  }

  updateRelation(relationId: number, update: RelationUpdate) {
    const relationIndex = this.relations.findIndex(x => x.id === relationId);
    if (relationIndex < 0) {
      throw new Error(`Unable to find relation by id ${relationId}.`)
    }

    if (update.entities) {
      this.assertEntityExists(update.entities[0]);
      this.assertEntityExists(update.entities[1]);
    }

    const relation = this.relations[relationIndex];
    const newProperties = {
      ...relation,
      ...update
    }
    const newRelation = new Relation(relation.id, newProperties.type, newProperties.label, newProperties.entities);

    let copy = [...this.relations];
    copy[relationIndex] = newRelation;
    this._relations$.next(copy);
  }

  findAllRelatedEntities(entityId: number) {
    this.assertEntityExists(entityId);

    const result = this.relations
      .reduce((memo, r) => {
        if (r.entities[0] === entityId) {
          memo.add(r.entities[1])
        }

        if (r.entities[1] === entityId) {
          memo.add(r.entities[0])
        }

        return memo;
      }, new Set<number>());

    return Array.from(result)
      .map(id => this.findEntityById(id))
      .filter((x): x is Entity => !!x);
  }

  getAllEntityRelations(entityId: number) {
    this.assertEntityExists(entityId);

    return this.relations.filter(r => r.entities[0] === entityId || r.entities[1] === entityId);
  }

  private assertEntityExists(id: number) {
    if (!this.findEntityById(id)) {
      throw new Error(`Entity with id ${id} does not exist.`)
    }
  }
}
