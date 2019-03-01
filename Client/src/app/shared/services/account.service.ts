import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserInfo } from '../models/user-info';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private http: HttpClient) {}

  getInfo(): Observable<UserInfo> {
    return this.http.get<UserInfo>(`${environment.BASE_API_URL}account/info`);
  }

  logout(): Observable<boolean> {
    return this.http.post<boolean>(`${environment.BASE_API_URL}account/logout`, {});
  }
}
