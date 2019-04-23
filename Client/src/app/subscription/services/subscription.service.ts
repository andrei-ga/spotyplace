import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from '../../shared/services/app-config.service';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionService {
  constructor(private http: HttpClient, private appConfigService: AppConfigService) {}

  generateSession() {
    this.http.post(`${this.appConfigService.getConfig().BASE_API_URL}subscription/session`, {}).toPromise();
  }
}
