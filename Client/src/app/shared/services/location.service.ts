import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LocationInfo } from '../models/location-info';
import { LocationCreateRequest } from '../models/location-create-request';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  constructor(private http: HttpClient) {}

  getMyLocations(): Observable<LocationInfo[]> {
    return this.http.get<LocationInfo[]>(`${environment.BASE_API_URL}location/mine`);
  }

  createLocation(location: LocationCreateRequest): Observable<boolean> {
    return this.http.post<boolean>(`${environment.BASE_API_URL}location`, location);
  }

  editLocation(id: string, location: LocationCreateRequest): Observable<boolean> {
    return this.http.put<boolean>(`${environment.BASE_API_URL}location/${id}`, location);
  }

  deleteLocation(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${environment.BASE_API_URL}location/${id}`);
  }
}
