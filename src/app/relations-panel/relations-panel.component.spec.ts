import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelationsPanelComponent } from './relations-panel.component';

describe('RelationsPanelComponent', () => {
  let component: RelationsPanelComponent;
  let fixture: ComponentFixture<RelationsPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelationsPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelationsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
