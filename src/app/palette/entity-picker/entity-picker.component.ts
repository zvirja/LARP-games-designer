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
  private _optionsSubscription = Subscription.EMPTY;

  options: EntityModel[] = [];

  private _selectedOption: EntityModel;
  get selectedOption() {
    return this._selectedOption;
  }
  set selectedOption(value: EntityModel) {
    this._selectedOption = value;
    this.entityId = value.id;
    this.entityIdChange.next(value.id);
  }

  @Input() entityId?: number;
  @Output() entityIdChange = new EventEmitter<number | undefined>();

  @Input() placeholder?: string;

  constructor(private readonly _entityService: EntityService) { }

  ngOnInit() {
    this._optionsSubscription = this._entityService.entities$
      .pipe(
        map(entities => _
          .chain(entities)
          .map(({ id, label, type }) => ({ id, label, type, icon: mapEntityTypeToIcon(type) }))
          // Sort by type and later by label
          .sortBy(['type', 'label'])
          .value()),
      )
      .subscribe(options => {
        this.options = options;
        this._selectedOption = _.find(options, { id: this.entityId })!
      });
  }

  ngOnDestroy(): void {
    this._optionsSubscription.unsubscribe();
  }
}
