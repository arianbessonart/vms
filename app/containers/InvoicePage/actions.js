
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
  CHANGE_INVOICE_FORM,
  ADD_ITEM,
  CHANGE_ITEM_AMOUNT,
  CHANGE_ITEM_DETAIL,
  DELETE_ITEM,
} from './constants';

export function loadInvoices(query = '', filters = {}, page = 1, limit = 10) {
  return {
    type: LOAD_INVOICES,
    query,
    filters,
    page,
    limit,
  };
}

export function invoicesLoaded(result) {
  return {
    type: LOAD_INVOICES_SUCCESS,
    result,
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

export function filterInvoices(val) {
  return {
    type: FILTER_INVOICES,
    payload: val,
  };
}

export function loadInvoice(invoiceId) {
  return {
    type: LOAD_INVOICE,
    invoiceId,
  };
}

export function invoiceLoaded(invoice) {
  return {
    type: LOAD_INVOICE_SUCCESS,
    payload: invoice,
  };
}

export function editInvoice(invoice) {
  return {
    type: EDIT_INVOICE,
    payload: {
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

export function changeInputInvoice(key, value) {
  return {
    type: CHANGE_INVOICE_FORM,
    payload: {
      key,
      value,
    },
  };
}

export function addItemInvoice(item) {
  return {
    type: ADD_ITEM,
    payload: item,
  };
}

export function changeAmountItem(index, value) {
  return {
    type: CHANGE_ITEM_AMOUNT,
    payload: {
      index,
      value,
    },
  };
}

export function changeDetailItem(index, value) {
  return {
    type: CHANGE_ITEM_DETAIL,
    payload: {
      index,
      value,
    },
  };
}

export function deleteItem(index) {
  return {
    type: DELETE_ITEM,
    payload: index,
  };
}

export function deleteInvoice(id) {
  return {
    type: DELETE_INVOICE,
    payload: id,
  };
}
