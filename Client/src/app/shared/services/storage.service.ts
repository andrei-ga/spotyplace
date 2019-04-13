import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  preferencesCookiesAccepted = false;

  static getValue(key: string, defaultValue: string): string {
    return localStorage.getItem(key) || defaultValue;
  }

  setPreferencesCookiesAccepted(value: boolean) {
    this.preferencesCookiesAccepted = value;
  }

  setValue(key: string, value: string) {
    if (this.preferencesCookiesAccepted) {
      localStorage.setItem(key, value);
    }
  }
}
