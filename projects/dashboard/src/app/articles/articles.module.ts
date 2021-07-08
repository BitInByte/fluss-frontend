import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticlesComponent } from './articles.component';
import { RouterModule } from '@angular/router';
import { routes } from './routes';

@NgModule({
  declarations: [ArticlesComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ArticlesModule {}
