import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './loading/loading.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { DialogComponent } from './dialog/dialog.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [LoadingComponent, DialogComponent],
  imports: [CommonModule, MatProgressBarModule, MatDialogModule],
  exports: [LoadingComponent, MatDialogModule],
})
export class SharedModule {}
