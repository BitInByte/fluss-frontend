import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticlesComponent } from './articles.component';
import { RouterModule } from '@angular/router';
import { routes } from './routes';
import { HttpClientModule } from '@angular/common/http';
import { AuthModule } from '../auth/auth.module';

@NgModule({
  declarations: [ArticlesComponent],
  imports: [CommonModule, RouterModule.forChild(routes), AuthModule],
})
export class ArticlesModule {}
