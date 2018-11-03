import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsPaletteComponent } from './items-palette.component';

describe('ItemsPaletteComponent', () => {
  let component: ItemsPaletteComponent;
  let fixture: ComponentFixture<ItemsPaletteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemsPaletteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsPaletteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
