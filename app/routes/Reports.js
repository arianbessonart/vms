import { loadModule, errorLoading } from "./util";

export default asyncInjectors => ({
  path: "/reports",
  name: "reportsPage",
  title: "Reportes",
  getComponent(nextState, cb) {
    const importModules = Promise.all([
      import("containers/ReportPage/reducer"),
      import("containers/ReportPage/sagas"),
      import("containers/ReportPage")
    ]);

    const renderRoute = loadModule(cb);
    importModules.then(([reducer, sagas, component]) => {
      asyncInjectors.injectReducer("report", reducer.default);
      asyncInjectors.injectSagas(sagas.default);
      renderRoute({
        children: component.default
      });
    });
    importModules.catch(errorLoading);
  }
});
