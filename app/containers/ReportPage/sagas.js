import { call, put, takeLatest, fork, takeEvery, take, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE, push } from 'react-router-redux';
const BASE_URL = 'http://localhost:3000/api';
import { request } from '../../utils/request';


export function* root() {
  yield take(LOCATION_CHANGE);
}

export default [
  root,
];
