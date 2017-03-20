import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { TextField, FlatButton } from 'material-ui';

import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';

import { selectSelectedInvoice } from '../App/selectors';
import { changeAmountItem } from './actions';

class InvoiceItemTable extends React.Component {

  componentDidMount() {
  }

  render() {
    let { invoice, changeItemAmount, changeItemDetail, deleteItem} = this.props;
    let items = [];
    if (items.map) {
      items = invoice.items.map((val, index) => {
        return (
          <TableRow key={index}>
            <TableRowColumn style={{ width: '70%' }}>
              <TextField floatingLabelText="Detail" fullWidth value={val.detail} id={String(index)} key={index} onChange={(e, val) => changeItemDetail(index, val)} />
            </TableRowColumn>
            <TableRowColumn style={{ width: '20%' }}>
              <TextField type="number" floatingLabelText="Amount" fullWidth value={val.amount} id={String(index)} key={index} onChange={ (e, val) => changeItemAmount(index, val)} />
            </TableRowColumn>
            <TableRowColumn style={{ width: '10%' }}>
              <IconButton iconClassName="material-icons" onClick={() => deleteItem(index)}>delete</IconButton>
            </TableRowColumn>
          </TableRow>);
      });
    }
    return (
      <div>
        <Table selectable={false}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn style={{ width: '70%' }}>Detail</TableHeaderColumn>
              <TableHeaderColumn style={{ width: '20%' }}>Amount</TableHeaderColumn>
              <TableHeaderColumn style={{ width: '10%' }}>{items.length} Item{items.length > 1 ? 's' : ''}</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {items}
          </TableBody>
        </Table>
      </div>
    );
  }
}


export default InvoiceItemTable;
