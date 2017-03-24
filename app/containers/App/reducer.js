import { Map } from 'immutable';

import {
  LOGIN_SUCCESS,
  LOGOUT,
  LOGIN,
  LOGIN_ERROR,
} from './constants';

const initialState = Map({
  error: false,
  currentUser: window.localStorage.userData ? JSON.parse(window.localStorage.userData) : false,
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return state
          .set('error', false)
          .set('currentUser', action.user);
    case LOGOUT:
      return state
          .set('error', true)
          .set('currentUser', false);
    case LOGIN:
      return state
          .set('error', false)
          .set('currentUser', false);
    case LOGIN_ERROR:
      return state
          .set('token', '')
          .set('error', true)
          .set('currentUser', false);
    default:
      return state;
  }
}

export default appReducer;
