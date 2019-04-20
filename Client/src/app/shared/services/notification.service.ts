import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private snackBar: MatSnackBar) {}

  showMessage(text: string, action: string, duration: number) {
    this.snackBar.open(text, action, {
      duration: duration,
    });
  }
}
