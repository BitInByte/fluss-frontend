import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CategoriesService } from '../categories/categories.service';
import { CategoriesStore } from '../categories/categories.store';

import { AuthInterceptor } from './auth.interceptor';
import { AuthStore } from './auth.store';

describe('AuthInterceptor', () => {
  // let authStoreSpy: { token: string };
  // let authInterceptor: AuthInterceptor;
  // let categoriesService: CategoriesService;
  // let httpMock: HttpTestingController;

  beforeEach(() => {
    // authStoreSpy = jasmine.createSpyObj('AuthStore', ['token']);

    TestBed.configureTestingModule({
      imports: [],
      providers: [
        // CategoriesStore,
        // CategoriesService,
        // { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        // { provide: AuthStore, useValue: authStoreSpy },
        AuthInterceptor,
        // AuthStore,
      ],
    });
  });

  beforeEach(() => {
    // categoriesService = TestBed.get(CategoriesService);
    // httpMock = TestBed.get(HttpTestingController);
    // authInterceptor = TestBed.get(AuthInterceptor);
  });

  it('#should be created', () => {
    // const interceptor: AuthInterceptor = TestBed.inject(AuthInterceptor);
    // expect(interceptor).toBeTruthy();
    // expect(authInterceptor).toBeTruthy();
    expect(TestBed.get(AuthInterceptor)).toBeTruthy();
  });

  it('#should add authorization token in any request', () => {});

  it('#should add authorization bearer in each request if token exists', () => {});
});
