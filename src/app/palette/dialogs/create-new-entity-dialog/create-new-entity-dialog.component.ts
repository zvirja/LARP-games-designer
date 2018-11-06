import { Component } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material';
import { EntityType } from 'src/app/domain/entity';
import { EntityService } from 'src/app/domain/entity.service';

@Component({
  selector: 'app-create-new-entity-dialog',
  templateUrl: './create-new-entity-dialog.component.html',
  styles: [`
    button {
      margin-right: 10px;
    }
  `]
})
export class CreateNewEntityDialogComponent {
  static showDialog(dialogService: MatDialog): void {
    dialogService.open(CreateNewEntityDialogComponent);
  }

  EntityType = EntityType;

  type = EntityType.Character;
  name = '';

  constructor(public dialogRef: MatDialogRef<CreateNewEntityDialogComponent>, private readonly _entityService: EntityService) { }

  create() {
    this._entityService.createEntity(this.type, this.name);
    this.dialogRef.close();
  }
}
