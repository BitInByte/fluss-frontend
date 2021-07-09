import { HttpClient } from '@angular/common/http';
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

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(
    private http: HttpClient,
    private loadingService: LoadingService,
    private modalService: ModalService
  ) {}

  getAll(): Observable<Category[]> {
    this.loadingService.setLoadingOn();
    return this.http
      .get<getAllCategoriesResponse>(`http://${environment.apiUrl}/v0/category`)
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
}
