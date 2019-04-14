import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { InputDialogData } from '../../models/input-dialog-data';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-input-dialog',
  templateUrl: './input-dialog.component.html',
  styleUrls: ['./input-dialog.component.scss'],
})
export class InputDialogComponent {
  inputControl: FormControl;

  constructor(@Inject(MAT_DIALOG_DATA) public data: InputDialogData, private dialog: MatDialogRef<InputDialogComponent>) {
    this.inputControl = new FormControl('', [
      Validators.required,
      Validators.minLength(data.inputMinLength),
      Validators.maxLength(data.inputMaxLength),
      Validators.pattern(data.inputPattern),
    ]);
    this.inputControl.patchValue(data.inputModel);
  }

  onNoClick() {
    this.dialog.close();
  }

  onEnter() {
    this.dialog.close(this.inputControl.value);
  }
}
