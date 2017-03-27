import { createSelector } from 'reselect';
import { Iterable } from 'immutable';
import moment from 'moment';

const selectGlobal = (state) => state.get('global');
const selectInvoice = (state) => state.get('invoice');
const selectClient = (state) => state.get('client');

const selectInvoices = () => createSelector(
  selectInvoice,
  (invoiceState) => invoiceState.get('list')
);

const selectFilterInvoices = () => createSelector(
  selectInvoice,
  (invoiceState) => {
    const filterLc = invoiceState.get('filter').toLowerCase();
    if (!filterLc || filterLc.length === 0) {
      return invoiceState.get('list');
    }
    return invoiceState.get('list').filter((i) => i.name.toLowerCase().indexOf(filterLc) !== -1 ||
    String(i.active).toLowerCase().indexOf(filterLc) !== -1 || i.client.name.toLowerCase().indexOf(filterLc) !== -1 ||
    moment(i.date).format('DD-MM-YYYY').indexOf(filterLc) !== -1);
  }
);

const selectFilterInput = () => createSelector(
  selectInvoice,
  (invoiceState) => invoiceState.get('filter')
);

const selectSelectedInvoice = () => createSelector(
  selectInvoice,
  (invoiceState) => {
    if (Iterable.isIterable(invoiceState.get('selected'))) {
      return invoiceState.get('selected').toJS();
    }
    return invoiceState.get('selected');
  }
);


const selectClients = () => createSelector(
  selectClient,
  (clientState) => clientState.get('list')
);

const selectSelectedClient = () => createSelector(
  selectClient,
  (clientState) => clientState.get('selected')
);

const selectCurrentUser = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('currentUser')
);


// makeSelectLocationState expects a plain JS object for the routing state
const makeSelectLocationState = () => {
  let prevRoutingState;
  let prevRoutingStateJS;

  return (state) => {
    const routingState = state.get('route'); // or state.route

    if (!routingState.equals(prevRoutingState)) {
      prevRoutingState = routingState;
      prevRoutingStateJS = routingState.toJS();
    }

    return prevRoutingStateJS;
  };
};

export {
  makeSelectLocationState,
  selectInvoices,
  selectFilterInvoices,
  selectFilterInput,
  selectSelectedInvoice,
  selectClients,
  selectSelectedClient,
  selectCurrentUser,
};
