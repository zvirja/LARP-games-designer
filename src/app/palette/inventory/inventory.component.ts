import { Component, OnInit } from '@angular/core';
import { EntityType } from 'src/app/domain/entity';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {
  public EntityType = EntityType;

  constructor() { }

  ngOnInit() {
  }

}
