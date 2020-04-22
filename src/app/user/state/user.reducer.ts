import * as fromRoot from '../../state/app.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { User } from '../user';
import { UserActionTypes, UserActions } from './user.action';

export interface State extends fromRoot.State {
  user: UserState;
}

export interface UserState {
  maskUserName: boolean;
  currentUser: User;
}

const initialState: UserState = {
  maskUserName: true,
  currentUser: null
};


const maskUsernameState = createFeatureSelector<UserState>('users');

export const getMaskUserName = createSelector(
  maskUsernameState,
  state => state.maskUserName
);

export function reducer(state= initialState, action: UserActions): UserState {
  switch (action.type) {

    case UserActionTypes.MaskUserName:
      return {
        ...state,
        maskUserName: action.payload
      };

    case  UserActionTypes.GetUser:
      return {
        ...state,
        currentUser: action.payload
      };

    default:
      return state;
  }
}
