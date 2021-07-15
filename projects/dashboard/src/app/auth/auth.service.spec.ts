import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let httpClientSpy: { post: jasmine.Spy };
  let loadingServiceSpy: {
    setLoadingOn: jasmine.Spy;
    setLoadingOff: jasmine.Spy;
  };
  let authService: AuthService;

  beforeEach(() => {
    // Declaring dependencies
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    loadingServiceSpy = jasmine.createSpyObj('LoadingService', [
      'setLoadingOff',
      'setLoadingOn',
    ]);
    // Firing up service
    // TestBed.configureTestingModule({
    // providers: [
    // AuthService,
    // { provide: HttpClient, useValue: httpClientSpy },
    // ],
    // });
    // authService = TestBed.inject(AuthService);
    authService = new AuthService(
      httpClientSpy as any,
      loadingServiceSpy as any
    );
  });

  it('#should be created', () => {
    expect(authService).toBeTruthy();
  });

  it('#should login', (done: DoneFn) => {
    // Response Mockup Body
    const expectedResponse = { success: true, data: { jwtToken: 'someToken' } };

    // Create the async call
    httpClientSpy.post.and.returnValue(of(expectedResponse));

    // Verify the response
    authService.login('foo', 'bar').subscribe((resData) => {
      expect(resData).toBe('someToken', 'Expected Token');
      done();
    }, done.fail);

    expect(httpClientSpy.post.calls.count()).toBe(1, 'One Call');
  });
});
