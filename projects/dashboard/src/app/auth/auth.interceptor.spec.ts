import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Router, RouterModule } from '@angular/router';

import { AuthInterceptor } from './auth.interceptor';

describe('AuthInterceptor', () => {
  let authStoreSpy: { token: string };
  beforeEach(() => {
    authStoreSpy = jasmine.createSpyObj('AuthStore', ['token']);

    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
      ],
    });
  });

  it('should be created', () => {
    const interceptor: AuthInterceptor = TestBed.inject(AuthInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
