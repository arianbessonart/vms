import React from 'react';
import {SelectField, MenuItem} from 'material-ui';

class ClientSelector extends React.PureComponent {

  onSelectedItem = (event, index) => {
    let client = this.props.clients[index];
    if (this.props.onSelected) {
      this.props.onSelected(client._id);
    }
  };

  render() {
    let { clients, selected } = this.props;
    let clientsOption = [];
    if (clients) {
      clientsOption = clients.map((val, index) => { return (<MenuItem key={val._id} value={val._id} primaryText={val.name}/>)});
    }
    return (
      <SelectField floatingLabelText="Select a Client" value={selected ? selected._id : null } onChange={this.onSelectedItem}>
        {clientsOption}
      </SelectField>
    );
  }
};

export default ClientSelector;
