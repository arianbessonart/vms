import { fromJS, Map } from 'immutable';

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
} from './constants';

const initialState = fromJS({
  list: [],
  selected: {date: null, items: [], total: 0, subTotal: 0, iva: 0, name: "", number: "", retention: true},
  filter: "",
  loading: false,
  error: false,
});

function invoiceReducer(state = initialState, action) {
  let totals;
  let selected;
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
        .set('selected', initialState.get('selected'));
    case FILTER_INVOICES:
      return state
        .set('filter', action.payload);
    case LOAD_INVOICE_SUCCESS:
      selected = action.payload;
      if (selected.date !== "") {
        selected.date = new Date(selected.date);
      }
      return state
        .set('selected', new Map(selected));
    case CHANGE_INVOICE_FORM:
      let value = action.payload.value;
      if (action.payload.key === 'retention') {
        value = !state.get('selected').get('retention');
      }
      return state.setIn(['selected', action.payload.key], value);
    case ADD_ITEM:
      return state.updateIn(['selected', 'items'], arr => arr.push(action.payload));
    case CHANGE_ITEM_AMOUNT:
      let item = state.getIn(['selected', 'items', action.payload.index]);
      state = state.setIn(['selected', 'items', action.payload.index], {...item, amount: action.payload.value});
      totals = sumInvoiceItems(state.getIn(['selected', 'items']).toJS());
      return state
        .setIn(['selected', 'subTotal'], totals.subTotal)
        .setIn(['selected', 'iva'], totals.iva)
        .setIn(['selected', 'total'], totals.total);
    case CHANGE_ITEM_DETAIL:
      const itemDetail = state.getIn(['selected', 'items', action.payload.index]);
      return state.setIn(['selected', 'items', action.payload.index], {...itemDetail, detail: action.payload.value});
    case DELETE_ITEM:
      state = state.setIn(['selected', 'items'], state.getIn(['selected', 'items']).filter((i, index) => {
        return index !== action.payload;
      }));
      totals = sumInvoiceItems(state.getIn(['selected', 'items']).toJS());
      return state
        .setIn(['selected', 'subTotal'], totals.subTotal)
        .setIn(['selected', 'iva'], totals.iva)
        .setIn(['selected', 'total'], totals.total);
    default:
      return state;
  }
}

function sumInvoiceItems(items) {
  var subTotal = 0;
  if (items.length == 1) {
    subTotal = items[0].amount;
  } else if (items.length > 1) {
    subTotal = items.map((i) => i.amount)
      .reduce((a, b) => {
        if (b !== "" && !isNaN(b)) {
          return Number(a) + Number(b);
        } else {
          return Number(a);
        }
      }, 0);
  }
  subTotal = Number(subTotal);
  var iva = subTotal * 0.22;
  var total = subTotal + iva;
  total = Number(total).format(2);
  subTotal = Number(subTotal).format(2);
  iva = Number(iva).format(2);
  return {subTotal, iva, total};
}

Number.prototype.format = function(n, x) {
  const re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
  return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
};

export default invoiceReducer;
