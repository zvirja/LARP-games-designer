import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import * as _ from 'lodash';
import { EMPTY, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Entity, EntityType } from 'src/app/domain/entity';
import { EntityService } from 'src/app/domain/entity.service';
import { ConfirmationDialogComponent } from '../dialogs/confirmation-dialog/confirmation-dialog.component';
import { CreateNewEntityDialogComponent } from '../dialogs/create-new-entity-dialog/create-new-entity-dialog.component';
import { EditEntityInfoDialogComponent } from '../dialogs/edit-entity-info-dialog/edit-entity-info-dialog.component';
import { EditEntityRelationsDialogComponent } from '../dialogs/edit-entity-relations-dialog/edit-entity-relations-dialog.component';
import { EntityInfoDialogComponent } from '../dialogs/entity-info-dialog/entity-info-dialog.component';
import { SelectionState } from '../domain/selection-state';
import { SelectionService } from '../domain/selection.service';
import { mapEntityTypeToLabel } from '../utils/presentation-util';

@Component({
  selector: 'app-inventory-panel',
  templateUrl: './inventory-panel.component.html',
  styleUrls: ['./inventory-panel.component.scss']
})
export class InventoryPanelComponent implements OnInit, OnDestroy {
  EntityType = EntityType;
  mapEntityTypeToLabel = mapEntityTypeToLabel;

  private _selectionStateSubscription = Subscription.EMPTY;

  grouppedEntities$: Observable<{ name: string, items: Entity[] }[]> = EMPTY;
  selectionState: SelectionState;

  AllEntityTypes = [EntityType.Character, EntityType.Goal, EntityType.Inventory];

  constructor(private readonly _dialog: MatDialog, private readonly _entityService: EntityService, private readonly _selectionService: SelectionService) { }

  ngOnInit() {
    this.grouppedEntities$ = this._entityService.entities$.pipe(
      map(entities => _
        .chain(entities)
        .sort(x => x.type)
        .groupBy(x => x.type)
        .map((items, typeStr) => ({ name: mapEntityTypeToLabel(Number(typeStr), true), items }))
        .value()
      ),
    );

    this._selectionStateSubscription = this._selectionService.selectionState$.subscribe(v => {
      this.selectionState = v;
    })
  }

  ngOnDestroy(): void {
    this._selectionStateSubscription.unsubscribe();
  }

  createNew() {
    CreateNewEntityDialogComponent.showDialog(this._dialog);
  }

  delete(id: number) {
    ConfirmationDialogComponent.runWithConfirmation(
      `Are you sure you want to delete entity?`,
      () => this._entityService.deleteEntityWithRelations(id),
      this._dialog);
  }

  showDetails(id: number) {
    EntityInfoDialogComponent.showDialog(id, this._dialog);
  }

  edit(id: number) {
    EditEntityInfoDialogComponent.showDialog(id, this._dialog);
  }

  editRelations(id: number) {
    EditEntityRelationsDialogComponent.showDialog(id, this._dialog);
  }

  toggleEntitySelection(id: number) {
    this._selectionService.toggleEntitySelection(id);
  }

  setEntitySelection(id: number, isSelected: boolean) {
    this._selectionService.setEntitySelection(id, isSelected);
  }

  selectRelatedEntities(id: number, type?: EntityType) {
    if (!type) {
      this._selectionService.selectEntityWithAllRelated(id);
      return;
    }

    this._selectionService.selectEntities(this._entityService
      .findAllRelatedEntities(id)
      .filter(e => e.type === type)
      .map(e => e.id));
  }

}
