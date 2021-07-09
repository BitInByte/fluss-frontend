import { Component, OnInit } from '@angular/core';
import { AuthStore } from '../../auth/auth.store';
import { LoadingService } from '../../shared/loading/loading.service';
import { CategoriesStore } from '../categories.store';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss'],
})
export class CategoriesListComponent implements OnInit {
  constructor(
    public categoriesStore: CategoriesStore,
    public loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.categoriesStore.getAllCategories();
  }

  onEdit(id: string): void {
    console.log('Edit: ', id);
  }

  onDelete(id: string): void {
    console.log('Delete: ', id);
  }
}
