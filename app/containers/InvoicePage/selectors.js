import { createSelector } from 'reselect';

const selectInvoice = (state) => state.get('invoice');

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
    String(i.active).toLowerCase().indexOf(filterLc) !== -1 || i.client.name.toLowerCase().indexOf(filterLc) !== -1);
  },
);

const selectFilterInput = () => createSelector(
  selectInvoice,
  (invoiceState) => invoiceState.get('filter')
);

const selectSelectedInvoice = () => createSelector(
  selectInvoice,
  (invoiceState) => invoiceState.get('selected')
);


export {
  selectInvoices,
  selectFilterInvoices,
  selectFilterInput,
  selectSelectedInvoice,
};
