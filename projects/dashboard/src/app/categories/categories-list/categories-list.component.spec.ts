import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DialogService } from '../../shared/dialog/dialog.service';
import { CategoriesStore } from '../categories.store';

import { CategoriesListComponent } from './categories-list.component';

describe('CategoriesListComponent', () => {
  let component: CategoriesListComponent;
  let fixture: ComponentFixture<CategoriesListComponent>;

  beforeEach(async () => {
    const categoriesStoreSpy = jasmine.createSpyObj('CategoriesStore', [
      'getAllCategories',
      'categories',
      'updateCategory',
      'deleteCategory',
    ]);
    const dialogServiceSpy = jasmine.createSpyObj('DialogService', [
      'showDialog',
    ]);
    await TestBed.configureTestingModule({
      declarations: [CategoriesListComponent],
      providers: [
        { provide: CategoriesStore, useValue: categoriesStoreSpy },
        { provide: DialogService, useValue: dialogServiceSpy },
      ],

      // imports: [HttpClientModule, MatSnackBarModule],
      // providers: [DialogService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
