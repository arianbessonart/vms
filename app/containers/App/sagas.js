import { call, put, takeLatest, cancel, fork, take } from 'redux-saga/effects';
import { push, LOCATION_CHANGE } from 'react-router-redux';
import { loginError, loginSuccess } from './actions';
import { LOGIN, LOGOUT } from './constants';
import { request } from '../../utils/request';
const BASE_URL = 'http://localhost:3001/api';

export function* login(action) {
  try {
    const credentials = { username: action.username, password: action.password };
    const requestURL = `${BASE_URL}/v1/auth/login`;
    const resp = yield call(request, requestURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    resp.user.token = resp.token;
    window.localStorage.userData = JSON.stringify(resp.user);

    yield put(loginSuccess(resp.user));
    yield put(push('/invoices'));
  } catch (err) {
    yield put(loginError(err));
  }
}

export function* logout() {
  try {
    window.localStorage.removeItem('userData');
    yield put(push('/login'));
  } catch (err) {
    yield put(loginError(err));
  }
}


export function* root() {
  const watcherLoginSuccess = yield fork(takeLatest, LOGIN, login);
  const watcherLogout = yield fork(takeLatest, LOGOUT, logout);
  yield take(LOCATION_CHANGE);
  yield cancel(watcherLoginSuccess);
  yield cancel(watcherLogout);
}

export default [
  root,
];
