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
import { loadClients } from '../Client/actions';
import { changeInputInvoice, addItemInvoice, changeAmountItem, changeDetailItem, addInvoice, deleteItem as removeItem, initInvoice, clearSelected, loadInvoice } from './actions';
import { selectSelectedClient, selectClients } from '../Client/selectors';
import { selectSelectedInvoice } from './selectors';

import './InvoiceNewContainer.scss';

class EditInvoice extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  state = {
    selectedClient: null,
  }

  componentWillMount() {
    console.log(this.props.params.id);
    this.props.fetchInvoice(this.props.params.id);
  }

  componentWillUnmount() {
    this.props.clearSelected();
  }

  handleClose = () => {
    this.props.router.replace('/invoices');
  };

  _onSelectClient = (client) => {
    this.setState({ selectedClient: client });
    this.props.selectClient(client._id);
  }

  _onAddItem = () => {
    this.props.addItem({ detail: '', amount: 0 });
  }

  _onDeleteItem = (index) => {
    this.props.deleteItem(index);
  }

  _onChangeItemAmount = (index, amount) => {
    this.props.changeItemAmount(index, amount);
  }

  _onChangeItemDetail = (index, detail) => {
    this.props.changeItemDetail(index, detail);
  }

  _onChangeNumber = (val) => {
    this.props.handleNumber(val);
  }

  _onChangeName = (val) => {
    this.props.handleName(val);
  }

  _onChangeDate = (val) => {
    this.props.handleDate(val);
  }

  _onRetention = (val) => {
    this.props.handleRetention(val);
  }

  _onSubmit = () => {
    this.props.saveInvoice(this.props.invoice);
  }

  render() {
    const { invoice, clients } = this.props;
    const items = invoice ? invoice.items : [];
    const { selectedClient } = this.state;
    return (
      <section className="invoice-new-container">
        <div className="invoice-left-container">
          <InvoiceDetailForm
            invoice={invoice}
            clients={clients}
            selected={selectedClient}
            onSelectedClient={this._onSelectClient}
            onChangeNumber={this._onChangeNumber}
            onChangeName={this._onChangeName}
            onChangeDate={this._onChangeDate}
            onRetention={this._onRetention}
          />
          <InvoiceItemsForm
            items={items}
            onAddItem={this._onAddItem}
            onDeleteItem={this._onDeleteItem}
            onChangeItemAmount={this._onChangeItemAmount}
            onChangeItemDetail={this._onChangeItemDetail}
          />
        </div>
        <aside className="invoice-total-container">
          <InvoiceTotalForm
            invoice={invoice}
            onSubmit={this._onSubmit}
            disableButton={!(invoice && invoice.items && invoice.items.length > 0 && invoice.number && invoice.name && invoice.date && invoice.client)}
          />
        </aside>
      </section>
    );
  }
}

EditInvoice.propTypes = {
  fetchClients: React.PropTypes.func,
  addItem: React.PropTypes.func,
  deleteItem: React.PropTypes.func,
  changeItemAmount: React.PropTypes.func,
  changeItemDetail: React.PropTypes.func,
  handleNumber: React.PropTypes.func,
  handleName: React.PropTypes.func,
  handleDate: React.PropTypes.func,
  initInvoice: React.PropTypes.func,
  selectClient: React.PropTypes.func,
  saveInvoice: React.PropTypes.func,
  clearSelected: React.PropTypes.func,
  handleRetention: React.PropTypes.func,
  invoice: React.PropTypes.any,
  router: React.PropTypes.object,
};


export function mapDispatchToProps(dispatch) {
  return {
    fetchInvoice: (id) => {
      dispatch(loadInvoice(id));
    },
    fetchClients: () => {
      dispatch(loadClients());
    },
    selectClient: (id) => {
      dispatch(changeInputInvoice('client', id));
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
    addItem: (item) => {
      dispatch(addItemInvoice(item));
    },
    changeItemAmount: (index, val) => {
      dispatch(changeAmountItem(index, val));
    },
    changeItemDetail: (index, val) => {
      dispatch(changeDetailItem(index, val));
    },
    saveInvoice: (invoice) => {
      dispatch(addInvoice(invoice));
    },
    deleteItem: (index) => {
      dispatch(removeItem(index));
    },
    initInvoice: () => {
      dispatch(initInvoice());
    },
    clearSelected: () => {
      dispatch(clearSelected());
    },
  };
}

const mapStateToProps = createStructuredSelector({
  clients: selectClients(),
  client: selectSelectedClient(),
  invoice: selectSelectedInvoice(),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditInvoice);
