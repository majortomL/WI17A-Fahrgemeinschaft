import { TestBed, async, inject } from '@angular/core/testing';

import { AuthTestGuard } from './authtest.guard';

describe('AuthTestGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthTestGuard]
    });
  });

  it('should ...', inject([AuthTestGuard], (guard: AuthTestGuard) => {
    expect(guard).toBeTruthy();
  }));
});
