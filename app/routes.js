// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business
import { getAsyncInjectors } from 'utils/asyncInjectors';
import authHooks from './utils/authHook';

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};

export default function createRoutes(store) {
  // Create reusable async injectors using getAsyncInjectors factory
  const { injectReducer, injectSagas, authenticated } = authHooks( store ); // eslint-disable-line no-unused-vars

  return [
    {
      onEnter: authenticated,
      path: '/',
      name: 'home',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/HomePage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([component]) => {
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },
    {
      onEnter: authenticated,
      path: '/invoices',
      name: 'invoicePage',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
        import('containers/InvoicePage/reducer'),
        import ('containers/InvoicePage/sagas'),
        import('containers/InvoicePage'),
      ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer ('invoice', reducer.default );
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },
    {
      onEnter: authenticated,
      path: '/invoices/new',
      name: 'invoiceNewPage',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
        import('containers/InvoicePage/reducer'),
        import('containers/Client/reducer'),
        import ('containers/InvoicePage/sagas'),
        import ('containers/Client/sagas'),
        import('containers/InvoicePage/NewInvoice'),
      ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducerInvoice, reducerClient, sagasInvoice, sagasClient, component]) => {
          injectReducer ('invoice', reducerInvoice.default);
          injectReducer ('client', reducerClient.default);
          injectSagas(sagasInvoice.default);
          injectSagas(sagasClient.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },
    {
      onEnter: authenticated,
      path: '/invoices/:invoiceId/edit',
      name: 'invoiceEditPage',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
        import('containers/InvoicePage/reducer'),
        import('containers/Client/reducer'),
        import ('containers/InvoicePage/sagas'),
        import ('containers/Client/sagas'),
        import('containers/InvoicePage/EditInvoice'),
      ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducerInvoice, reducerClient, sagasInvoice, sagasClient, component]) => {
          injectReducer ('invoice', reducerInvoice.default);
          injectReducer ('client', reducerClient.default);
          injectSagas(sagasInvoice.default);
          injectSagas(sagasClient.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },
    {
      onEnter: authenticated,
      path: '/reports',
      name: 'reportsPage',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
        import('containers/ReportPage/reducer'),
        import ('containers/ReportPage/sagas'),
        import('containers/ReportPage/'),
      ]);

        const renderRoute = loadModule(cb);
        importModules.then(([reducer, sagas, component]) => {
          injectReducer ('report', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },
    {
      path: '*',
      name: 'notfound',
      getComponent(nextState, cb) {
        import('containers/NotFoundPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    },
  ];
}
