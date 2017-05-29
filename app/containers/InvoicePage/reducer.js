import { fromJS, Map } from 'immutable';
import _ from 'lodash';

import {
  LOAD_INVOICES_SUCCESS,
  LOAD_INVOICES,
  LOAD_INVOICES_ERROR,
  ADD_INVOICE_SUCCESS,
  FILTER_INVOICES,
  LOAD_INVOICE_SUCCESS,
  CHANGE_INVOICE_FORM,
  ADD_ITEM,
  CHANGE_ITEM_AMOUNT,
  CHANGE_ITEM_DETAIL,
  DELETE_ITEM,
  INIT_INVOICE,
  CLEAR_SELECTED,
} from './constants';

const initialState = fromJS({
  loading: false,
  error: false,
  list: false,
  query: '',
  filters: {},
  selected: null,
  page: 0,
  limit: 0,
  total: 0,
  hasMore: false,
});

function invoiceReducer(state = initialState, action) {
  let totals;
  let selected;
  let list;
  switch (action.type) {
    case LOAD_INVOICES:
      list = action.page === 1 ? false : state.get('list');
      const filters = action.page === 1 ? {} : state.get('filters');
      const query = action.page === 1 ? '' : state.get('query');
      return state
        .set('loading', true)
        .set('loadingDelete', false)
        .set('error', false)
        .set('page', action.page)
        .set('limit', action.limit)
        .set('filters', filters)
        .set('query', query)
        .set('list', list);
    case LOAD_INVOICES_SUCCESS:
      list = action.result.page === 1 ? action.result.docs : _.concat(state.get('list'), action.result.docs);
      return state
        .set('list', list)
        .set('page', action.result.page)
        .set('limit', action.result.limit)
        .set('total', action.result.total)
        .set('filters', action.filters)
        .set('query', action.query)
        .set('hasMore', action.result.page * action.result.limit < action.result.total)
        .set('loading', false);
    case LOAD_INVOICES_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    case ADD_INVOICE_SUCCESS:
      return state
        .set('selected', initialState.get('selected'));
    case LOAD_INVOICE_SUCCESS:
      selected = action.payload;
      if (selected.date !== '') {
        selected.date = new Date(selected.date);
      }
      return state
        .set('selected', selected);
    case CHANGE_INVOICE_FORM:
      selected = state.get('selected');
      let value;
      if (action.payload.key === 'retention') {
        value = selected ? !selected.retention : true;
      } else {
        value = action.payload.value;
      }
      selected[action.payload.key] = value;
      return state.set('selected', { ...selected });
    case INIT_INVOICE:
      return state.set('selected', { items: [] });
    case CLEAR_SELECTED:
      return state.set('selected', null);
    case ADD_ITEM:
      selected = state.get('selected');
      selected.items = [...selected.items, action.payload];
      return state.set('selected', { ...selected });
    case CHANGE_ITEM_AMOUNT:
      selected = state.get('selected');
      selected.items = [
        ...selected.items.slice(0, action.payload.index),
        { ...selected.items[action.payload.index], amount: action.payload.value },
        ...selected.items.slice(action.payload.index + 1),
      ];
      totals = sumInvoiceItems(selected.items);
      return state.set('selected', { ...selected, ...totals });
    case CHANGE_ITEM_DETAIL:
      selected = state.get('selected');
      selected.items = [
        ...selected.items.slice(0, action.payload.index),
        { ...selected.items[action.payload.index], detail: action.payload.value },
        ...selected.items.slice(action.payload.index + 1),
      ];
      return state.set('selected', { ...selected });
    case DELETE_ITEM:
      selected = state.get('selected');
      selected.items = selected.items.filter((i, idx) => idx !== action.payload);
      totals = sumInvoiceItems(selected.items);
      return state.set('selected', { ...selected, ...totals });
    default:
      return state;
  }
}

function sumInvoiceItems(items) {
  let subTotal = 0;
  if (items.length === 1) {
    subTotal = items[0].amount;
  } else if (items.length > 1) {
    subTotal = items.map((i) => i.amount)
      .reduce((a, b) => {
        if (b !== '' && !isNaN(b)) {
          return Number(a) + Number(b);
        }
        return Number(a);
      }, 0);
  }
  subTotal = Number(subTotal);
  const iva = subTotal * 0.22;
  const total = subTotal + iva;
  return { subTotal, iva, total };
}

Number.prototype.format = function(n, x) {
  const re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
  return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
};

export default invoiceReducer;
