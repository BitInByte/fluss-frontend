import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class ModalService {
  constructor(private snackBar: MatSnackBar) {}
  showModal(message: string) {
    this.snackBar.open(message, null, { duration: 2000 });
  }
  showError(error: any) {
    console.log('Error: ', error);
    let finalError = error.error.message;

    if (Array.isArray(error.error)) {
      finalError = error.error.message[0];
    }

    if (error.error.message && Array.isArray(error.error.message)) {
      console.log('I have error: ', error.error.message);
      // finalError = error.error.message
      // .map((message: string[]) => `${message}\n`)
      // .join('');
      finalError = error.error.message.join('\n');
    }

    if (!finalError && error.statusText) {
      finalError = error.statusText;
    }

    if (!finalError) {
      finalError = 'An Unknown Error Occurred!';
    }

    console.log('Prepared error: ', finalError);

    this.snackBar.open(finalError, null, { duration: 2000 });
  }
}
