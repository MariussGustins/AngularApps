import { TestBed } from '@angular/core/testing';

import { AllHousesService } from './all-houses.service';

describe('AllHousesService', () => {
  let service: AllHousesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllHousesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
