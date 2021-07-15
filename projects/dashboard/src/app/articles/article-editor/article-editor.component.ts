import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatChip } from '@angular/material/chips';
import { Category } from '../../categories/category.model';
import { ArticlesStore } from '../articles.store';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-article-editor',
  templateUrl: './article-editor.component.html',
  styleUrls: ['./article-editor.component.scss'],
})
export class ArticleEditorComponent implements OnInit {
  @ViewChild('editorForm', { static: false }) editorForm: NgForm;
  categoriesSelected: string[] = [];
  // mokupList = ['Test 1', 'Test 2', 'Test 3', 'Test 4'];
  categories: Category[] = [];
  isDartVisible = false;
  isCssVisible = false;
  dartCode = '';
  cssCode = '';
  articleId: string;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private articlesStore: ArticlesStore
  ) {}

  ngOnInit(): void {
    // console.log('Categories on init: ', this.categoriesStore.categories);
    console.log('Categories on init: ', this.route.snapshot.data[0]);
    console.log('Form: ', this.editorForm);
    // this.categories = this.categoriesStore.categories;
    this.categories = this.route.snapshot.data[0] as Category[];

    this.articleId = this.route.snapshot.params['id'] as string;

    if (this.articleId) {
      const article = this.articlesStore.getArticle(this.articleId);
      console.log('Categories: ', article.categories);
      setTimeout(() => {
        this.editorForm.setValue({
          title: article.title,
          description: article.description,
          ['css-code']: article.cssCode,
          cssDesc: article.cssDesc,
          cssLink: article.cssLink,
          ['dart-code']: article.flutterCode,
          flutterDesc: article.flutterDesc,
          flutterLink: article.flutterLink,
        });
        this.categoriesSelected = article.categories.map(
          (category) => category.id
        );
      });
    }
  }

  onSubmit(form: NgForm): void {
    console.log(form);

    if (this.articleId) {
      this.articlesStore
        .updateArticle(this.articleId, {
          title: form.controls['title'].value,
          description: form.controls['description'].value,
          cssCode: form.controls['css-code'].value,
          cssDesc: form.controls['cssDesc'].value,
          cssLink: form.controls['cssLink'].value,
          flutterCode: form.controls['dart-code'].value,
          flutterDesc: form.controls['flutterDesc'].value,
          flutterLink: form.controls['flutterLink'].value,
          categories: this.categoriesSelected,
        })
        .pipe(take(1))
        .subscribe((success) => {
          if (success) {
            form.reset();
            this.onCancel();
          }
        });
    } else {
      this.articlesStore
        .createArticle({
          title: form.controls['title'].value,
          description: form.controls['description'].value,
          cssCode: form.controls['css-code'].value,
          cssDesc: form.controls['cssDesc'].value,
          cssLink: form.controls['cssLink'].value,
          flutterCode: form.controls['dart-code'].value,
          flutterDesc: form.controls['flutterDesc'].value,
          flutterLink: form.controls['flutterLink'].value,
          categories: this.categoriesSelected,
        })
        .pipe(take(1))
        .subscribe(
          (success) => {
            console.log('Success: ', success);
            if (success) {
              form.reset();
              this.onCancel();
            }
          },
          null,
          () => console.log('Completedddddddddddd')
        );
    }

    // console.log('Success? ', success);

    // if (success) {
    // form.reset();
    // this.onCancel();
    // }
  }

  onDartClick(): void {
    this.isDartVisible = !this.isDartVisible;
  }

  onCssClick(): void {
    this.isCssVisible = !this.isCssVisible;
  }

  onCancel(): void {
    // this.router.navigate(['../'], { relativeTo: this.route });
    this.router.navigate(['/articles']);
  }

  onSelect(event: MatChip): void {
    // console.log('Selection event: ', event);
    // console.log('Value: ', event.value);
    event.toggleSelected();
    this.toggleCategory(event.value);
    console.log('Categories: ', this.categoriesSelected);
  }

  private toggleCategory(category: string): void {
    const categoryFound = this.categoriesSelected.findIndex(
      (categoryItem) => categoryItem === category
    );

    console.log('Index: ', categoryFound);

    if (categoryFound === -1) {
      this.categoriesSelected.push(category);
    } else {
      this.categoriesSelected.splice(categoryFound, 1);
    }
  }
}
