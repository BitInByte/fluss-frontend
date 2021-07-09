import { Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { CategoriesComponent } from './categories.component';

export const routes: Routes = [
  { path: '', component: CategoriesComponent, canActivate: [AuthGuard] },
];
