import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticlesComponent } from './articles.component';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { routes } from './routes';
import { ArticlesListComponent } from './articles-list/articles-list.component';

@NgModule({
  declarations: [ArticlesComponent, ArticlesListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatListModule,
  ],
})
export class ArticlesModule {}
