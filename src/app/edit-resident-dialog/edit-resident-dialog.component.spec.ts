import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditResidentDialogComponent } from './edit-resident-dialog.component';

describe('EditResidentDialogComponent', () => {
  let component: EditResidentDialogComponent;
  let fixture: ComponentFixture<EditResidentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditResidentDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditResidentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
