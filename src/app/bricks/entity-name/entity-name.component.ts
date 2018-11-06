import { Component, Input } from '@angular/core';
import { EntityService } from 'src/app/domain/entity.service';
import { Entity } from 'src/app/domain/entity';
import { mapEntityTypeToIcon } from 'src/app/utils/presentation-util';

@Component({
  selector: 'app-entity-name',
  templateUrl: './entity-name.component.html',
  styleUrls: ['./entity-name.component.scss']
})
export class EntityNameComponent {
  @Input()
  set id(value: number) {
    this.entity = this._entityService.findEntityById(value);
  }

  @Input()
  set entity(entity: Entity | undefined) {
    if (entity) {
      this.entityInfo = { name: entity.label, icon: mapEntityTypeToIcon(entity.type) }
    } else {
      this.entityInfo = undefined;
    }
  }

  entityInfo?: { name: string, icon: string };

  constructor(private readonly _entityService: EntityService) { }
}
