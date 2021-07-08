import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class ModalService {
  constructor(private snackBar: MatSnackBar) {}
  showModal(message: string) {
    this.snackBar.open(message, null, { duration: 2000 });
  }
  showError(error: any) {
    let finalError = error.error.message;

    if (Array.isArray(error.error)) {
      finalError = error.error.message[0];
    }

    this.snackBar.open(finalError, null, { duration: 2000 });
  }
}
