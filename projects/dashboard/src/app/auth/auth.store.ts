import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ModalService } from '../shared/modal.service';
import { AuthService } from './auth.service';
// import { MatSnackBar } from '@angular/material/snack-bar';

const AUTH_DATA = 'auth_data';
const EXPIRATION_TIME = 86400;
// const EXPIRATION_TIME = 5;

@Injectable({ providedIn: 'root' })
// @Injectable()
export class AuthStore {
  private authSubject = new BehaviorSubject<string>(null);
  private logoutTimer: any;

  token$ = this.authSubject.asObservable();

  get token(): string {
    return this.authSubject.value;
  }

  constructor(
    private authService: AuthService,
    private router: Router,
    // private snackBar: MatSnackBar,
    private modalService: ModalService
  ) {
    const token = JSON.parse(localStorage.getItem(AUTH_DATA)) as {
      token: string;
      expirationTime: number;
    };

    console.log(token);

    if (token) {
      const timeLeft = token.expirationTime - Date.now();
      console.log('Time left: ', timeLeft);
      this.authSubject.next(token.token);
      this.router.navigate(['/articles']);
      this.setLogoutTimer(timeLeft);
    }
  }

  login(username: string, password: string): void {
    this.authService.login(username, password).subscribe(
      (token) => {
        const expirationTimeMilliseconds = EXPIRATION_TIME * 1000;
        const expirationTime = Date.now() + expirationTimeMilliseconds;
        this.authSubject.next(token);
        localStorage.setItem(
          AUTH_DATA,
          JSON.stringify({
            token,
            expirationTime,
          })
        );
        this.router.navigate(['/articles']);
        this.setLogoutTimer(expirationTimeMilliseconds);
      },
      (error) => this.modalService.showError(error),
      () => console.log('Auth Finalized!')
    );
  }

  logout(): void {
    this.authSubject.next(null);
    localStorage.removeItem(AUTH_DATA);
    this.router.navigate(['/auth']);
  }

  private setLogoutTimer(expirationDuration: number): void {
    this.logoutTimer = setTimeout(() => {
      this.logout();
      // this.snackBar.open('Session Cleared', null, { duration: 2000 });
      this.modalService.showModal('Session Cleared');

      clearTimeout(this.logoutTimer);
    }, expirationDuration);
  }
}
