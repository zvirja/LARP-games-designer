import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material';
import { Observable } from 'rxjs';
import { EntityType } from 'src/app/domain/entity';

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
  static showDialog(dialogService: MatDialog): Observable<{ type: EntityType, name: string } | null> {
    return dialogService.open(CreateNewEntityDialogComponent).afterClosed();
  }

  EntityType = EntityType;

  type = EntityType.Character;
  name = '';

  constructor(public dialogRef: MatDialogRef<CreateNewEntityDialogComponent>) { }

  cancel(): void {
    this.dialogRef.close();
  }
}
