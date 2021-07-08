import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MainNavGroupComponent } from './main-nav/main-nav-group/main-nav-group.component';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { routes } from './routes';

@NgModule({
  declarations: [MainNavComponent, MainNavGroupComponent],
  imports: [
<<<<<<< HEAD
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
=======
>>>>>>> parent of bc6cdf4 (Added Loading)
    CommonModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule, MainNavComponent],
})
export class RouteModule {}
