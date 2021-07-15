import { Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { CategoryResolver } from '../categories/category.resolver';
import { ArticleEditorComponent } from './article-editor/article-editor.component';
import { ArticleEditorGuard } from './article-editor/article-editor.guard';
import { ArticlesComponent } from './articles.component';

export const routes: Routes = [
  { path: '', component: ArticlesComponent, canActivate: [AuthGuard] },
  {
    path: 'new',
    component: ArticleEditorComponent,
    canActivate: [AuthGuard],
    resolve: [CategoryResolver],
  },
  {
    path: 'edit/:id',
    component: ArticleEditorComponent,
    canActivate: [AuthGuard, ArticleEditorGuard],
    resolve: [CategoryResolver],
  },
];
