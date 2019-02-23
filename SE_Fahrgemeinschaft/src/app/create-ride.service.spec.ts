import { TestBed } from '@angular/core/testing';

import { CreateRideService } from './create-ride.service';

describe('CreateRideService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CreateRideService = TestBed.get(CreateRideService);
    expect(service).toBeTruthy();
  });
});
