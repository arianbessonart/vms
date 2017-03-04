import { fromJS } from 'immutable';

import {
  LOAD_INVOICES_SUCCESS,
  LOAD_INVOICES,
  LOAD_INVOICES_ERROR,
  ADD_INVOICE_SUCCESS,
  FILTER_INVOICES,
  LOAD_INVOICE_SUCCESS,
} from './constants';

const initialState = fromJS({
  loading: false,
  error: false,
  list: false,
  filter: '',
  selected: null,
});

function invoiceReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_INVOICES:
      return state
        .set('loading', true)
        .set('error', false)
        .set('list', false);
    case LOAD_INVOICES_SUCCESS:
      return state
        .set('list', action.invoices)
        .set('loading', false);
    case LOAD_INVOICES_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    case ADD_INVOICE_SUCCESS:
      return state
        .set('error', false);
    case FILTER_INVOICES:
      return state
        .set('filter', action.payload);
    case LOAD_INVOICE_SUCCESS:
      return state
        .set('selected', action.payload);
    default:
      return state;
  }
}

Number.prototype.format = function(n, x) {
  var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
  return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
};

export default invoiceReducer;
