import React from "react";
import classnames from 'classnames';
import moment from 'moment';
import { Card, CardTitle } from 'material-ui/Card';

import TextField from 'material-ui/TextField';
import Button from "ui/components/Button";

import "./InvoiceTotalForm.scss";

class InvoiceTotalForm extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  render() {
    const { invoice, onSubmit } = this.props;
    return (
      <section className="invoice-total">
        <Card containerStyle={{ minHeight: '208px' }}>
          <CardTitle title="Total" />
          <div className="row-total">
            <span>Total</span>
            <TextField className="row-total-value" disabled value={`$ ${invoice && invoice.total ? invoice.total.format(2) : 0}`} />
          </div>
          <div className="row-total">
            <span>SubTotal</span>
            <TextField className="row-total-value" disabled value={`$ ${invoice && invoice.subTotal ? invoice.subTotal.format(2) : 0}`} />
          </div>
          <div className="row-total">
            <span>Iva</span>
            <TextField className="row-total-value" disabled value={`$ ${invoice && invoice.iva ? invoice.iva.format(2) : 0}`} />
          </div>
        </Card>
        <Button label="Crear Factura" onClick={() => onSubmit()} primary fullWidth />
      </section>
    );
  }
}

InvoiceTotalForm.propTypes = {
  invoice: React.PropTypes.object,
  onSubmit: React.PropTypes.func,
};

export default InvoiceTotalForm;
