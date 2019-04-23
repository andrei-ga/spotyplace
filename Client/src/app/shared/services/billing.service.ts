import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from './app-config.service';

@Injectable({
  providedIn: 'root',
})
export class BillingService {
  constructor(private http: HttpClient, private appConfigService: AppConfigService) {}

  generatePortalSession() {
    return this.http.post(`${this.appConfigService.getConfig().BASE_API_URL}billing/portal-session`, {}).toPromise();
  }

  generateHostedPage(planId: string) {
    return this.http.post(`${this.appConfigService.getConfig().BASE_API_URL}billing/hosted-page/${planId}`, {}).toPromise();
  }

  openPortal() {
    const instance = (window as any).Chargebee.getInstance();
    instance.setPortalSession(() => {
      return this.generatePortalSession();
    });

    const cbPortal = instance.createChargebeePortal();
    cbPortal.open({
      close() {
        // close callbacks
      },
    });
  }

  openSubscription() {
    const instance = (window as any).Chargebee.getInstance();
    instance.openCheckout({
      hostedPage: () => {
        return this.generateHostedPage('free');
      },
      success: (hostedPageId) => {
        // success callback
      },
    });
  }
}
