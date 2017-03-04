
import {
  LOAD_INVOICES,
  LOAD_INVOICES_SUCCESS,
  ADD_INVOICE,
  ADD_INVOICE_SUCCESS,
  DELETE_INVOICE,
  FILTER_INVOICES,
  LOAD_INVOICE,
  EDIT_INVOICE,
  LOAD_INVOICE_SUCCESS,
  EDIT_INVOICE_SUCCESS,
} from './constants';

export function loadInvoices() {
  return {
    type: LOAD_INVOICES,
  };
}

export function invoicesLoaded(invoices) {
  return {
    type: LOAD_INVOICES_SUCCESS,
    invoices,
  };
}

export function addInvoice(clientId, invoice) {
  return {
    type: ADD_INVOICE,
    payload: {
      clientId,
      invoice,
    },
  };
}

export function addInvoiceSuccessfully(payload) {
  return {
    type: ADD_INVOICE_SUCCESS,
    payload,
  };
}

export function deleteInvoice(clientId, invoiceId) {
  return {
    type: DELETE_INVOICE,
    payload: {
      clientId,
      invoiceId,
    },
  };
}

export function filterInvoices(val) {
  return {
    type: FILTER_INVOICES,
    payload: val,
  };
}

export function loadInvoice(clientId, invoiceId) {
  return {
    type: LOAD_INVOICE,
    clientId,
    invoiceId,
  };
}

export function invoiceLoaded(invoice) {
  return {
    type: LOAD_INVOICE_SUCCESS,
    payload: invoice,
  };
}

export function editInvoice(clientId, invoiceId, invoice) {
  return {
    type: EDIT_INVOICE,
    payload: {
      clientId,
      invoiceId,
      invoice,
    },
  };
}

export function editInvoiceSuccessfully(payload) {
  return {
    type: EDIT_INVOICE_SUCCESS,
    payload,
  };
}
