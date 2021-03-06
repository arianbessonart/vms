import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import InvoiceForm  from '../../components/Invoice/InvoiceForm';
import { loadClients, selectClient } from '../Client/actions';
import { loadInvoice, changeInputInvoice, addItemInvoice, changeAmountItem, changeDetailItem, editInvoice, deleteItem as removeItem } from './actions';
import { selectSelectedInvoice, selectSelectedClient, selectClients } from '../App/selectors';


class EditInvoicePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    this.props.fetchClients();
    this.props.fetchInvoice(this.props.params.invoiceId);
  }

  onSelectClient = (id) => {
    this.props.selectClient(id);
  }

  render() {
    let { invoice, client, clients, handleName,
      handleNumber, handleDate, handleRetention,
      addItem, changeItemAmount, changeItemDetail,
      saveInvoice, deleteItem
    } = this.props;
    return (
      <div>
        <InvoiceForm
          invoice={invoice}
          clientSelected={client}
          clients={clients}
          onSelectedClient={this.onSelectClient}
          handleName={handleName}
          handleNumber={handleNumber}
          handleDate={handleDate}
          handleRetention={handleRetention}
          addItem={addItem}
          changeItemAmount={changeItemAmount}
          changeItemDetail={changeItemDetail}
          addInvoice={saveInvoice}
          deleteItem={deleteItem}
        />
      </div>
    );
  }
}

EditInvoicePage.propTypes = {
  filter: React.PropTypes.any,
  invoices: React.PropTypes.any,
  fetchInvoices: React.PropTypes.func,
  fetchInvoice: React.PropTypes.func,
  fetchClients: React.PropTypes.func,
  handleFilter: React.PropTypes.func,
  saveInvoice: React.PropTypes.func,
  deleteItem: React.PropTypes.func,
};


export function mapDispatchToProps(dispatch) {
  return {
    fetchClients: () => {
      dispatch(loadClients());
    },
    fetchInvoice: (id) => {
      dispatch(loadInvoice(id));
    },
    selectClient: (id) => {
      dispatch(selectClient(id));
    },
    handleName: (val) => {
      dispatch(changeInputInvoice('name', val));
    },
    handleNumber: (val) => {
      dispatch(changeInputInvoice('number', val));
    },
    handleDate: (val) => {
      dispatch(changeInputInvoice('date', val));
    },
    handleRetention: (val) => {
      dispatch(changeInputInvoice('retention', val));
    },
    addItem: () => {
      dispatch(addItemInvoice({ detail: '', amount: 0 }));
    },
    changeItemAmount: (index, val) => {
      dispatch(changeAmountItem(index, val));
    },
    changeItemDetail: (index, val) => {
      dispatch(changeDetailItem(index, val));
    },
    saveInvoice: (invoice, client) => {
      dispatch(editInvoice(client._id, invoice._id, invoice));
    },
    deleteItem: (index) => {
      dispatch(removeItem(index));
    },
  };
}

const mapStateToProps = createStructuredSelector({
  invoice: selectSelectedInvoice(),
  clients: selectClients(),
  client: selectSelectedClient(),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditInvoicePage);
