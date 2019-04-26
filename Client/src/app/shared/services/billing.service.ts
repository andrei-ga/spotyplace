import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from './app-config.service';
import { SubscriptionPlan } from '../models/subscription-plan';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';
import { CustomerSubscription } from '../models/customer-subscription';
import { SubscriptionActions } from '../actions/subscription.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';

@Injectable({
  providedIn: 'root',
})
export class BillingService {
  constructor(
    private http: HttpClient,
    private appConfigService: AppConfigService,
    private store: Store<AppState>,
    private subscriptionActions: SubscriptionActions,
    private ngZone: NgZone
  ) {}

  generatePortalSession() {
    return this.http.post(`${this.appConfigService.getConfig().BASE_API_URL}billing/portal-session`, {}).toPromise();
  }

  generateHostedPage(planId: string) {
    return this.http.post(`${this.appConfigService.getConfig().BASE_API_URL}billing/hosted-page/${planId}`, {}).toPromise();
  }

  getSubscriptionPlans(): Observable<SubscriptionPlan[]> {
    return this.http
      .get<SubscriptionPlan[]>(`${this.appConfigService.getConfig().BASE_API_URL}billing/plans`)
      .pipe(catchError(() => of([])));
  }

  getCurrentSubscriptions(): Observable<CustomerSubscription> {
    return this.http
      .get<CustomerSubscription>(`${this.appConfigService.getConfig().BASE_API_URL}billing/customer/subscription`)
      .pipe(catchError(() => of(null)));
  }

  openPortal() {
    const instance = (window as any).Chargebee.getInstance();
    instance.setPortalSession(() => {
      return this.generatePortalSession();
    });

    const cbPortal = instance.createChargebeePortal();
    cbPortal.open({
      subscriptionChanged: () => {
        this.ngZone.run(() => {
          this.store.dispatch(this.subscriptionActions.getCurrentSubscription());
        });
      },
      subscriptionCancelled: () => {
        this.ngZone.run(() => {
          this.store.dispatch(this.subscriptionActions.getCurrentSubscription());
        });
      },
      subscriptionReactivated: () => {
        this.ngZone.run(() => {
          this.store.dispatch(this.subscriptionActions.getCurrentSubscription());
        });
      },
    });
  }

  openSubscription(planId: string) {
    const instance = (window as any).Chargebee.getInstance();
    instance.openCheckout({
      hostedPage: () => {
        return this.generateHostedPage(planId);
      },
      success: () => {
        this.ngZone.run(() => {
          this.store.dispatch(this.subscriptionActions.getCurrentSubscription());
        });
      },
    });
  }
}
