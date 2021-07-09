import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CategoriesService } from './categories.service';
import { Category } from './category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoriesStore {
  private categoriesSubject = new BehaviorSubject<Category[]>(null);

  categories$ = this.categoriesSubject.asObservable();

  constructor(private categoriesService: CategoriesService) {}

  getAllCategories(): void {
    this.categoriesService.getAll().subscribe(
      (categories) => {
        console.log('Categories: ', categories);
        this.categoriesSubject.next(categories);
      },
      null,
      () => console.log('Completed')
    );
  }
}
