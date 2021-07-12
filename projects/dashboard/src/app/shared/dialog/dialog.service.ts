import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { finalize, map, take } from 'rxjs/operators';
import { DialogComponent, DialogData, DialogResult } from './dialog.component';

// @Injectable({
// providedIn: 'root'
// })
@Injectable()
export class DialogService {
  constructor(public dialog: MatDialog) {}

  showDialog(data: DialogData): Observable<string[] | boolean> {
    return this.dialog
      .open(DialogComponent, data)
      .afterClosed()
      .pipe(
        take(1),
        map(
          (result: DialogResult[] | undefined | boolean) => {
            if (result && Array.isArray(result)) {
              return result.map((value) => value.value);
            }
            if (typeof result === 'boolean') {
              return result;
            }
          }
          // result &&
          // Array.isArray(result) &&
          // result.map((value) => value.value)
        ),
        finalize(() => console.log('[Dialog] Subscription Closed'))
      );
  }
}
