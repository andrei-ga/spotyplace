import { UserInfo } from '../models/user-info';
import { Record } from 'immutable';

export interface SharedState extends Map<string, any> {
  userInfo: UserInfo;
}

export const SharedStateRecord = Record({
  userInfo: null,
});
