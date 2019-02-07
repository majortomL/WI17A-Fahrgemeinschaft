import { TestBed } from '@angular/core/testing';

import { RTDBService } from './rtdb.service';

describe('RTDBService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RTDBService = TestBed.get(RTDBService);
    expect(service).toBeTruthy();
  });
});
