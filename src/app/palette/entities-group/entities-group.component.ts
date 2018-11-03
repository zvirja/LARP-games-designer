import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Entity } from 'src/app/domain/entity';
import { EntityService } from 'src/app/domain/entity.service';

@Component({
  selector: 'app-entities-group',
  templateUrl: './entities-group.component.html',
  styleUrls: ['./entities-group.component.scss']
})
export class EntitiesGroupComponent {
  private _ids: number[] = [];

  @Input() title = '';
  @Input() get ids() {
    return this._ids;
  }
  set ids(value: number[]) {
    this._ids = value;
    this.mappedEntities = value
      .map(id => this._entityService.findById(id))
      .filter((x): x is Entity => !!x);
  }

  mappedEntities: Entity[] = [];

  @Output() readonly delete = new EventEmitter<number>();
  @Output() readonly select = new EventEmitter<number>();

  constructor(private _entityService: EntityService) { }
}
