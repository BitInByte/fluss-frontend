import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthStore } from './auth.store';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  // constructor(private router: Router, private authStore: AuthStore) {}
  constructor() {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    console.log('Its activated!');
    return true;
    // return this.authStore.isLoggedIn$.pipe(
    // // Unsubscribe automatically to this event
    // take(1),
    // map((isLoggedIn) => {
    // console.log('Is LoggedIn? ', isLoggedIn);
    // if (isLoggedIn) {
    // return true;
    // }
    // return this.router.createUrlTree(['/auth']);
    // })
    // );
  }
}
