import { Component, OnInit } from '@angular/core';
import { DialogData } from '../../shared/dialog/dialog.component';
import { DialogService } from '../../shared/dialog/dialog.service';
// import { LoadingService } from '../../shared/loading/loading.service';
import { CategoriesStore } from '../categories.store';
import { Category } from '../category.model';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss'],
})
export class CategoriesListComponent implements OnInit {
  constructor(
    public categoriesStore: CategoriesStore,
    // public loadingService: LoadingService,
    public dialog: DialogService
  ) {}

  ngOnInit(): void {
    this.categoriesStore.getAllCategories();
  }

  onEdit(id: string): void {
    console.log('Edit: ', id);
    const category = this.categoriesStore.categories.find(
      (category) => category.id === id
    );
    const data: DialogData = {
      data: {
        title: 'Insert New Category!',
        inputs: [{ type: 'text', label: 'Category', value: category.category }],
      },
    };

    this.dialog.showDialog(data).subscribe(
      (category) =>
        category &&
        this.categoriesStore.updateCategory(new Category(id, category[0])),
      null,
      () => console.log('Completed')
    );
  }

  onDelete(id: string): void {
    console.log('Delete: ', id);
    this.dialog.showDialog(null).subscribe((confirm) => {
      if (confirm) {
        this.categoriesStore.deleteCategory(id);
      }
    });
  }
}
