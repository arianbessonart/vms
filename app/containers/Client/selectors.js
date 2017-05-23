import { createSelector } from 'reselect';

const selectClient = (state) => state.get('client');

const selectClients = () => createSelector(
  selectClient,
  (clientState) => clientState.get('list')
);

const selectSelectedClient = () => createSelector(
  selectClient,
  (clientState) => clientState.get('selected')
);

export {
  selectClients,
  selectSelectedClient,
};
