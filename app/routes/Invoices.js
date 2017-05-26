import { loadModule, errorLoading } from "./util";

export default asyncInjectors => ({
  path: "/invoices",
  name: "invoicesPage",
  title: "Facturas",
  getComponent(nextState, cb) {
    const importModules = Promise.all([
      import("containers/InvoicePage/reducer"),
      import("containers/InvoicePage/sagas"),
      import("containers/InvoicePage"),
      import('components/Invoice/InvoiceActionBar')
    ]);

    const renderRoute = loadModule(cb);
    importModules.then(([reducer, sagas, component, actionBar]) => {
      asyncInjectors.injectReducer("invoice", reducer.default);
      asyncInjectors.injectSagas(sagas.default);
      renderRoute({
        children: component.default,
        actionBar: actionBar.default,
      });
    });
    importModules.catch(errorLoading);
  },
  getChildRoutes(nextState, callback) {
    require.ensure([], function(require) {
      callback(null, [
        // {
        //   path: "/invoices/add",
        //   getComponent(nextState, cb) {
        //     const importModules = Promise.all([
        //       import("containers/Client/reducer"),
        //       import("containers/Client/sagas"),
        //       import("containers/InvoicePage/InvoiceAddContainer")
        //     ]);

        //     const renderRoute = loadModule(cb);
        //     importModules.then(([reducer, sagas, component]) => {
        //       asyncInjectors.injectReducer("client", reducer.default);
        //       asyncInjectors.injectSagas(sagas.default);
        //       renderRoute({
        //         modal: component.default,
        //       });
        //     });
        //     importModules.catch(errorLoading);
        //   }
        // },
        {
          path: "/invoices/:invoiceId",
          getComponent(nextState, cb) {
            const importModules = Promise.all([
              import("containers/InvoicePage/InvoiceViewContainer")
            ]);

            const renderRoute = loadModule(cb);
            importModules.then(([component]) => {
              renderRoute({
                modal: component.default,
              });
            });
            importModules.catch(errorLoading);
          }
        }
      ]);
    });
  }
});
