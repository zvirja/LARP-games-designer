import { Component, OnInit } from '@angular/core';
import { EMPTY, Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { Entity } from '../domain/entity';
import { EntityService } from '../domain/entity.service';
import { Relation, RelationType } from '../domain/relation';
import * as _ from 'lodash'
import { MatDialog } from '@angular/material';
import { ConfirmationDialogComponent } from '../dialogs/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-relations-panel',
  templateUrl: './relations-panel.component.html',
  styleUrls: ['./relations-panel.component.scss']
})
export class RelationsPanelComponent implements OnInit {
  RelationType = RelationType;

  entitiesWithRelations$: Observable<{ entity: Entity, relations: Relation[] }[]> = EMPTY;

  constructor(private readonly _entityService: EntityService, private readonly _dialog: MatDialog) { }

  ngOnInit() {
    // Listen to both to re-render when relations are modifed.
    this.entitiesWithRelations$ = combineLatest(this._entityService.entities$, this._entityService.relations$).pipe(
      map(([entities]) => _
        .chain(entities)
        .sortBy(['type', 'label'])
        .map(entity => ({ entity, relations: this._entityService.getAllEntityRelations(entity.id).map(r => this.ensureEntityIdIsFirst(r, entity.id)) }))
        .filter(e => e.relations.length > 0)
        .value())
    )
  }

  delete(relationId: number) {
    ConfirmationDialogComponent.runWithConfirmation(
      `Are you sure you want to delete the relation?`,
      () => this._entityService.deleteRelation(relationId),
      this._dialog
    );
  }

  private ensureEntityIdIsFirst(relation: Relation, entityId: number) {
    if (relation.entities[0] === entityId) {
      return relation;
    }

    return new Relation(relation.id, relation.type, relation.label, [relation.entities[1], relation.entities[0]]);
  }
}
