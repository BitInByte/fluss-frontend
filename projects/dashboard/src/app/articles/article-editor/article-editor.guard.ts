import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ArticleEditorGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const nav = this.router.getCurrentNavigation();

    console.log('ID: ', nav.id);
    console.log('Previous: ', nav.previousNavigation);

    if (nav.id === 1 || nav.previousNavigation === null) {
      // this.router.createUrlTree(['/articles']);
      this.router.navigate(['/articles']);
    } else {
      return true;
    }
  }
}
