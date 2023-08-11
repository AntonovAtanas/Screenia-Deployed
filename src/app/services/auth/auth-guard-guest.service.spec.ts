import { TestBed } from '@angular/core/testing';

import { AuthGuardGuestService } from './auth-guard-guest.service';

describe('AuthGuardGuestService', () => {
  let service: AuthGuardGuestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthGuardGuestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
