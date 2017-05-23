import React from "react";
import { SelectField, MenuItem } from 'material-ui';

import "./ClientSelector.scss";

class ClientSelector extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  onSelectedItem = (event, index) => {
    const client = this.props.clients[index];
    if (this.props.onSelect) {
      this.props.onSelect(client);
    }
  };

  _buildOptions = () => {
    const clients = this.props.clients;
    return clients ?
      clients.map((val) => (<MenuItem key={val._id} value={val._id} primaryText={val.name} />))
    : null;
  }

  render() {
    const { selected } = this.props;
    return (
      <SelectField floatingLabelText="Seleccione un cliente" value={selected ? selected._id : null } onChange={this.onSelectedItem}>
        {this._buildOptions()}
      </SelectField>
    );
  }
}

ClientSelector.propTypes = {
  onSelect: React.PropTypes.func,
  clients: React.PropTypes.any,
  selected: React.PropTypes.object,
};

export default ClientSelector;
