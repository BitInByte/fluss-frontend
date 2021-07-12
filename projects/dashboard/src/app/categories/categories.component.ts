import { Component, OnInit } from '@angular/core';
import { DialogData } from '../shared/dialog/dialog.component';
import { DialogService } from '../shared/dialog/dialog.service';
import { CategoriesStore } from './categories.store';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  providers: [DialogService],
})
export class CategoriesComponent implements OnInit {
  private newCategory: string;
  constructor(
    private dialog: DialogService,
    private categoriesStore: CategoriesStore
  ) {}

  ngOnInit(): void {}

  onClick(): void {
    const data: DialogData = {
      data: {
        title: 'Insert New Category!',
        inputs: [{ type: 'text', label: 'Category', value: this.newCategory }],
      },
    };

    this.dialog.showDialog(data).subscribe(
      (category) =>
        category && this.categoriesStore.createCategory(category[0]),
      null,
      () => console.log('Completed')
    );
  }
}
