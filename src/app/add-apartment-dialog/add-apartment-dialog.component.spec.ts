import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddApartmentDialogComponent } from './add-apartment-dialog.component';

describe('AddApartmentDialogComponent', () => {
  let component: AddApartmentDialogComponent;
  let fixture: ComponentFixture<AddApartmentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddApartmentDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddApartmentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
