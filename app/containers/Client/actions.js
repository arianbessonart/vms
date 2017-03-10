
import {
  LOAD_CLIENTS_SUCCESS,
  SELECT_CLIENT,
  LOAD_CLIENTS,
} from './constants';



export function loadClients() {
  return {
    type: LOAD_CLIENTS,
  };
}

export function clientsLoaded(clients) {
  return {
    type: LOAD_CLIENTS_SUCCESS,
    clients,
  };
}

export function selectClient(id) {
  return {
    type: SELECT_CLIENT,
    payload: id
  }
}


