import React from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow } from 'material-ui/Table';

import InvoiceListItem from './InvoiceListItem';

const InvoiceList = (props) => {
  let invoiceRows = null;
  const { data } = props;
  if (data) {
    invoiceRows = data.map((i, index) => <InvoiceListItem key={index} item={i} {...props} />);
  }
  return (
    <div>
      <Table selectable={false}>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow>
            <TableHeaderColumn>Client</TableHeaderColumn>
            <TableHeaderColumn>Name</TableHeaderColumn>
            <TableHeaderColumn>Invoice N⁰</TableHeaderColumn>
            <TableHeaderColumn>Total</TableHeaderColumn>
            <TableHeaderColumn>Total - Retention</TableHeaderColumn>
            <TableHeaderColumn>Date</TableHeaderColumn>
            <TableHeaderColumn>Status</TableHeaderColumn>
            <TableHeaderColumn>Billing</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          {invoiceRows}
        </TableBody>
      </Table>
    </div>
  );
};

InvoiceList.propTypes = {
  data: React.PropTypes.any,
  onDelete: React.PropTypes.func,
};

export default InvoiceList;
