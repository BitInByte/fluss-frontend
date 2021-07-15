import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticlesComponent } from './articles.component';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
// import { MatListModule } from '@angular/material/list';
import { routes } from './articles.routes';
import { ArticlesListComponent } from './articles-list/articles-list.component';
import { SharedModule } from '../shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { ArticleEditorComponent } from './article-editor/article-editor.component';
import { FormsModule } from '@angular/forms';
// import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SyntaxHighlighterComponent } from './article-editor/syntax-highlighter/syntax-highlighter.component';
import { AllowUserTabsDirective } from './article-editor/allow-user-tabs.directive';
import { MatIconModule } from '@angular/material/icon';
import { ArticleEditorIdeComponent } from './article-editor/article-editor-ide/article-editor-ide.component';

@NgModule({
  declarations: [
    ArticlesComponent,
    ArticlesListComponent,
    ArticleEditorComponent,
    SyntaxHighlighterComponent,
    AllowUserTabsDirective,
    ArticleEditorIdeComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    SharedModule,
    // MatListModule,
    MatButtonModule,
    FormsModule,
    MatInputModule,
    MatIconModule,
    MatChipsModule,
  ],
})
export class ArticlesModule {}
