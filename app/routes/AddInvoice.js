import { loadModule, errorLoading } from "./util";

export default asyncInjectors => ({
  path: "/invoices/add",
  name: "invoicesAddPage",
  title: "Nueva Factura",
  getComponent(nextState, cb) {
    const importModules = Promise.all([
      import("containers/InvoicePage/reducer"),
      import("containers/InvoicePage/sagas"),
      import("containers/InvoicePage/InvoiceNewContainer"),
      import("containers/Client/reducer"),
      import("containers/Client/sagas"),
    ]);

    const renderRoute = loadModule(cb);
    importModules.then(([reducer, sagas, component, clientReducer, clientSagas]) => {
      asyncInjectors.injectReducer("invoice", reducer.default);
      asyncInjectors.injectReducer("client", clientReducer.default);
      asyncInjectors.injectSagas(sagas.default);
      asyncInjectors.injectSagas(clientSagas.default);
      renderRoute({
        children: component.default
      });
    });
    importModules.catch(errorLoading);
  },
});
