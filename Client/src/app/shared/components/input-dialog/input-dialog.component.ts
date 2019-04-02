import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { InputDialogData } from '../../models/input-dialog-data';

@Component({
  selector: 'app-input-dialog',
  templateUrl: './input-dialog.component.html',
  styleUrls: ['./input-dialog.component.scss'],
})
export class InputDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: InputDialogData, private dialog: MatDialogRef<InputDialogComponent>) {}

  onNoClick() {
    this.dialog.close();
  }

  onEnter() {
    this.dialog.close(this.data.inputModel);
  }
}
