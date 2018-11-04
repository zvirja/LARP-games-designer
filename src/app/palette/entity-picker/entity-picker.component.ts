import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { EntityType } from 'src/app/domain/entity';
import { EntityService } from 'src/app/domain/entity.service';
import { mapEntityTypeToIcon } from '../presentation-util';

interface EntityModel {
  id: number,
  type: EntityType,
  icon: string,
  label: string
}

@Component({
  selector: 'app-entity-picker',
  templateUrl: './entity-picker.component.html',
  styleUrls: ['./entity-picker.component.scss']
})
export class EntityPickerComponent implements OnInit {
  private _idToModel = new Map<number, EntityModel>();

  options$: Observable<EntityModel[]> = EMPTY;

  get selectedOption() {
    return this.entityId;
  }
  set selectedOption(value: number | undefined) {
    this.entityId = value;
    this.entityIdChange.next(value);
  }

  @Input() entityId?: number;
  @Output() entityIdChange = new EventEmitter<number | undefined>();

  @Input() placeholder?: string;

  constructor(private readonly _entityService: EntityService) { }

  ngOnInit() {
    this.options$ = this._entityService.entities$.pipe(
      map(entities => entities
        .map(({ id, label, type }) => ({ id, label, type, icon: mapEntityTypeToIcon(type) }))
        // Sort by type and later by label
        .sort((a, b) => a.type !== b.type ? a.type - b.type : a.label.localeCompare(b.label))),
      tap(entities => {
        this._idToModel = entities.reduce((memo, model) => {
          memo.set(model.id, model);
          return memo
        }, new Map<number, EntityModel>())
      }),
    )
  }

  findById(id: number) {
    return this._idToModel.get(id);
  }

}
