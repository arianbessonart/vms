import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { createStructuredSelector } from 'reselect';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { TextField } from 'material-ui';

import InvoiceList from 'components/Invoice/InvoiceList';
import { loadInvoices, filterInvoices } from './actions';
import { selectFilterInvoices, selectFilterInput } from '../App/selectors';

class InvoicePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    this.props.fetchInvoices();
  }

  handleOnCharge = (invoiceId) => {
    console.log(invoiceId);
    // invoiceIdSelected = invoiceId;
    // this.refs.dp.openDialog();
  };

  render() {
    const { handleFilter, filter, invoices } = this.props;
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
        <InvoiceList data={invoices} onCharge={this.handleOnCharge} />
        <Link to={'/invoices/new'}>
          <FloatingActionButton style={style}>
            <ContentAdd />
          </FloatingActionButton>
        </Link>
      </div>
    );
  }
}

InvoicePage.propTypes = {
  filter: React.PropTypes.any,
  invoices: React.PropTypes.any,
  fetchInvoices: React.PropTypes.func,
  handleFilter: React.PropTypes.func,
};


export function mapDispatchToProps(dispatch) {
  return {
    fetchInvoices: () => {
      dispatch(loadInvoices());
    },
    handleFilter: (val) => {
      dispatch(filterInvoices(val));
    },
  };
}

const mapStateToProps = createStructuredSelector({
  invoices: selectFilterInvoices(),
  filterValue: selectFilterInput(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(InvoicePage);
