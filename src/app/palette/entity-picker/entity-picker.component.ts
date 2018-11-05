import { Component, EventEmitter, Input, OnInit, Output, OnDestroy } from '@angular/core';
import { EMPTY, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { EntityType } from 'src/app/domain/entity';
import { EntityService } from 'src/app/domain/entity.service';
import { mapEntityTypeToIcon } from '../presentation-util';
import * as _ from 'lodash';

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
export class EntityPickerComponent implements OnInit, OnDestroy {
  private _idToModel = new Map<number, EntityModel>();
  private _optionsSubscription = Subscription.EMPTY;

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
      map(entities => _
        .chain(entities)
        .map(({ id, label, type }) => ({ id, label, type, icon: mapEntityTypeToIcon(type) }))
        // Sort by type and later by label
        .sortBy(['type', 'label'])
        .value()),
    );

    this._optionsSubscription = this.options$.subscribe(entities => {
      this._idToModel = entities.reduce((memo, model) => {
        memo.set(model.id, model);
        return memo
      }, new Map<number, EntityModel>())
    });
  }

  ngOnDestroy(): void {
    this._optionsSubscription.unsubscribe();
  }

  findById(id: number) {
    return this._idToModel.get(id);
  }

}
