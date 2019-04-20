import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConfigService } from './app-config.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  constructor(private http: HttpClient, private appConfigService: AppConfigService) {}

  sendReport(reportReason: number): Observable<boolean> {
    return this.http
      .post<boolean>(`${this.appConfigService.getConfig().BASE_API_URL}report`, { reportReason })
      .pipe(catchError(() => of(false)));
  }
}
