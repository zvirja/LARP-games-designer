import { Component, OnInit, Inject } from '@angular/core';
import { Entity, EntityUpdate } from 'src/app/domain/entity';
import { Mutable } from 'src/app/domain/utils';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EntityService } from 'src/app/domain/entity.service';

@Component({
  selector: 'app-edit-entity-info-dialog',
  templateUrl: './edit-entity-info-dialog.component.html',
  styleUrls: ['./edit-entity-info-dialog.component.scss']
})
export class EditEntityInfoDialogComponent implements OnInit {
  entity: Entity;
  entityEditable: Mutable<Entity>;

  static showDialog(entityId: number, dialogService: MatDialog): void {
    dialogService.open(EditEntityInfoDialogComponent, { data: entityId });
  }

  constructor(private readonly _dialogRef: MatDialogRef<EditEntityInfoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private entityId: number,
    private readonly _entityServie: EntityService) { }

  ngOnInit() {
    this.entity = this._entityServie.findEntityById(this.entityId)!;
    this.entityEditable = { ... this.entity };
  }

  save() {
    let update: EntityUpdate | undefined = {};

    if (this.entity.label !== this.entityEditable.label) {
      update.label = this.entityEditable.label;
    }

    if (this.entity.description !== this.entityEditable.description) {
      update.description = this.entityEditable.description;
    }

    if (Object.keys(update).length > 0) {
      this.writeToStorage(update);
    }

    this._dialogRef.close(update);
  }

  private writeToStorage(update: EntityUpdate) {
    this._entityServie.updateEntity(this.entityId, update);
  }
}
