import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, map, shareReplay, take } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Category } from '../categories/category.model';
import { LoadingService } from '../shared/loading/loading.service';
import { ModalService } from '../shared/modal.service';
import { Article } from './article.model';

interface getAllArticlesResponse {
  success: boolean;
  results: number;
  data: Article[];
}

export interface createArticleBody {
  title: string;
  description: string;
  cssCode: string;
  cssDesc: string;
  cssLink: string;
  flutterCode: string;
  flutterDesc: string;
  flutterLink: string;
  categories: string[];
}

interface createArticleResponse {
  success: boolean;
  data: Article & {
    author: {
      id: string;
      username: string;
    };
  };
}

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  private endpoint = 'article';

  constructor(
    private http: HttpClient,
    private loadingService: LoadingService,
    private modalService: ModalService
  ) {}

  getAll(): Observable<Article[]> {
    this.loadingService.setLoadingOn();
    return this.http
      .get<getAllArticlesResponse>(
        `http://${environment.apiUrl}/v0/${this.endpoint}`
      )
      .pipe(
        take(1),
        map((resData) =>
          resData.data.map((articlesRes) => {
            return this.getArticleFromResponse(articlesRes);
          })
        ),
        catchError((error) => {
          this.modalService.showError(error);
          return throwError(error);
        }),
        finalize(() => this.loadingService.setLoadingOff()),
        shareReplay()
      );
  }

  // createArticle(article: Partial<Article>): Observable<Article> {
  createArticle(article: createArticleBody): Observable<Article> {
    this.loadingService.setLoadingOn();
    return this.http
      .post<createArticleResponse>(
        `http://${environment.apiUrl}/v0/${this.endpoint}`,
        {
          title: article.title,
          description: article.description,
          cssCode: article.cssCode,
          cssDesc: article.cssDesc,
          cssLink: article.cssLink,
          flutterCode: article.flutterCode,
          flutterDesc: article.flutterDesc,
          flutterLink: article.flutterLink,
          // categories: [...article.categories.map((category) => category.id)],
          categories: article.categories,
        }
      )
      .pipe(
        take(1),
        map((resData) => {
          const newArticle = new Article(
            resData.data.id,
            resData.data.title,
            resData.data.description,
            resData.data.cssCode,
            resData.data.cssDesc,
            resData.data.cssLink,
            resData.data.flutterCode,
            resData.data.flutterDesc,
            resData.data.flutterLink,
            resData.data.createdAt,
            resData.data.updatedAt,
            resData.data.categories
          );

          return newArticle;
        }),
        catchError((error) => {
          this.modalService.showError(error);
          return throwError(error);
        }),
        finalize(() => this.loadingService.setLoadingOff()),
        shareReplay()
      );
  }

  updateArticle(
    articleId: string,
    article: createArticleBody
  ): Observable<Article> {
    this.loadingService.setLoadingOn();
    return this.http
      .patch<createArticleResponse>(
        `http://${environment.apiUrl}/v0/${this.endpoint}/${articleId}`,
        {
          ...article,
        }
      )
      .pipe(
        take(1),
        map((articleRes) => {
          return new Article(
            articleRes.data.id,
            articleRes.data.title,
            articleRes.data.description,
            articleRes.data.cssCode,
            articleRes.data.cssDesc,
            articleRes.data.cssLink,
            articleRes.data.flutterCode,
            articleRes.data.flutterDesc,
            articleRes.data.flutterLink,
            articleRes.data.createdAt,
            articleRes.data.updatedAt,
            articleRes.data.categories
          );
        }),
        finalize(() => this.loadingService.setLoadingOff()),
        shareReplay()
      );
  }

  deleteArticle(articleId: string): Observable<{ success: boolean }> {
    this.loadingService.setLoadingOn();
    return this.http
      .delete<{ success: boolean }>(
        `http://${environment.apiUrl}/v0/${this.endpoint}/${articleId}`
      )
      .pipe(
        take(1),
        finalize(() => this.loadingService.setLoadingOff()),
        shareReplay()
      );
  }

  private getArticleFromResponse(articlesRes: Article): Article {
    const genCategories = articlesRes.categories.map(
      (category) => new Category(category.id, category.category)
    );
    return new Article(
      articlesRes.id,
      articlesRes.title,
      articlesRes.description,
      articlesRes.cssCode,
      articlesRes.cssDesc,
      articlesRes.cssLink,
      articlesRes.flutterCode,
      articlesRes.flutterDesc,
      articlesRes.flutterLink,
      articlesRes.createdAt,
      articlesRes.updatedAt,
      genCategories
    );
  }
}
