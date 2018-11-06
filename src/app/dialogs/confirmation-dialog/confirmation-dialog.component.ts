import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent {
  static runWithConfirmation(message: string, action: () => void, dialogService: MatDialog): void {
    dialogService.open(ConfirmationDialogComponent, { data: message }).afterClosed().subscribe(confirmed => {
      if (confirmed) {
        action();
      }
    });
  }

  constructor(private readonly _dialogRef: MatDialogRef<ConfirmationDialogComponent>, @Inject(MAT_DIALOG_DATA) public readonly message: string) { }
}
