import { AfterViewInit, Component } from '@angular/core';
import { SubscriptionService } from '../../../subscription/services/subscription.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss'],
})
export class SubscriptionComponent implements AfterViewInit {
  constructor(private subscriptionService: SubscriptionService) {}

  ngAfterViewInit() {
    (window as any).Chargebee.init({
      site: environment.CHARGEBEE_SITE_ID,
    });
  }

  checkout() {
    const chargebeeInstance = (window as any).Chargebee.getInstance();
    chargebeeInstance.openCheckout({
      hostedPage: () => {
        return this.subscriptionService.generateSession();
      },
    });
  }
}
