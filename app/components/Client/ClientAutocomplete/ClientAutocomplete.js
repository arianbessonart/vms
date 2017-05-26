import React from "react";
import AutoComplete from 'material-ui/AutoComplete';


// import "./ClientAutocomplete.scss";

class ClientAutocomplete extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  onSelectedItem = (event, index) => {
    const client = this.props.clients[index];
    if (this.props.onSelect) {
      this.props.onSelect(client);
    }
  };

  _onSelect = (client) => {
    this.props.onSelect(client);
  }

  _buildOptions = () => this.props.clients || [];

  _buildConfigOptions = () => ({ text: 'name', value: '_id' });

  render() {
    const { selected } = this.props;
    const searchText = selected ? selected.name : '';
    return (
      <AutoComplete
        hintText="Cliente"
        searchText={searchText}
        filter={AutoComplete.fuzzyFilter}
        dataSource={this._buildOptions()}
        dataSourceConfig={this._buildConfigOptions()}
        onNewRequest={this._onSelect}
        maxSearchResults={5}
      />
    );
  }
}

ClientAutocomplete.propTypes = {
  onSelect: React.PropTypes.func,
  clients: React.PropTypes.any,
  selected: React.PropTypes.object,
};

export default ClientAutocomplete;
