import React from "react";
import FontIcon from "material-ui/FontIcon";
import Filter from "ui/components/Filter";

import "./InvoicesFilters.scss";

const FILTER_OPTIONS = {
  status: [
    { label: "Cobrada", value: "charged" },
    { label: "Pendiente", value: "pending" },
    { label: "Cancelada", value: "canceled" },
  ],
};

const SEARCH_DELAY = 1200;

class InvoicesFilters extends React.Component {
  constructor(props) {
    super(props);
    this.timmer = false;
  }

  _onSearch = event => {
    const value = event.currentTarget.value;
    if (this.timmer) {
      clearTimeout(this.timmer);
    }
    this.timmer = setTimeout(() => {
      this.props.onSearch(value);
    }, SEARCH_DELAY);
  };

  _onFilterChange = (name, value) => {
    this.props.onFilter(name, value.join(","));
  };

  render() {
    return (
      <div className="invoicesfilters-component">
        <div className="searchbox">
          <FontIcon className="material-icons">search</FontIcon>
          <input
            type="search"
            placeholder="Buscar por nombre o número"
            onChange={this._onSearch}
          />
        </div>

        <div className="filters">
          <Filter
            label={"Estado"}
            options={FILTER_OPTIONS.status}
            name={"status"}
            value={""}
            onChange={this._onFilterChange}
          />
        </div>
      </div>
    );
  }
}

InvoicesFilters.PropTypes = {
  onFilter: React.PropTypes.func,
  onSearch: React.PropTypes.func,
};

export default InvoicesFilters;
