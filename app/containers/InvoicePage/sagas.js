import { call, put, takeLatest, fork, takeEvery, take, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE, push } from 'react-router-redux';
import { request } from '../../utils/request';

// import { BASE_URL } from 'common/constants';
import { invoicesLoaded, invoiceLoaded, loadInvoices, addInvoiceSuccessfully, editInvoiceSuccessfully } from './actions';
import { LOAD_INVOICES, LOAD_INVOICE, DELETE_INVOICE, ADD_INVOICE,
  ADD_INVOICE_SUCCESS, EDIT_INVOICE, EDIT_INVOICE_SUCCESS,
} from './constants';
const BASE_URL = 'http://localhost:3000/api';


export function* getInvoices(action) {
  const requestURL = `${BASE_URL}/v1/invoices`;
  try {
    const invoices = yield call(request, requestURL);
    yield put(invoicesLoaded(invoices));
  } catch (err) {
    console.log(err);
    // yield put(repoLoadingError(err));
  }
}

// TODO: change this call to a specific one
export function* getInvoice(action) {
  const requestURL = `${BASE_URL}/v1/invoices/${action.invoiceId}`;
  try {
    const invoice = yield call(request, requestURL);
    yield put(invoiceLoaded(invoice));
  } catch (err) {
    console.log(err);
    // yield put(repoLoadingError(err));
  }
}

export function* deleteInvoice(action) {
  const requestURL = `${BASE_URL}/v1/invoices/${action.payload}`;
  try {
    yield call(request, requestURL, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    yield put(loadInvoices());
  } catch (err) {
    console.log(err);
  }
}

export function* addInvoice(action) {
  console.log(action);
  const { invoice, clientId } = action.payload;
  invoice.client = clientId;
  const requestURL = `${BASE_URL}/v1/invoices`;
  try {
    const watcher = yield call(request, requestURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(invoice),
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

export function* editInvoice(action) {
  const { invoiceId, invoice } = action.payload;
  const requestURL = `${BASE_URL}/v1/invoices/${invoiceId}`;
  try {
    const watcher = yield call(request, requestURL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(invoice),
    });
    yield put(editInvoiceSuccessfully({ location: '/invoices' }));
    yield take(LOCATION_CHANGE);
    yield cancel(watcher);
  } catch (err) {
    console.log(err);
  }
}

export function* editInvoiceSuccess(action) {
  const url = action.payload.location;
  try {
    yield put(push(url));
  } catch (err) {
    console.log(err);
  }
}


export function* root() {
  const watcherInvoices = yield fork(takeLatest, LOAD_INVOICES, getInvoices);
  const watcherDeleteInvoice = yield fork(takeLatest, DELETE_INVOICE, deleteInvoice);
  const watcherAddInvoice = yield takeEvery(ADD_INVOICE, addInvoice);
  const watcherAddInvoiceSuccess = yield takeEvery(ADD_INVOICE_SUCCESS, addInvoiceSuccess);
  const watcherLoadInvoice = yield takeEvery(LOAD_INVOICE, getInvoice);
  const watcherEditInvoice = yield takeEvery(EDIT_INVOICE, editInvoice);
  const watcherEditInvoiceSuccess = yield takeEvery(EDIT_INVOICE_SUCCESS, editInvoiceSuccess);
  yield take(LOCATION_CHANGE);
  yield cancel(watcherInvoices);
  yield cancel(watcherDeleteInvoice);
  yield cancel(watcherAddInvoice);
  yield cancel(watcherAddInvoiceSuccess);
  yield cancel(watcherLoadInvoice);
  yield cancel(watcherEditInvoice);
  yield cancel(watcherEditInvoiceSuccess);
}

export default [
  root,
];
