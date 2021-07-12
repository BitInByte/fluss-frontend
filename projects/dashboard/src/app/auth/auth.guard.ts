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
  constructor(private router: Router, private authStore: AuthStore) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    console.log('Activating');
    return this.authStore.token$.pipe(
      take(1),
      map((token) => {
        console.log('token: ', !!token);
        console.log('URL: ', state.url);
        console.log('Is Auth: ', state.url === '/auth' && !!token);
        if (state.url === '/auth' && !!token) {
          console.log('Is Auth');
          return this.router.createUrlTree(['/articles']);
        } else if (state.url === '/auth' && !!token === false) {
          return true;
        } else if (!!token && token !== 'null') {
          console.log('Trueeeee');
          return true;
        }
        return this.router.createUrlTree(['/auth']);
      })
    );
  }
}
