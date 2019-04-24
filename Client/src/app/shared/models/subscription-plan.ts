import { SubscriptionPeriodUnitEenum } from './subscription-period-unit-enum';
import { SubscriptionTrialPeriodUnitEenum } from './subscription-trial-period-unit-enum';

export class SubscriptionPlan {
  id: string;

  name: string;

  price?: number;

  period: number;

  periodUnit: SubscriptionPeriodUnitEenum;

  trialPeriod?: number;

  trialPeriodUnit?: SubscriptionTrialPeriodUnitEenum;
}
