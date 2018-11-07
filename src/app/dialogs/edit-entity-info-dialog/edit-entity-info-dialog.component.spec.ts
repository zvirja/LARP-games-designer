import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEntityInfoDialogComponent } from './edit-entity-info-dialog.component';

describe('EditEntityInfoDialogComponent', () => {
  let component: EditEntityInfoDialogComponent;
  let fixture: ComponentFixture<EditEntityInfoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditEntityInfoDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEntityInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
