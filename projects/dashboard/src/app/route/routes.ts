import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/articles', pathMatch: 'full' },
  // Lazy Loading
  {
    path: 'auth',
    loadChildren: () => import('../auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'articles',
    loadChildren: () =>
      import('../articles/articles.module').then((m) => m.ArticlesModule),
  },
  {
    path: 'categories',
    loadChildren: () =>
      import('../categories/categories.module').then((m) => m.CategoriesModule),
  },
  {
    path: '**',
    redirectTo: '/auth',
  },
];
