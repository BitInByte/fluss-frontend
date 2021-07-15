import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, finalize, map, switchMap } from 'rxjs/operators';
import { Logger } from '../shared/logger.model';
import { ModalService } from '../shared/modal.service';
import { Article } from './article.model';
import { ArticlesService, createArticleBody } from './articles.service';

@Injectable({
  providedIn: 'root',
})
export class ArticlesStore {
  private logger = new Logger('Articles Store', true);
  private articlesSubject = new BehaviorSubject<Article[]>(null);

  articles$ = this.articlesSubject.asObservable();

  get articles(): Article[] {
    return this.articlesSubject.getValue();
  }

  getArticle(articleId: string): Article {
    return this.articles.find((article) => article.id === articleId);
  }

  constructor(
    private articlesService: ArticlesService,
    private modalService: ModalService
  ) {}

  getAllArticles(): void {
    this.articlesService.getAll().subscribe(
      (articles) => {
        console.log('Articles: ', articles);
        this.articlesSubject.next(articles);
      },
      (error) => this.modalService.showError(error),
      () => this.logger.log('Get All Subscription Completed')
    );
  }

  // createArticle(article: Partial<Article>): void {
  createArticle(article: createArticleBody): Observable<boolean> {
    // let success = false;
    return this.articlesService.createArticle(article).pipe(
      map(
        (article) => {
          console.log('Article: ', article);
          if (this.articles) {
            const newArticles = [...this.articles];
            newArticles.push(article);
            this.articlesSubject.next(newArticles);
          }
          return true;
          // return of(true);
        },
        catchError((error) => {
          this.modalService.showError(error);
          return of(false);
          // return false;
        })
        // (error) => {
        // this.modalService.showError(error);
        // return of(false);
        // // return false;
        // }
      ),
      finalize(() => this.logger.log('Create Subscription Completed'))
    );
    // .subscribe
    // (article) => {
    // console.log('Article: ', article);
    // if (this.articles) {
    // const newArticles = [...this.articles];
    // newArticles.push(article);
    // this.articlesSubject.next(newArticles);
    // }
    // // return of(true);
    // // return true;
    // },
    // (error) => {
    // this.modalService.showError(error);
    // // return of(false);
    // // return false;
    // },
    // () => this.logger.log('Create Subscription Completed')
    // ();

    // return of(false);
    // return success;
  }

  updateArticle(
    articleId: string,
    article: createArticleBody
  ): Observable<boolean> {
    // let success = false;
    return this.articlesService.updateArticle(articleId, article).pipe(
      map(
        (article) => {
          console.log('Article: ', article);
          if (this.articles) {
            const articleIndex = this.articles.findIndex(
              (article) => article.id === articleId
            );
            const newArticles = [...this.articles];

            newArticles[articleIndex] = article;
            this.articlesSubject.next(newArticles);
          }
          return true;
        },
        catchError((error) => {
          this.modalService.showError(error);
          return of(false);
        })
      ),
      finalize(() => this.logger.log('Create Subscription Completed'))
    );
  }

  deleteArticle(articleId: string): void {
    this.articlesService.deleteArticle(articleId).subscribe(
      () => {
        const articleIndex = this.articles.findIndex(
          (article) => article.id === articleId
        );
        const updatedArticles = [...this.articles];

        updatedArticles.splice(articleIndex, 1);

        this.articlesSubject.next(updatedArticles);
      },
      (error) => this.modalService.showError(error),
      () => this.logger.log('Delete Subscription Completed')
    );
  }
}
