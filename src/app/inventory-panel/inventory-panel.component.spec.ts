import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryPanelComponent } from './inventory-panel.component';

describe('InventoryComponent', () => {
  let component: InventoryPanelComponent;
  let fixture: ComponentFixture<InventoryPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
