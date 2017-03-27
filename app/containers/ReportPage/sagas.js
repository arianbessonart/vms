import { call, put, takeLatest, fork, takeEvery, take, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE, push } from 'react-router-redux';
import { LOAD_REPORT } from './constants';
import { reportsLoaded } from './actions';
const BASE_URL = 'http://localhost:3001/api';
import { request } from '../../utils/request';


export function* loadReport(action) {
  const requestURL = `${BASE_URL}/v1/reports/byMonth`;
  try {
    const reports = yield call(request, requestURL);
    yield put(reportsLoaded(reports));
  } catch (err) {
    console.log(err);
    // yield put(repoLoadingError(err));
  }
}

export function* root() {
  const watcherLoadReport = yield takeEvery(LOAD_REPORT, loadReport);
  yield take(LOCATION_CHANGE);
  yield cancel(watcherLoadReport);
}

export default [
  root,
];
