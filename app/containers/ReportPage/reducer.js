import { fromJS } from 'immutable';

const initialState = fromJS({
  list: false,
  selected: false,
  loading: false,
  error: false,
});

function reportReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default reportReducer;
