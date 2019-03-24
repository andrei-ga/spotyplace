import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FloorService {
  constructor(private http: HttpClient) {}

  createFloor(locationId: string, floorName: string, file: File): Observable<boolean> {
    const formData = new FormData();
    formData.append('name', floorName);
    formData.append('file', file, file.name);

    return this.http.post<boolean>(`${environment.BASE_API_URL}floor/${locationId}`, formData);
  }

  deleteFloor(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${environment.BASE_API_URL}floor/${id}`);
  }
}
