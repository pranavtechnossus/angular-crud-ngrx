import { Action } from '@ngrx/store';
import { User } from '../user';

export enum UserActionTypes {
  MaskUserName = '[User] Toggle Username Mask',
  GetUser = '[User] Get User'
}


export class ToggleUserNameMask implements Action {
  readonly type = UserActionTypes.MaskUserName;

  constructor(public payload: boolean) {}
}

export class GetUser implements Action {
  readonly type = UserActionTypes.GetUser;

  constructor(public payload: User) {}
}


export type UserActions = ToggleUserNameMask
  | GetUser;
