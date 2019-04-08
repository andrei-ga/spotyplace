import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { UserInfo } from '../models/user-info';
import { catchError } from 'rxjs/operators';
import { AppConfigService } from './app-config.service';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private http: HttpClient, private appConfigService: AppConfigService) {}

  getInfo(): Observable<UserInfo> {
    return this.http.get<UserInfo>(`${this.appConfigService.getConfig().BASE_API_URL}account/info`).pipe(catchError(() => of(null)));
  }

  logout(): Observable<boolean> {
    return this.http.post<boolean>(`${this.appConfigService.getConfig().BASE_API_URL}account/logout`, {}).pipe(catchError(() => of(false)));
  }
}
