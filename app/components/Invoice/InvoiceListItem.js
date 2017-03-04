import React from 'react'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import {Link} from 'react-router'

let InvoiceListItem = ({item, onCharge}) => {

  const calculateRetention = (total) => {
    return Number(total - (total * 0.07)).format(2);
  };

  let statusIcon;
  if (item.status === "pending") {
    statusIcon = <i className="material-icons">schedule</i>
  } else if (item.status === "charged") {
    statusIcon = <i className="material-icons">done</i>
  } else {
    statusIcon = <i className="material-icons">cancel</i>
  }
  let chargeInvoice = item.status === "pending" ?
    <RaisedButton label="Charge" primary={true} onClick={ () => onCharge(item._id)}></RaisedButton> :
    <RaisedButton label={item.status} disabled={true} primary={true}/>
  return (<TableRow key={item._id} id={item._id}>
      <TableRowColumn>{item.client.name}</TableRowColumn>
      <TableRowColumn><Link to={"/invoices/" + item._id +'/edit'}>{item.name}</Link></TableRowColumn>
      <TableRowColumn>{item.number}</TableRowColumn>
      <TableRowColumn>${item.total}</TableRowColumn>
      <TableRowColumn>${ item.retention ? calculateRetention(item.total) : item.total }</TableRowColumn>
      <TableRowColumn>{item.date}</TableRowColumn>
      <TableRowColumn>{statusIcon}</TableRowColumn>
      <TableRowColumn>{chargeInvoice}</TableRowColumn>
    </TableRow>
  );
}


export default InvoiceListItem;
