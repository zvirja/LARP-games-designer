import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntitiesGroupComponent } from './entities-group.component';

describe('EntitiesGroupComponent', () => {
  let component: EntitiesGroupComponent;
  let fixture: ComponentFixture<EntitiesGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntitiesGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntitiesGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
