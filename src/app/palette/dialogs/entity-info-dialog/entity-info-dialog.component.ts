import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs';
import { EntityUpdate, Entity } from 'src/app/domain/entity';
import { EntityService } from 'src/app/domain/entity.service';
import { Mutable } from '@angular/core/src/type';

@Component({
  selector: 'app-entity-info-dialog',
  templateUrl: './entity-info-dialog.component.html',
  styleUrls: ['./entity-info-dialog.component.scss']
})
export class EntityInfoDialogComponent implements OnInit {
  entity: Entity;
  entityEditable: Partial<Entity> = {};

  static showDialog(entityId: number, dialogService: MatDialog): Observable<EntityUpdate | undefined> {
    return dialogService.open(EntityInfoDialogComponent, { data: entityId }).afterClosed();
  }

  constructor(private readonly _dialogRef: MatDialogRef<EntityInfoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private entityId: number,
    private readonly _entityServie: EntityService) { }

  ngOnInit() {
    this.entity = this._entityServie.findEntityById(this.entityId)!;
    this.entityEditable = { ... this.entity };
  }

  discard() {
    this._dialogRef.close();
  }

  save() {
    let update: EntityUpdate | undefined = {};

    if (this.entity.label !== this.entityEditable.label) {
      update.label = this.entityEditable.label;
    }

    if (this.entity.description !== this.entityEditable.description) {
      update.description = this.entityEditable.description;
    }

    if (Object.keys(update).length === 0) {
      update = undefined;
    }

    this._dialogRef.close(update);
  }
}
