import { createSelector } from 'reselect';

const selectInvoice = (state) => state.get('invoice');

const selectInvoices = () => createSelector(
  selectInvoice,
  (invoiceState) => invoiceState.get('list')
);

const selectSelectedInvoice = () => createSelector(
  selectInvoice,
  (invoiceState) => invoiceState.get('selected')
);

const selectLoading = () => createSelector(
  selectInvoice,
  (invoiceState) => invoiceState.get('loading')
);

const selectHasMore = () => createSelector(
  selectInvoice,
  (invoiceState) => invoiceState.get('hasMore')
);

const selectPage = () => createSelector(
  selectInvoice,
  (invoiceState) => invoiceState.get('page')
);

const selectFilters = () => createSelector(
  selectInvoice,
  (invoiceState) => invoiceState.get('filters')
);

const selectQuery = () => createSelector(
  selectInvoice,
  (invoiceState) => invoiceState.get('query')
);


export {
  selectInvoices,
  selectSelectedInvoice,
  selectLoading,
  selectHasMore,
  selectPage,
  selectFilters,
  selectQuery,
};
