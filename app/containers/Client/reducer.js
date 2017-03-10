import { fromJS } from 'immutable';
import { ADD_INVOICE_SUCCESS } from '../InvoicePage/constants';
import {
  LOAD_CLIENTS,
  LOAD_CLIENTS_SUCCESS,
  LOAD_CLIENTS_ERROR,
  SELECT_CLIENT,
} from './constants';

import {
  LOAD_INVOICE_SUCCESS,
} from '../InvoicePage/constants';

const initialState = fromJS({
  list: false,
  selected: false,
  loading: false,
  error: false,
});

function clientReducer(state = initialState, action) {
  let selected;
  switch (action.type) {
    case LOAD_CLIENTS:
      return state
        .set('loading', true)
        .set('error', false)
        .set('list', false);
    case LOAD_CLIENTS_SUCCESS:
      return state
        .set('list', action.clients)
        .set('loading', false);
    case LOAD_CLIENTS_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    case SELECT_CLIENT:
      selected = state.get('list').find((o) => o._id == action.payload);
      return state
        .set('selected', selected);
    case ADD_INVOICE_SUCCESS:
      return state.set('selected', false);
    case LOAD_INVOICE_SUCCESS:
      selected = state.get('list').find((o) => o._id == action.payload.client);
      console.log(selected);
      return state
        .set('selected', selected);
    default:
      return state;
  }
}

export default clientReducer;
