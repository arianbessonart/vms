import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Dialog from 'material-ui/Dialog';
import LoadingIndicator from 'ui/components/LoadingIndicator';
import InvoiceViewComponent from 'components/Invoice/InvoiceView';

import InvoiceForm  from '../../components/Invoice/InvoiceForm';
import { loadClients, selectClient } from '../Client/actions';
import { changeInputInvoice, addItemInvoice, changeAmountItem, changeDetailItem, addInvoice, deleteItem as removeItem } from './actions';
import { selectSelectedInvoice, selectSelectedClient, selectClients } from '../App/selectors';


class AddInvoice extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  state = {
    open: true,
  }

  componentDidMount() {
    // this.props.fetchClients();
  }

  onSelectClient = (id) => {
    // this.props.selectClient(id);
  }

  handleClose = () => {
    this.setState({ open: false });
    this.props.router.replace('/invoices');
  };

  render() {
    const { invoice, client, clients, handleName,
      handleNumber, handleDate, handleRetention,
      addItem, changeItemAmount, changeItemDetail,
      saveInvoice, deleteItem
    } = this.props;
    const { open } = this.state;
    return (
      <Dialog
        titleClassName="dialog-title"
        title={'Nueva Factura'}
        modal={false}
        onRequestClose={this.handleClose}
        open={open}
        autoDetectWindowHeight={false}
        style={{ overflowY: 'auto' }}
        contentStyle={{ transform: 'translate(0px, 30px)' }}
      >
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
      </Dialog>
    );
  }
}

AddInvoice.propTypes = {
  filter: React.PropTypes.any,
  invoices: React.PropTypes.any,
  fetchInvoices: React.PropTypes.func,
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
      dispatch(addItemInvoice({detail: "", amount: 0}));
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
  invoice: selectSelectedInvoice(),
  clients: selectClients(),
  client: selectSelectedClient(),
});

export default connect(null, null)(AddInvoice);
