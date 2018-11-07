import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Entity } from 'src/app/domain/entity';
import { EntityService } from 'src/app/domain/entity.service';
import { EditEntityInfoDialogComponent } from '../edit-entity-info-dialog/edit-entity-info-dialog.component';

@Component({
  selector: 'app-entity-info-dialog',
  templateUrl: './entity-info-dialog.component.html',
  styleUrls: ['./entity-info-dialog.component.scss']
})
export class EntityInfoDialogComponent implements OnInit {
  entity: Entity;

  static showDialog(entityId: number, dialogService: MatDialog): void {
    dialogService.open(EntityInfoDialogComponent, { data: entityId });
  }

  constructor(public readonly dialogRef: MatDialogRef<EntityInfoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private _entityId: number,
    private readonly _entityService: EntityService,
    private readonly _dialogService: MatDialog) { }

  ngOnInit() {
    this.entity = this._entityService.findEntityById(this._entityId)!;
  }

  showEditDialog() {
    this.dialogRef.close();

    EditEntityInfoDialogComponent.showDialog(this._entityId, this._dialogService);
  }
}
