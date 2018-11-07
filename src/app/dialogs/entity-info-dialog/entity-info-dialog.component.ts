import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EntityUpdate, Entity } from 'src/app/domain/entity';
import { EntityService } from 'src/app/domain/entity.service';
import { Mutable } from 'src/app/domain/utils';

@Component({
  selector: 'app-entity-info-dialog',
  templateUrl: './entity-info-dialog.component.html',
  styleUrls: ['./entity-info-dialog.component.scss']
})
export class EntityInfoDialogComponent implements OnInit {
  entity: Entity;
  entityEditable: Mutable<Entity>;

  static showDialog(entityId: number, dialogService: MatDialog): void {
    dialogService.open(EntityInfoDialogComponent, { data: entityId });
  }

  constructor(public readonly dialogRef: MatDialogRef<EntityInfoDialogComponent>,
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

    this.dialogRef.close(update);
  }

  private writeToStorage(update: EntityUpdate) {
    this._entityServie.updateEntity(this.entityId, update);
  }
}
