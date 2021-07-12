import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Logger } from '../shared/logger.model';
import { ModalService } from '../shared/modal.service';
import { CategoriesService } from './categories.service';
import { Category } from './category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoriesStore {
  private logger = new Logger('Category Store', true);
  private categoriesSubject = new BehaviorSubject<Category[]>(null);

  categories$ = this.categoriesSubject.asObservable();

  get categories(): Category[] {
    return this.categoriesSubject.getValue();
  }

  constructor(
    private categoriesService: CategoriesService,
    private modalService: ModalService
  ) {}

  getAllCategories(): void {
    this.categoriesService.getAll().subscribe(
      (categories) => {
        console.log('Categories: ', categories);
        this.categoriesSubject.next(categories);
      },
      (error) => this.modalService.showError(error),
      // () => console.log('[Category] Get All Subscription Completed')
      () => this.logger.log('Get All Subscription Completed')
    );
  }

  createCategory(category: string): void {
    this.categoriesService.addCategory(category).subscribe(
      (categoryRes) => {
        const newCategories = [...this.categories];
        newCategories.push(categoryRes);
        this.categoriesSubject.next(newCategories);
        this.modalService.showModal('Category Successfully Created!');
      },
      (error) => this.modalService.showError(error),
      // () => console.log('[Category] Create Subscription Completed')
      () => this.logger.log('Create Subscription Completed')
    );
  }

  updateCategory(category: Category): void {
    this.categoriesService.updateCategory(category).subscribe(
      (categoryRes) => {
        const updatedCategories = [...this.categories];
        // for(const cat of updatedCategories) {
        for (let i = 0; i < updatedCategories.length; i++) {
          if (updatedCategories[i].id === category.id) {
            updatedCategories[i].category = category.category;
          }
        }
        this.categoriesSubject.next(updatedCategories);
        this.modalService.showModal('Category Successfully Updated!');
      },
      (error) => this.modalService.showError(error),
      // () => console.log('[Category] Update Subscription Completed')
      () => this.logger.log('Update Subscription Completed')
    );
  }

  deleteCategory(categoryId: string): void {
    this.categoriesService.deleteCategory(categoryId).subscribe(
      () => {
        let updatedCategories = [...this.categories];
        updatedCategories = updatedCategories.filter(
          (category) => category.id !== categoryId
        );
        this.categoriesSubject.next(updatedCategories);
        this.modalService.showModal('Category Successfully Deleted!');
      },
      (error) => this.modalService.showError(error),
      // () => console.log('[Category] Delete Subscription Completed')
      () => this.logger.log('Delete Subscription Completed')
    );
  }
}
