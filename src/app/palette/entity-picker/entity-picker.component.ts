import { Component, EventEmitter, Input, OnInit, Output, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Entity } from 'src/app/domain/entity';
import { EntityService } from 'src/app/domain/entity.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-entity-picker',
  templateUrl: './entity-picker.component.html',
  styleUrls: ['./entity-picker.component.scss']
})
export class EntityPickerComponent implements OnInit, OnDestroy {
  private _optionsSubscription = Subscription.EMPTY;

  options: Entity[] = [];

  private _selectedOption: Entity | undefined;
  get selectedOption() {
    return this._selectedOption;
  }
  set selectedOption(value: Entity | undefined) {
    this._selectedOption = value;

    this.entityId = value ? value.id : undefined;
    this.entityIdChange.next(this.entityId);
  }

  @Input() entityId?: number;
  @Output() entityIdChange = new EventEmitter<number | undefined>();

  @Input() placeholder?: string;

  constructor(private readonly _entityService: EntityService) { }

  ngOnInit() {
    this._optionsSubscription = this._entityService.entities$
      .pipe(
        map(entities => _.sortBy(entities, ['type', 'label'])),
      )
      .subscribe(options => {
        this.options = options;
        this._selectedOption = _.find(options, { id: this.entityId })
      });
  }

  ngOnDestroy(): void {
    this._optionsSubscription.unsubscribe();
  }
}
