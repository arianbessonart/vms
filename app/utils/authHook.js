import { getAsyncInjectors } from './asyncInjectors';

function authenticated(store) {
  return (nextState, replace) => {
    let currentUser;
    if (store.getState() && store.getState().get('global')) {
      currentUser = store.getState().get('global').get('currentUser');
    }
    if (!currentUser) {
      replace({
        pathname: nextState.location.pathname === '/' ? '/invoices' : '/login',
        state: { nextPathname: nextState.location.pathname },
      });
    }
  };
}

/**
 * Helper for creating injectors
 */
export default function getHooks(store) {
  const { injectReducer, injectSagas } = getAsyncInjectors(store);
  return {
    injectReducer,
    injectSagas,
    authenticated: authenticated(store),
  };
}
