import { call, put, takeLatest, cancel, takeEvery, take } from 'redux-saga/effects';
import { push, LOCATION_CHANGE } from 'react-router-redux';
import { loginError, loginSuccess } from './actions';
import { LOGIN } from './constants';
import { request } from '../../utils/request';
const BASE_URL = 'http://localhost:3000/api';

// export function* getInvoices(action) {
//   const requestURL = `${BASE_URL}/v1/invoices`;
//   try {
//     const invoices = yield call(request, requestURL);
//     yield put(invoicesLoaded(invoices));
//   } catch (err) {
//     console.log(err);
//     // yield put(repoLoadingError(err));
//   }
// }

  // const requestURL = `${BASE_URL}/v1/invoices`;
  // try {
  //   const watcher = yield call(request, requestURL, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(invoice),
  //   });

export function* login(action) {
  try {
    const credentials = { username: action.username, password: action.password };
    const requestURL = `${BASE_URL}/v1/login`;
    const resp = yield call(request, requestURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    resp.user.token = user.token;
    window.localStorage.userData = JSON.stringify(user.user);

    yield put(loginSuccess(user.user));
    yield put(push('/'));
  } catch (err) {
    yield put(loginError(err));
  }
}

export function* root() {
  const watcherEditInvoiceSuccess = yield takeEvery(takeLatest, LOGIN, login);
  yield take(LOCATION_CHANGE);
  yield cancel(watcherEditInvoiceSuccess);
}

export default [
  root,
];
