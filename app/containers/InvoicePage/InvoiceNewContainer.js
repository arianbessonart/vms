import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import LoadingIndicator from 'ui/components/LoadingIndicator';
import InvoiceViewComponent from 'components/Invoice/InvoiceView';
import ClientSelector from 'components/Client/ClientSelector';
import ClientAutocomplete from 'components/Client/ClientAutocomplete';

import InvoiceForm from '../../components/Invoice/InvoiceForm';
import InvoiceDetailForm from '../../components/Invoice/InvoiceDetailForm';
import InvoiceTotalForm from '../../components/Invoice/InvoiceTotalForm';
import InvoiceItemsForm from '../../components/Invoice/InvoiceItemsForm';
import { loadClients, selectClient } from '../Client/actions';
import { changeInputInvoice, addItemInvoice, changeAmountItem, changeDetailItem, addInvoice, deleteItem as removeItem } from './actions';
import { selectSelectedClient, selectClients } from '../Client/selectors';

import './InvoiceNewContainer.scss';

class NewInvoice extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  state = {
    open: true,
    selectedClient: null,
  }

  componentWillMount() {
    this.props.fetchClients();
  }

  handleClose = () => {
    this.setState({ open: false });
    this.props.router.replace('/invoices');
  };

  _onSelectClient = (client) => {
    this.setState({ selectedClient: client });
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancelar"
        primary
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Aceptar"
        primary
        keyboardFocused
        onTouchTap={this.handleClose}
      />,
    ];
    const { invoice, client, clients, handleName,
      handleNumber, handleDate, handleRetention,
      addItem, changeItemAmount, changeItemDetail,
      saveInvoice, deleteItem
    } = this.props;
    const { open, selectedClient } = this.state;
    return (
      <section className="invoice-new-container">
        <div className="invoice-left-container">
          <InvoiceDetailForm clients={clients} selected={selectedClient} />
          <InvoiceItemsForm />
        </div>
        <div className="invoice-total-container">
          <InvoiceTotalForm invoice={invoice} />
        </div>
      </section>
    );
  }
}

NewInvoice.propTypes = {
  fetchClients: React.PropTypes.func,
  router: React.PropTypes.object,
};


export function mapDispatchToProps(dispatch) {
  return {
    fetchClients: () => {
      dispatch(loadClients());
    },
    selectClient: (id) => {
      dispatch(selectClient(id));
    },
    handleName: (val) => {
      dispatch(changeInputInvoice('name', val))
    },
    handleNumber: (val) => {
      dispatch(changeInputInvoice('number', val))
    },
    handleDate: (val) => {
      dispatch(changeInputInvoice('date', val))
    },
    handleRetention: (val) => {
      dispatch(changeInputInvoice('retention', val))
    },
    addItem: () => {
      dispatch(addItemInvoice({detail: '', amount: 0}));
    },
    changeItemAmount: (index, val) => {
      dispatch(changeAmountItem(index, val));
    },
    changeItemDetail: (index, val) => {
      dispatch(changeDetailItem(index, val));
    },
    saveInvoice: (invoice, client) => {
      dispatch(addInvoice(client._id, invoice));
    },
    deleteItem: (index) => {
      dispatch(removeItem(index));
    },
  };
}

const mapStateToProps = createStructuredSelector({
  clients: selectClients(),
  client: selectSelectedClient(),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewInvoice);
