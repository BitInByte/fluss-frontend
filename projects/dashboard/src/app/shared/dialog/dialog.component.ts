import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export type DialogResult = {
  type: 'textarea' | 'text';
  label: string;
  value: string;
};

interface data {
  title: string;
  inputs?: DialogResult[];
}

export interface DialogData {
  width?: string;
  height?: string;
  data?: data;
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: data
  ) {}

  get isValid(): boolean {
    let isValid = true;
    for (let input of this.data.inputs) {
      if (input.value === undefined) {
        isValid = false;
      } else {
        isValid = isValid && input.value.length !== 0;
      }
    }
    return isValid;
  }

  ngOnInit(): void {}

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
