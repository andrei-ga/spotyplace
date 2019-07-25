import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from './app-config.service';
import { SubscriptionPlan } from '../models/subscription-plan';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { AccountActions } from '../actions/account.actions';

@Injectable({
  providedIn: 'root',
})
export class BillingService {
  constructor(
    private http: HttpClient,
    private appConfigService: AppConfigService,
    private store: Store<AppState>,
    private accountActions: AccountActions,
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

  openPortal() {
    const instance = (window as any).Chargebee.getInstance();
    instance.setPortalSession(() => {
      return this.generatePortalSession();
    });

    const cbPortal = instance.createChargebeePortal();
    cbPortal.open({
      subscriptionChanged: () => {
        this.ngZone.run(() => {
          this.store.dispatch(this.accountActions.getAccountInfo(true));
        });
      },
      subscriptionReactivated: () => {
        this.ngZone.run(() => {
          this.store.dispatch(this.accountActions.getAccountInfo(true));
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
          this.store.dispatch(this.accountActions.getAccountInfo(true));
        });
      },
    });
  }
}
