import { Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AuthComponent } from './auth/auth.component';

export const routes: Routes = [
  { path: '', component: AuthComponent, canActivate: [AuthGuard] },
];
