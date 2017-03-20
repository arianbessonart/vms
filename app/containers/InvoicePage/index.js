import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { createStructuredSelector } from 'reselect';
import { DatePicker, TextField } from 'material-ui';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import InvoiceList from 'components/Invoice/InvoiceList';
import { loadInvoices, filterInvoices, deleteInvoice, editInvoice } from './actions';
import { selectFilterInvoices, selectFilterInput } from '../App/selectors';

class InvoicePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    this.props.fetchInvoices();
  }

  render() {
    let invoiceSelected = null;
    const { handleFilter, filter, invoices, handleDelete } = this.props;

    const handleOnCharge = (invoice) => {
      invoiceSelected = invoice;
      this.dp.openDialog();
    };

    const handleOnChargeConfirmed = (e, date) => {
      this.props.handleCharge(invoiceSelected, date);
    };

    const style = {
      marginRight: 20,
      top: 'auto',
      right: 20,
      bottom: 20,
      left: 'auto',
      position: 'fixed',
    };
    const filterStyle = {
      width: '400px',
      marginRight: 'auto',
      marginLeft: 'auto',
    };
    return (
      <div>
        <div style={filterStyle}>
          <TextField
            floatingLabelText="Filter"
            name="filter"
            value={filter}
            onChange={(e, val) => handleFilter(val)}
            fullWidth
          />
        </div>
        <InvoiceList data={invoices} onCharge={handleOnCharge} deleteItem={handleDelete} />
        <Link to={'/invoices/new'}>
          <FloatingActionButton style={style}>
            <ContentAdd />
          </FloatingActionButton>
        </Link>
        <DatePicker ref={(c) => { this.dp = c; }} style={{ display: 'None' }} name="chargeDp" onChange={handleOnChargeConfirmed} />
      </div>
    );
  }
}

InvoicePage.propTypes = {
  filter: React.PropTypes.any,
  invoices: React.PropTypes.any,
  fetchInvoices: React.PropTypes.func,
  handleFilter: React.PropTypes.func,
  handleDelete: React.PropTypes.func,
};


export function mapDispatchToProps(dispatch) {
  return {
    fetchInvoices: () => {
      dispatch(loadInvoices());
    },
    handleFilter: (val) => {
      dispatch(filterInvoices(val));
    },
    handleDelete: (id) => {
      dispatch(deleteInvoice(id));
    },
    handleCharge: (invoice, date) => {
      invoice.dateBilled = date;
      invoice.status = 'charged';
      dispatch(editInvoice(invoice.client._id, invoice._id, invoice));
    },
  };
}

const mapStateToProps = createStructuredSelector({
  invoices: selectFilterInvoices(),
  filterValue: selectFilterInput(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(InvoicePage);
