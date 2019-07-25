import { SubscriptionStatusEnum } from './subscription-status-enum';
import { UserLevelEnum } from './user-level-enum';

export class UserInfo {
  fullName: string;

  email: string;

  id: string;

  chargebeeId: string;

  chargebeePlanId: string;

  chargebeeSubscriptionStatus: SubscriptionStatusEnum;

  userLevel: UserLevelEnum;
}
