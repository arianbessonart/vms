import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { TextField } from 'material-ui';

import { selectSelectedInvoice } from './selectors';

class InvoiceTotal extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  render() {
    const { invoice } = this.props;
    return (
      <div>
        <TextField disabled floatingLabelText="Sub Total" value={invoice.subTotal} />
        <TextField disabled floatingLabelText="Iva" value={invoice.iva} />
        <TextField disabled floatingLabelText="Total" value={invoice.total}/>
      </div>
    );
  }
}

InvoiceTotal.propTypes = {
  invoice: React.PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  invoices: selectSelectedInvoice(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, null)(InvoiceTotal);
