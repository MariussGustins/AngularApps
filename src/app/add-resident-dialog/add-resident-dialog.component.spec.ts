import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddResidentDialogComponent } from './add-resident-dialog.component';

describe('AddResidentDialogComponent', () => {
  let component: AddResidentDialogComponent;
  let fixture: ComponentFixture<AddResidentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddResidentDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddResidentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
