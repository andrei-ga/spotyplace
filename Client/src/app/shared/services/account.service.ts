import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { UserInfo } from '../models/user-info';
import { environment } from '../../../environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private http: HttpClient) {}

  getInfo(): Observable<UserInfo> {
    return this.http.get<UserInfo>(`${environment.BASE_API_URL}account/info`).pipe(catchError(() => of(null)));
  }

  logout(): Observable<boolean> {
    return this.http.post<boolean>(`${environment.BASE_API_URL}account/logout`, {}).pipe(catchError(() => of(false)));
  }
}
