import { Component, OnInit, Input } from '@angular/core';
import { Observable, EMPTY } from 'rxjs';
import { map } from 'rxjs/operators';
import { Entity, EntityType } from 'src/app/domain/entity';
import { EntityService } from 'src/app/domain/entity.service';

@Component({
  selector: 'app-entities-group',
  templateUrl: './entities-group.component.html',
  styleUrls: ['./entities-group.component.scss']
})
export class EntitiesGroupComponent implements OnInit {
  @Input() title = '';
  @Input() type?: EntityType;
  entities$: Observable<Entity[]> = EMPTY;

  constructor(private _entityService: EntityService) { }

  ngOnInit() {
    this.entities$ = this._entityService.entities$.pipe(
      map(all => all.filter(x => x.type === this.type))
    )
  }
}
