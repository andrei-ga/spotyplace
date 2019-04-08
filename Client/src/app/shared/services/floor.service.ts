import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppConfigService } from './app-config.service';

@Injectable({
  providedIn: 'root',
})
export class FloorService {
  constructor(private http: HttpClient, private appConfigService: AppConfigService) {}

  createFloor(locationId: string, floorName: string, file: File): Observable<boolean> {
    const formData = new FormData();
    formData.append('name', floorName);
    formData.append('file', file, file.name);

    return this.http
      .post<boolean>(`${this.appConfigService.getConfig().BASE_API_URL}floor/${locationId}`, formData)
      .pipe(catchError(() => of(false)));
  }

  editFloor(id: string, floorName: string, file: File): Observable<boolean> {
    const formData = new FormData();
    formData.append('name', floorName);
    if (file) {
      formData.append('file', file, file.name);
    }

    return this.http
      .put<boolean>(`${this.appConfigService.getConfig().BASE_API_URL}floor/${id}`, formData)
      .pipe(catchError(() => of(false)));
  }

  deleteFloor(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.appConfigService.getConfig().BASE_API_URL}floor/${id}`).pipe(catchError(() => of(false)));
  }
}
