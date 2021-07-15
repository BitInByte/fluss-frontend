import { TestBed } from '@angular/core/testing';
import { Router, RouterModule } from '@angular/router';

import { AuthGuard } from './auth.guard';
import { AuthStore } from './auth.store';

describe('AuthGuard', () => {
  let guard: AuthGuard;

  beforeEach(() => {
    const authStoreSpy = jasmine.createSpyObj('AuthStore', ['token$']);
    const routerSpy = jasmine.createSpyObj('Router', ['createUrlTree']);
    TestBed.configureTestingModule({
      // imports: [RouterModule],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: AuthStore, useValue: authStoreSpy },
      ],
    });
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
