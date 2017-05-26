import React from "react";
import classnames from 'classnames';
import moment from 'moment';
import { Card, CardTitle } from 'material-ui/Card';

import TextField from 'material-ui/TextField';
import Button from "ui/components/Button";

import "./InvoiceTotalForm.scss";

class InvoiceTotalForm extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  render() {
    const { invoice } = this.props;
    return (
      <div className="invoice-total">
        <Card containerStyle={{ minHeight: '208px' }}>
          <CardTitle title="Total" />
          <TextField />
        </Card>
        <Button label="Crear Factura" primary fullWidth />
      </div>
    );
  }
}

InvoiceTotalForm.propTypes = {
  invoice: React.PropTypes.object,
  handleSubmit: React.PropTypes.func,
  onCancel: React.PropTypes.func,
};

export default InvoiceTotalForm;
