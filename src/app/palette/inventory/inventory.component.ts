import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { EMPTY, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EntityType } from 'src/app/domain/entity';
import { EntityService } from 'src/app/domain/entity.service';
import { CreateNewEntityDialogComponent } from '../create-new-entity-dialog/create-new-entity-dialog.component';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {
  characterIds$: Observable<number[]> = EMPTY;
  goalIds$: Observable<number[]> = EMPTY;
  itemIds$: Observable<number[]> = EMPTY;

  constructor(private readonly _dialog: MatDialog, private readonly _entityService: EntityService) { }

  ngOnInit() {
    this.characterIds$ = this._entityService.entities$.pipe(
      map((v) => v.filter(x => x.type === EntityType.Character).map(x => x.id))
    );

    this.goalIds$ = this._entityService.entities$.pipe(
      map((v) => v.filter(x => x.type === EntityType.Goal).map(x => x.id))
    );

    this.itemIds$ = this._entityService.entities$.pipe(
      map((v) => v.filter(x => x.type === EntityType.Inventory).map(x => x.id))
    );
  }

  createNew() {
    CreateNewEntityDialogComponent.showDialog(this._dialog)
      .subscribe((result) => {
        if (result) {
          this._entityService.createEntity(result.type, result.name);
        }
      })
  }

  delete(id: number) {
    this._entityService.deleteEntityWithRelations(id);
  }
}
