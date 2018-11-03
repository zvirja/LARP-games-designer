import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEntityRelationsDialogComponent } from './edit-entity-relations-dialog.component';

describe('EditEntityRelationsDialogComponent', () => {
  let component: EditEntityRelationsDialogComponent;
  let fixture: ComponentFixture<EditEntityRelationsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditEntityRelationsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEntityRelationsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
