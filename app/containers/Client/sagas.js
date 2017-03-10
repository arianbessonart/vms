import { call, put, takeLatest, fork, takeEvery, take, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE, push } from 'react-router-redux';
// import { BASE_URL } from 'common/constants';
const BASE_URL = 'http://localhost:3000/api';
import { clientsLoaded } from './actions';
import { LOAD_CLIENTS, LOAD_CLIENTS_SUCCESS } from './constants';
import request from '../../utils/request';


export function* getClients() {
  const requestURL = `${BASE_URL}/v1/clients`;
  try {
    const clients = yield call(request, requestURL);
    yield put(clientsLoaded(clients));
  } catch (err) {
    console.log(err);
    // yield put(repoLoadingError(err));
  }
}

export function* addInvoice(action) {
  console.log(action);
  const { storeId } = action.payload;
  const requestURL = `${BASE_URL}/v1/stores/${storeId}/invoices`;
  try {
    const watcher = yield call(request, requestURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(action.payload.invoice),
    });
    yield put(addInvoiceSuccessfully({ location: '/invoices' }));
    yield take(LOCATION_CHANGE);
    yield cancel(watcher);
  } catch (err) {
    console.log(err);
  }
}

export function* addInvoiceSuccess(action) {
  const url = action.payload.location;
  try {
    yield put(push(url));
  } catch (err) {
    console.log(err);
  }
}

export function* root() {
  const watcherClients = yield fork(takeLatest, LOAD_CLIENTS, getClients);
  yield take(LOCATION_CHANGE);
  yield cancel(watcherClients);
}

export default [
  root,
];
