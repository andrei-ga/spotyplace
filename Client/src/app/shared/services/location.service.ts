import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LocationInfo } from '../models/location-info';
import { LocationCreateRequest } from '../models/location-create-request';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  constructor(private http: HttpClient) {}

  getMyLocations(): Observable<LocationInfo[]> {
    return this.http.get<LocationInfo[]>(`${environment.BASE_API_URL}location/mine`).pipe(catchError(() => of([])));
  }

  getLocation(id: string): Observable<LocationInfo> {
    return this.http.get<LocationInfo>(`${environment.BASE_API_URL}location/${id}`).pipe(catchError(() => of(null)));
  }

  createLocation(location: LocationCreateRequest): Observable<boolean> {
    return this.http.post<boolean>(`${environment.BASE_API_URL}location`, location).pipe(catchError(() => of(false)));
  }

  editLocation(id: string, location: LocationCreateRequest): Observable<boolean> {
    return this.http.put<boolean>(`${environment.BASE_API_URL}location/${id}`, location).pipe(catchError(() => of(false)));
  }

  deleteLocation(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${environment.BASE_API_URL}location/${id}`).pipe(catchError(() => of(false)));
  }

  searchLocation(keyword: string): Observable<LocationInfo[]> {
    return this.http
      .get<LocationInfo[]>(`${environment.BASE_API_URL}location/${encodeURIComponent(keyword)}/search`)
      .pipe(catchError(() => of([])));
  }
}
