import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { SimpleDialogData } from '../../models/simple-dialog-data';

@Component({
  selector: 'app-simple-dialog',
  templateUrl: './simple-dialog.component.html',
  styleUrls: ['./simple-dialog.component.scss'],
})
export class SimpleDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) private data: SimpleDialogData) {}
}
