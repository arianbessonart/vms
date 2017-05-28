import React from "react";
import classnames from 'classnames';
import moment from 'moment';
import { Card, CardTitle } from 'material-ui/Card';
import DeleteForever from 'material-ui/svg-icons/action/delete-forever';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import Button from "ui/components/Button";
import EmptyMessage from 'ui/components/EmptyMessage';
import "./InvoiceItemsForm.scss";

class InvoiceItemsForm extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  style = {
    marginRight: 20,
    top: 'auto',
    right: '30%',
    bottom: 50,
    left: '92%',
    position: 'relative',
  };

  _buildList = () => {
    const { items, onDeleteItem, onChangeItemAmount, onChangeItemDetail } = this.props;
    return items ? items.map((item, idx) => (
      <div key={`filter-${idx}`} className="row-item">
        <TextField className="item-detail" value={item.detail} onChange={(e, v) => onChangeItemDetail(idx, v)} />
        <TextField className="item-amount" value={item.amount} onChange={(e, v) => onChangeItemAmount(idx, v)} />
        <IconButton onTouchTap={() => onDeleteItem(idx)} iconClassName="material-icons" iconStyle={{ color: '#666' }}>delete</IconButton>
      </div>
    ))
    : null;
  }

  render() {
    const { onAddItem } = this.props;
    return (
      <div className="invoice-items">
        <Card containerStyle={{ minHeight: '30%' }}>
          <CardTitle title="Detalle" />
          <FloatingActionButton mini style={this.style} onTouchTap={() => onAddItem()}>
            <ContentAdd />
          </FloatingActionButton>
          {/*{ <EmptyMessage message={'No hay items'} icon="assignment" />}*/}
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
  onAddItem: React.PropTypes.func,
  onDeleteItem: React.PropTypes.func,
  onChangeItemAmount: React.PropTypes.func,
  onChangeItemDetail: React.PropTypes.func,
};

export default InvoiceItemsForm;
