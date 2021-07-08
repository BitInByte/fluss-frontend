import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { concatMap, finalize, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private subject = new BehaviorSubject<boolean>(null);

  loading$ = this.subject.asObservable();

  constructor() {}

  showLoaderUntilCompleted<T>(obs$: Observable<T>): Observable<T> {
    return of(null).pipe(
      tap(() => this.setLoadingOn()),
      concatMap(() => obs$),
      finalize(() => this.setLoadingOff())
    );
  }

  setLoadingOn(): void {
    console.log('Setting Loading On');
    this.subject.next(true);
  }

  setLoadingOff(): void {
    console.log('Setting Loading Off');
    this.subject.next(false);
  }
}
