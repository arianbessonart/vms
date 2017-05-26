import React from "react";
import classnames from 'classnames';
import moment from 'moment';
import { Card, CardTitle } from 'material-ui/Card';
import { DatePicker } from 'material-ui';
import ClientAutocomplete from 'components/Client/ClientAutocomplete';
import TextField from 'material-ui/TextField';
import Button from "ui/components/Button";
import "./InvoiceDetailForm.scss";

class InvoiceDetailForm extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  render() {
    const { clients, selectedClient, onSelectedClient } = this.props;
    return (
      <div className="invoice-detail">
        <Card containerStyle={{ minHeight: '250px' }}>
          <CardTitle title="Información" />
          <div>
            <ClientAutocomplete clients={clients} selected={selectedClient} onSelect={onSelectedClient} />
            <DatePicker floatingLabelText="Fecha" autoOk hintText="Fecha" style={{ display: 'inline-block' }} />
          </div>
          <div>
            <TextField hintText="Número de Factura" floatingLabelText="Número de Factura" />
            <TextField hintText="Nombre de Referencia" floatingLabelText="Nombre de Referencia" />
          </div>
        </Card>
      </div>
    );
  }
}

InvoiceDetailForm.propTypes = {
  invoice: React.PropTypes.object,
  handleSubmit: React.PropTypes.func,
  onCancel: React.PropTypes.func,
};

export default InvoiceDetailForm;
