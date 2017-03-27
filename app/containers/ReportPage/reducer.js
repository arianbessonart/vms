import { fromJS } from 'immutable';

import {
  LOAD_REPORT_SUCCESS,
} from './constants';

const initialState = fromJS({
  main: false,
  loading: false,
  error: false,
});

function reportReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_REPORT_SUCCESS:
      return state
        .set('main', action.reports)
        .set('loading', false);
    default:
      return state;
  }
}

export default reportReducer;
