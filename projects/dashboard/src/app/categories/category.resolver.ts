import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CategoriesService } from './categories.service';
import { CategoriesStore } from './categories.store';
import { Category } from './category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryResolver implements Resolve<Category[]> {
  constructor(
    private categoriesStore: CategoriesStore,
    private categoriesService: CategoriesService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Category[] | Promise<Category[]> | Observable<Category[]> {
    console.log('Resolving Data');
    let categories = this.categoriesStore.categories;

    if (!categories) {
      // this.categoriesStore.getAllCategories();
      // return this.categoriesStore.categories;
      return this.categoriesService.getAll();
    }
    return categories;
  }
}
