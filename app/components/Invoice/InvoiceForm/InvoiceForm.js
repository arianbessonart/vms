import React from "react";
import classnames from 'classnames';
import moment from 'moment';
import { DatePicker } from 'material-ui';

import ClientAutocomplete from 'components/Client/ClientAutocomplete';
import Button from "ui/components/Button";
// import FormTextField from "ui/components/FormTextField";
import TextField from 'material-ui/TextField';
import "./InvoiceForm.scss";

class InvoiceForm extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  /*_buildItems = () => {
    // const { invoice } = this.props;
    const invoice = { items: [{ detail: 'detalle1', amount: '12321.1' }]};
    return invoice && invoice.items ? invoice.items.map((item, idx) => {
      return (
        <li
          key={`invoice-${idx}`} className={classnames('item', {
            last: invoice.items.length - 1 === idx,
          })}>
          {item.detail}
        </li>
      );
    }) : null;
  }*/

  _buildItems = () => {
    // const { invoice } = this.props;
    const invoice = { items: [
      { detail: 'detalle1', amount: '12321.1' },
      { detail: 'detalle1', amount: '12321.1' }] };
    return invoice && invoice.items ? invoice.items.map((item, idx) => {
      return (
        <tr key={`invoice-${idx}`}>
          <td><TextField fullWidth /></td>
          <td><TextField inputStyle={{ textAlign: 'center' }} /></td>
        </tr>
      );
    }) : null;
  }

  render() {
    const { clients, selectedClient, onSelectedClient } = this.props;
    return (
      <div className="invoice-form">
        <div className="invoice-info">
          Cliente: <ClientAutocomplete clients={clients} selected={selectedClient} onSelect={onSelectedClient} />
          <div className="invoice-client-info">
            <span className="invoice-client-info-address">Dirección: {selectedClient ? selectedClient.address : '-'}</span>
            <span className="invoice-client-info-date">Fecha: <DatePicker textFieldStyle={{ height: '0%' }} style={{ display: 'inline-block' }} /></span>
          </div>
        </div>
        <div className="invoice-items-cointainer">
          <table className="invoice-items-table">
            <tr>
              <th style={{ width: '90%' }}>Detalle</th>
              <th style={{ width: '10%' }}>Importe</th>
            </tr>
            {this._buildItems()}
          </table>
        </div>
      </div>
    );
  }
}

InvoiceForm.propTypes = {
  clients: React.PropTypes.any,
  handleSubmit: React.PropTypes.func,
  onCancel: React.PropTypes.func,
};

export default InvoiceForm;
