import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouteModule } from './route/route.module';
import { HttpClientModule } from '@angular/common/http';
<<<<<<< HEAD
=======
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
>>>>>>> dashboard/development-categories

@NgModule({
  declarations: [AppComponent],
  imports: [
    RouteModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouteModule,
    HttpClientModule,
    MatSnackBarModule,
    SharedModule,
    CoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
