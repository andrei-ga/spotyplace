import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MarkerInfo } from '../models/marker-info';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MarkerService {
  constructor(private http: HttpClient) {}

  updateMarkers(floorId: string, markers: MarkerInfo[]): Observable<boolean> {
    return this.http.put<boolean>(`${environment.BASE_API_URL}marker/${floorId}`, markers).pipe(catchError(() => of(false)));
  }

  getMarkers(floorId: string): Observable<MarkerInfo[]> {
    return this.http.get<MarkerInfo[]>(`${environment.BASE_API_URL}marker/${floorId}`).pipe(catchError(() => of([])));
  }
}
