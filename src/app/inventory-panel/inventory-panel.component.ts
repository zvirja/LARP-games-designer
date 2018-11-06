import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { EMPTY, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { EntityService } from 'src/app/domain/entity.service';
import { CreateNewEntityDialogComponent } from '../dialogs/create-new-entity-dialog/create-new-entity-dialog.component';
import { EditEntityRelationsDialogComponent } from '../dialogs/edit-entity-relations-dialog/edit-entity-relations-dialog.component';
import { EntityInfoDialogComponent } from '../dialogs/entity-info-dialog/entity-info-dialog.component';
import { ConfirmationDialogComponent } from '../dialogs/confirmation-dialog/confirmation-dialog.component';
import * as _ from 'lodash';
import { Entity } from 'src/app/domain/entity';
import { mapEntityTypeToLabel } from '../utils/presentation-util';

@Component({
  selector: 'app-inventory-panel',
  templateUrl: './inventory-panel.component.html',
  styleUrls: ['./inventory-panel.component.scss']
})
export class InventoryPanelComponent implements OnInit {
  grouppedEntities$: Observable<{ name: string, items: Entity[] }[]> = EMPTY;

  constructor(private readonly _dialog: MatDialog, private readonly _entityService: EntityService) { }

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

  edit(id: number) {
    EntityInfoDialogComponent.showDialog(id, this._dialog);
  }

  editRelations(id: number) {
    EditEntityRelationsDialogComponent.showDialog(id, this._dialog);
  }
}
