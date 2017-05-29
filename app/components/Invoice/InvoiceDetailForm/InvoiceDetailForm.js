import React from "react";
import classnames from 'classnames';
import moment from 'moment';
import { Card, CardTitle } from 'material-ui/Card';
import { DatePicker, Toggle } from 'material-ui';
import ClientAutocomplete from 'components/Client/ClientAutocomplete';
import TextField from 'material-ui/TextField';
import Button from "ui/components/Button";
import "./InvoiceDetailForm.scss";

class InvoiceDetailForm extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  render() {
    const {
      clients,
      selectedClient,
      onSelectedClient,
      invoice,
      onChangeNumber,
      onChangeName,
      onChangeDate,
      onRetention,
    } = this.props;
    return (
      <div className="invoice-detail">
        <Card containerStyle={{ minHeight: '250px' }}>
          <CardTitle title="Información" />
          <div className="invoice-detail-row">
            <ClientAutocomplete clients={clients} selected={selectedClient} onSelect={onSelectedClient} />
            <DatePicker
              floatingLabelText="Fecha"
              autoOk
              hintText="Fecha"
              value={invoice ? invoice.date : null}
              style={{ display: 'inline-block' }}
              onChange={(e, v) => onChangeDate(v)}
              locale="es"
            />
          </div>
          <div className="invoice-detail-row">
            <TextField
              name="number"
              hintText="Número de Factura"
              floatingLabelText="Número de Factura"
              value={invoice ? invoice.number : ''}
              onChange={(e, v) => onChangeNumber(v)}
            />
            <TextField
              name="reference"
              hintText="Nombre de Referencia"
              floatingLabelText="Nombre de Referencia"
              value={invoice ? invoice.name : ''}
              onChange={(e, v) => onChangeName(v)}
            />
          </div>
          <div className="invoice-detail-row">
            <Toggle
              label="Retención"
              toggled={invoice ? invoice.retention : null}
              labelPosition="right"
              onToggle={(e, v) => onRetention(v)}
            />
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
