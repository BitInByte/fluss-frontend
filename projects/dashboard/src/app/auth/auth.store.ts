import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, shareReplay, switchMap, take, tap } from 'rxjs/operators';
import { LoadingService } from '../shared/loading/loading.service';
import { AuthService } from './auth.service';

const AUTH_DATA = 'auth_data';

// @Injectable({
// providedIn: 'root',
// })
@Injectable()
export class AuthStore {
  private subject = new BehaviorSubject<string>(null);

  private token$ = this.subject.asObservable();

  isLoggedIn$: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private loadingService: LoadingService,
    private router: Router
  ) {
    this.isLoggedIn$ = this.token$.pipe(map((token) => !!token));

    const token = localStorage.getItem(AUTH_DATA);
    console.log('Token: ', token);

    if (token) {
      this.subject.next(token);
      console.log('Changing route');
      this.router.navigate(['/articles']);
    }
  }

  login(username: string, password: string): void {
    this.authService
      .login(username, password)
      .pipe(
        take(1),
        tap(() => this.loadingService.setLoadingOn()),
        map((resData) => resData.data.jwtToken)
      )
      .subscribe((token) => {
        console.log('Token: ', token);
        this.subject.next(token);
        localStorage.setItem(AUTH_DATA, token);
        this.loadingService.setLoadingOff();
        this.router.navigate(['/articles']);
      });
  }

  logout(): void {
    this.subject.next(null);
    localStorage.removeItem(AUTH_DATA);
  }
}
