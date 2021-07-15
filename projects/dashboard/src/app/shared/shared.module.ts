import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './loading/loading.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { DialogComponent } from './dialog/dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { GroupListItemComponent } from './group-list-item/group-list-item.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { TranscludeDirective } from './transclude.directive';

@NgModule({
  declarations: [
    LoadingComponent,
    DialogComponent,
    GroupListItemComponent,
    TranscludeDirective,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatProgressBarModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
  ],
  exports: [
    LoadingComponent,
    MatDialogModule,
    GroupListItemComponent,
    MatListModule,
    TranscludeDirective,
  ],
})
export class SharedModule {}
