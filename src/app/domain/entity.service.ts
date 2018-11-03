import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Entity, EntityType } from "./entity";

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

@Injectable({ providedIn: 'root' })
export class EntityService {
  private _idCounter = 0;

  private _entities$ = new BehaviorSubject<Entity[]>([
    new Entity(1, EntityType.Character, 'Alex'),
    new Entity(2, EntityType.Character, 'Olga'),
    new Entity(3, EntityType.Character, 'Afen'),
  ]);
  get entities$(): Observable<ReadonlyArray<Entity>> {
    return this._entities$.asObservable();
  }
  private get entities() {
    return this._entities$.value;
  }

  findById(id: number) {
    const index = this.entities.findIndex(x => x.id === id);
    if (index === -1) {
      return null;
    }

    return this.entities[index];
  }

  createEntity(type: EntityType, label: string) {
    const newEntity = new Entity(type, this._idCounter++, name);
    this._entities$.next([...this.entities, newEntity])
    return newEntity;
  }

  deleteEntity(id: number) {
    const index = this.entities.findIndex(v => v.id === id);
    if (index === -1) {
      return false;
    }

    this._entities$.next(this.entities.splice(index, 1));
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

}
