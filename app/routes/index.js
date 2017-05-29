"use strict";

import CoreLayout from "layouts/CoreLayout";
import Invoices from "./Invoices";
import AddInvoice from "./AddInvoice";
import EditInvoice from "./EditInvoice";
import Reports from "./Reports";
import authHooks from "../utils/authHook";

export default function createRoutes(store) {
  // Create reusable async injectors using getAsyncInjectors factory
  const asyncInjectors = authHooks(store); // eslint-disable-line no-unused-vars

  return [
    {
      path: "/",
      component: CoreLayout,
      // onEnter: asyncInjectors.authenticated,
      indexRoute: Invoices(asyncInjectors),
      childRoutes: [
        AddInvoice(asyncInjectors),
        EditInvoice(asyncInjectors),
        Invoices(asyncInjectors),
        Reports(asyncInjectors),
        //ErrorPage(asyncInjectors, '*', '404', 'Not found')
      ],
    },
  ];
}
