import { Component, OnInit, OnDestroy } from '@angular/core';
import { EMPTY, Observable, combineLatest, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Entity } from '../domain/entity';
import { EntityService } from '../domain/entity.service';
import { Relation, RelationType } from '../domain/relation';
import * as _ from 'lodash'
import { MatDialog } from '@angular/material';
import { ConfirmationDialogComponent } from '../dialogs/confirmation-dialog/confirmation-dialog.component';
import { SelectionService } from '../domain/selection.service';
import { SelectionState } from '../domain/selection-state';

@Component({
  selector: 'app-relations-panel',
  templateUrl: './relations-panel.component.html',
  styleUrls: ['./relations-panel.component.scss']
})
export class RelationsPanelComponent implements OnInit, OnDestroy {
  RelationType = RelationType;

  private _selectionSubscription = Subscription.EMPTY;

  entitiesWithRelations$: Observable<{ entity: Entity, relations: Relation[] }[]> = EMPTY;

  selectionState: SelectionState;

  constructor(private readonly _entityService: EntityService, private readonly _selectionService: SelectionService, private readonly _dialog: MatDialog) { }

  ngOnInit() {
    // Listen to both to re-render when relations are modifed.
    this.entitiesWithRelations$ = combineLatest(this._entityService.entities$, this._entityService.relations$).pipe(
      map(([entities]) => _
        .chain(entities)
        .sortBy(['type', 'label'])
        .map(entity => ({ entity, relations: this._entityService.getAllEntityRelations(entity.id).map(r => this.ensureEntityIdIsFirst(r, entity.id)) }))
        .filter(e => e.relations.length > 0)
        .value())
    );

    this._selectionSubscription = this._selectionService.selectionState$.subscribe(v => {
      this.selectionState = v;
    });
  }

  ngOnDestroy(): void {
    this._selectionSubscription.unsubscribe();
  }

  delete(relationId: number) {
    ConfirmationDialogComponent.runWithConfirmation(
      `Are you sure you want to delete the relation?`,
      () => this._entityService.deleteRelation(relationId),
      this._dialog
    );
  }

  toggleRelationSelection(id: number) {
    this._selectionService.toggleRelationSelection(id);
  }

  setRelationSelection(id: number, isSelected: boolean) {
    this._selectionService.setRelationSelection(id, isSelected);
  }

  private ensureEntityIdIsFirst(relation: Relation, entityId: number) {
    if (relation.entities[0] === entityId) {
      return relation;
    }

    return new Relation(relation.id, relation.type, relation.label, [relation.entities[1], relation.entities[0]]);
  }
}
