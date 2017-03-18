import React from 'react';
import moment from 'moment';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Download from 'material-ui/svg-icons/file/file-download';
import DeleteForever from 'material-ui/svg-icons/action/delete-forever';
import Done from 'material-ui/svg-icons/action/done';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import {Link} from 'react-router';
const BASE_URL = 'http://localhost:3000/api';

let InvoiceListItem = ({item, deleteItem}) => {

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

  let actions = [];
  if (item.status === "pending") {
    actions.push(<MenuItem key="1" value="3" primaryText="Charge" leftIcon={<Done />} />)
  }

  actions.push(<a key="3" target="_blank" href={`${BASE_URL}/v1/invoices/${item._id}/print`}><MenuItem key="3" value="1" primaryText="PDF" leftIcon={<Download />} /></a>);
  actions.push(<MenuItem key="2" value="2" primaryText="Delete" onTouchTap={() => deleteItem(item._id)} leftIcon={<DeleteForever />} />);
  return (<TableRow key={item._id} id={item._id}>
      <TableRowColumn>{item.client ? item.client.name : ""}</TableRowColumn>
      <TableRowColumn><Link to={"/invoices/" + item._id +'/edit'}>{item.name}</Link></TableRowColumn>
      <TableRowColumn>{item.number}</TableRowColumn>
      <TableRowColumn>${item.total.format(2)}</TableRowColumn>
      <TableRowColumn>${ item.retention ? calculateRetention(item.total).format(2) : item.total.format(2) }</TableRowColumn>
      <TableRowColumn>{moment(item.date).format('DD-MM-YYYY')}</TableRowColumn>
      <TableRowColumn>{statusIcon}</TableRowColumn>
      <TableRowColumn><IconMenu iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}>{actions}</IconMenu></TableRowColumn>
    </TableRow>
  );
};

export default InvoiceListItem;
