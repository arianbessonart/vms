import React from 'react';
import { connect } from 'react-redux';
import { TextField } from 'material-ui';

class InvoiceTotal extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  render() {
    const { invoice } = this.props;
    console.log(invoice);
    return (
      <div>
        <TextField disabled floatingLabelText="Sub Total" value={invoice.subTotal.format(2)} />
        <TextField disabled floatingLabelText="Iva" value={invoice.iva.format(2)} />
        <TextField disabled floatingLabelText="Total" value={invoice.total.format(2)} />
      </div>
    );
  }
}

InvoiceTotal.propTypes = {
  invoice: React.PropTypes.any,
};

// Wrap the component to inject dispatch and state into it
export default connect(null, null)(InvoiceTotal);
