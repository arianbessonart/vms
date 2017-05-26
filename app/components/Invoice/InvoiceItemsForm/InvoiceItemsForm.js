import React from "react";
import classnames from 'classnames';
import moment from 'moment';
import { Card, CardTitle } from 'material-ui/Card';
import DeleteForever from 'material-ui/svg-icons/action/delete-forever';

import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import Button from "ui/components/Button";
import "./InvoiceItemsForm.scss";

class InvoiceItemsForm extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function


  _buildList = () => {
    // const { items } = this.props;
    const items = [
      { detail: 'detalle1', amount: '12321.1' },
      { detail: 'detalle1', amount: '12321.1' },
      { detail: 'detalle1', amount: '12321.1' },
      { detail: 'detalle1', amount: '12321.1' },
      { detail: 'detalle1', amount: '12321.1' },
      { detail: 'detalle1', amount: '12321.1' },
      { detail: 'detalle1', amount: '12321.1' },
      { detail: 'detalle1', amount: '12321.1' },
      { detail: 'detalle1', amount: '12321.1' },
      { detail: 'detalle1', amount: '12321.1' },
      { detail: 'detalle1', amount: '12321.1' },
      { detail: 'detalle1', amount: '12321.1' },
      { detail: 'detalle1', amount: '12321.1' },
      { detail: 'detalle1', amount: '12321.1' },
      { detail: 'detalle1', amount: '12321.1' },
      { detail: 'detalle1', amount: '12321.1' },
      { detail: 'detalle1', amount: '12321.1' },
      { detail: 'detalle1', amount: '12321.1' },
      { detail: 'detalle1', amount: '12321.1' },
      { detail: 'detalle1', amount: '12321.1' },
      { detail: 'detalle1', amount: '12321.1' },
      { detail: 'detalle1', amount: '12321.1' },
      { detail: 'detalle1', amount: '12321.1' },
      { detail: 'detalle1', amount: '12321.1' },
      { detail: 'detalle1', amount: '12321.1' },
      { detail: 'detalle1', amount: '12321.1' },
      { detail: 'detalle1', amount: '12321.1' },
      { detail: 'detalle1', amount: '12321.1' },
      { detail: 'detalle1', amount: '12321.1' },
      { detail: 'detalle1', amount: '12321.1' }];
    return items ? items.map((item, idx) => (
      <div className="row-item">
        <TextField style={{ width: '60%' }} />
        <span>$ <TextField value={item.amount} /></span>
        <IconButton iconClassName="material-icons" iconStyle={{ color: '#666' }}>delete</IconButton>
      </div>
    ))
    : null;
  }

  render() {
    const { items } = this.props;
    return (
      <div className="invoice-items">
        <Card containerStyle={{ minHeight: '208px' }}>
          <CardTitle title="Detalle" />
          {this._buildList()}
        </Card>
      </div>
    );
  }
}

InvoiceItemsForm.propTypes = {
  items: React.PropTypes.any,
  handleSubmit: React.PropTypes.func,
  onCancel: React.PropTypes.func,
};

export default InvoiceItemsForm;
