import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor() {}

  static generateId(length?: number): string {
    if (length === null || length === undefined) {
      length = 5;
    }
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  }

  getBase64(file): Observable<string | ArrayBuffer> {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    return new Observable((observer) => {
      reader.onloadend = () => {
        observer.next(reader.result);
        observer.complete();
      };
    });
  }
}
