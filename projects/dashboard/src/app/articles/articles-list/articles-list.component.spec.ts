import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, RouterModule } from '@angular/router';
import { DialogService } from '../../shared/dialog/dialog.service';
import { ArticlesStore } from '../articles.store';

import { ArticlesListComponent } from './articles-list.component';

describe('ArticlesListComponent', () => {
  let component: ArticlesListComponent;
  let fixture: ComponentFixture<ArticlesListComponent>;

  beforeEach(async () => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const articlesStoreSpy = jasmine.createSpyObj('ArticlesStore', [
      'getAllArticles',
      'deleteArticle',
    ]);
    // const loadingServiceSpy = jasmine.createSpyObj('LoadingService', [''])
    const dialogServiceSpy = jasmine.createSpyObj('DialogService', [
      'showDialog',
    ]);
    await TestBed.configureTestingModule({
      declarations: [ArticlesListComponent],
      imports: [
        // HttpClientModule,
        // MatSnackBarModule,
        MatDialogModule,
        // RouterModule,
      ],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: ArticlesStore, useValue: articlesStoreSpy },
        { provide: DialogService, useValue: dialogServiceSpy },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticlesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
