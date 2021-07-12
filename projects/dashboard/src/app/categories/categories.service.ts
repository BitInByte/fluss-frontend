import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import {
  catchError,
  finalize,
  map,
  shareReplay,
  take,
  tap,
} from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { LoadingService } from '../shared/loading/loading.service';
import { ModalService } from '../shared/modal.service';
import { Category } from './category.model';

interface getAllCategoriesResponse {
  success: boolean;
  results: number;
  data: [
    {
      id: string;
      category: string;
    }
  ];
}

interface createCategoryResponse {
  success: boolean;
  data: {
    category: string;
    author: {
      id: string;
      username: string;
    };
    id: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private endpoint = 'category';
  constructor(
    private http: HttpClient,
    private loadingService: LoadingService,
    private modalService: ModalService
  ) {}

  getAll(): Observable<Category[]> {
    this.loadingService.setLoadingOn();
    return this.http
      .get<getAllCategoriesResponse>(
        `http://${environment.apiUrl}/v0/${this.endpoint}`
      )
      .pipe(
        take(1),
        map((resData) => {
          const categories = resData.data.map(
            (category) => new Category(category.id, category.category)
          );
          return categories;
        }),
        catchError((error) => {
          this.modalService.showError(error);
          return throwError(error);
        }),
        finalize(() => this.loadingService.setLoadingOff()),
        shareReplay()
      );
  }

  addCategory(category: string): Observable<Category> {
    this.loadingService.setLoadingOn();
    return this.http
      .post<createCategoryResponse>(
        `http://${environment.apiUrl}/v0/${this.endpoint}`,
        { category }
      )
      .pipe(
        take(1),
        map((resData) => new Category(resData.data.id, resData.data.category)),
        finalize(() => this.loadingService.setLoadingOff()),
        shareReplay()
      );
  }

  updateCategory(category: Category): Observable<Category> {
    this.loadingService.setLoadingOn();
    return this.http
      .patch<createCategoryResponse>(
        `http://${environment.apiUrl}/v0/${this.endpoint}/${category.id}`,
        { category: category.category }
      )
      .pipe(
        take(1),
        map((resData) => new Category(resData.data.id, resData.data.category)),
        finalize(() => this.loadingService.setLoadingOff()),
        shareReplay()
      );
  }

  deleteCategory(categoryId: string): Observable<{ success: boolean }> {
    this.loadingService.setLoadingOn();
    return this.http
      .delete<{ success: boolean }>(
        `http://${environment.apiUrl}/v0/${this.endpoint}/${categoryId}`
      )
      .pipe(
        take(1),
        finalize(() => this.loadingService.setLoadingOff()),
        shareReplay()
      );
  }
}
