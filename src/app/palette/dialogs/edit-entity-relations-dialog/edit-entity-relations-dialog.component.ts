import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-entity-relations-dialog',
  templateUrl: './edit-entity-relations-dialog.component.html',
  styleUrls: ['./edit-entity-relations-dialog.component.scss']
})
export class EditEntityRelationsDialogComponent implements OnInit {
  static showDialog(entityId: number, dialogService: MatDialog): Observable<{ new: [{ from: number, to: number }], removed: [number] } | undefined> {
    return dialogService.open(EditEntityRelationsDialogComponent, { data: entityId }).afterClosed();
  }

  constructor(private readonly _dialogRef: MatDialogRef<EditEntityRelationsDialogComponent>, @Inject(MAT_DIALOG_DATA) private entityId: number) { }

  ngOnInit() { }

  discard() {
    this._dialogRef.close();
  }

  save() { }


}
