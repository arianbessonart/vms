import { loadModule, errorLoading } from "./util";

export default asyncInjectors => ({
  path: "/invoices",
  name: "invoicesPage",
  title: "Facturas",
  getComponent(nextState, cb) {
    const importModules = Promise.all([
      import("containers/InvoicePage/reducer"),
      import("containers/InvoicePage/sagas"),
      import("containers/InvoicePage")
    ]);

    const renderRoute = loadModule(cb);
    importModules.then(([reducer, sagas, component]) => {
      asyncInjectors.injectReducer("invoice", reducer.default);
      asyncInjectors.injectSagas(sagas.default);
      renderRoute({
        children: component.default,
      });
    });
    importModules.catch(errorLoading);
  },
  // getChildRoutes(nextState, callback) {
  //   require.ensure([], function(require) {
  //     callback(null, [
  //       {
  //         path: "/suppliers/:supplierId",
  //         getComponent(nextState, cb) {
  //           const importModules = Promise.all([
  //             import("containers/Supplier/ProfileContainer")
  //           ]);

  //           const renderRoute = loadModule(cb);
  //           importModules.then(([component]) => {
  //             renderRoute({
  //               component: component.default
  //             });
  //           });
  //           importModules.catch(errorLoading);
  //         }
  //       }
  //     ]);
  //   });
  // }
});
