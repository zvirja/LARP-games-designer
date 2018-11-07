import { Injectable, OnInit } from "@angular/core";
import * as _ from 'lodash';
import { BehaviorSubject, combineLatest, Observable, Subject } from "rxjs";
import { EntityService } from "./entity.service";
import { SelectionState } from "./selection-state";

@Injectable({ providedIn: 'root' })
export class SelectionService {
  private readonly _selectionState$ = new BehaviorSubject(new SelectionState(new Set(), []));

  private selectedEntities = new Set<number>();
  private entitiesRevision$ = new BehaviorSubject<number>(0);

  public readonly selectionState$ = this._selectionState$.asObservable();

  constructor(private readonly _entityService: EntityService) {
    combineLatest(this._entityService.entities$, this._entityService.relations$, this.entitiesRevision$).subscribe(([entities, relations]) => {
      // Skip entities which no longer exist.
      const selected = Array.from(this.selectedEntities).filter(id => _.find(entities, { id }))
      this.selectedEntities = new Set(selected);
      this._selectionState$.next(new SelectionState(new Set(this.selectedEntities), relations));
    })

  }

  selectEntity(id: number) {
    this.selectedEntities.add(id);
    this.increaseRevision();
  }

  unselectEntity(id: number) {
    this.selectedEntities.delete(id);
    this.increaseRevision();
  }

  toggleEntitySelection(id: number) {
    const isSelected = this.selectedEntities.has(id);
    this.setEntitySelection(id, !isSelected);
  }

  setEntitySelection(id: number, isSelected: boolean) {
    if (isSelected) {
      this.selectEntity(id);
    } else {
      this.unselectEntity(id);
    }
  }

  selectEntities(ids: ReadonlyArray<number>) {
    ids.forEach(id => this.selectedEntities.add(id));
    this.increaseRevision();
  }

  selectRelation(id: number) {
    const relation = this._entityService.findRelationById(id);
    if (!relation) {
      throw new Error(`Relation doesn't exist: ${id}.`);
    }

    this.selectedEntities.add(relation.entities[0]);
    this.selectedEntities.add(relation.entities[1]);
    this.increaseRevision();
  }

  unselectRelation(id: number) {
    const relation = this._entityService.findRelationById(id);
    if (!relation) {
      throw new Error(`Relation doesn't exist: ${id}.`);
    }

    this.selectedEntities.delete(relation.entities[0]);
    this.selectedEntities.delete(relation.entities[1]);
    this.increaseRevision();
  }

  toggleRelationSelection(id: number) {
    const isSelected = this._selectionState$.value.isRelationSelected(id);
    this.setRelationSelection(id, !isSelected);
  }

  setRelationSelection(id: number, isSelected: boolean) {
    if (isSelected) {
      this.selectRelation(id);
    } else {
      this.unselectRelation(id);
    }
  }

  selectEntityWithAllRelated(id: number) {
    const relatedEntities = this._entityService.findAllRelatedEntities(id);

    this.selectedEntities.add(id);
    relatedEntities.forEach(({ id }) => this.selectedEntities.add(id));
    this.increaseRevision();
  }

  private increaseRevision() {
    this.entitiesRevision$.next(this.entitiesRevision$.value + 1);
  }
}
