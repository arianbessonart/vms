import React from 'react';
import _ from 'lodash';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import Checkbox from 'material-ui/Checkbox';
import Toggle from 'material-ui/Toggle';

import './Filter.scss';

class FilterComponent extends React.Component {
  constructor(props) {
    super(props);
    this.onRequestClose = this.onRequestClose.bind(this);
    this.handleTouchTap = this.handleTouchTap.bind(this);
    this._onCheck = this._onCheck.bind(this);
    this.state = {
      open: false,
      value: props.value || [],
    };
  }

  onRequestClose() {
    this.setState({
      open: false,
    });
  }

  handleTouchTap(event) {
    // This prevents ghost click.
    event.preventDefault();
    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  }

  _onCheck(checked, value, event) {
    let newValues;

    if (checked) {
      if (this.props.multi) {
        newValues = _.union(this.state.value, [value]);
      } else {
        newValues = [value];
      }
    } else {
      newValues = _.without(this.state.value, value);
    }

    this.state.value = newValues;
    this.props.onChange(this.props.name, this.state.value);
  }

  _buildList() {
    const list = this.props.options;
    return list.map((type, i) => this._renderCheckbox(type.label, type.value, i));
  }

  _renderCheckbox(label, value, index) {
    const checked = !_.isEmpty(this.state.value) && this.state.value.indexOf(value) > -1;
    return (
      <ListItem
        key={`filter-${label}-${index}`}
        className="filter-item"
        primaryText={_.capitalize(label)}
        leftCheckbox={
          <Checkbox
            iconStyle={{ width: '18px', height: '18px' }}
            style={{ top: '14px' }}
            value={value}
            checked={checked}
            onCheck={(event, checked) => { this._onCheck(checked, value, event); }}
          />
        }
      />
    );
  }

  _renderTriggerValue() {
    if (_.isEmpty(this.state.value)) {
      return this.props.label;
    } else {
      const selected = this.state.value.map((value) => {
        const option = _.filter(this.props.options, (opt) => opt.value === value);
        return option[0].label;
      });

      return <span><b>{ `${this.props.label}: ` }</b>{ selected.join(',') }</span>;
    }
  }

  render() {
    return (
      <div className="filter-component">
        <span className="filter-trigger" onTouchTap={this.handleTouchTap}>
          <span className="value">
            { this._renderTriggerValue() }
          </span>
        </span>
        <Popover
          className="filter-popover"
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
          targetOrigin={{ horizontal: 'left', vertical: 'top' }}
          onRequestClose={this.onRequestClose}
        >
          <List>
            <Subheader className="header">{ this.props.label }</Subheader>
            <div className="scroll-box">
              { this._buildList() }
            </div>
          </List>
        </Popover>
      </div>
    );
  }
}

FilterComponent.propTypes = {
  label: React.PropTypes.string.isRequired,
  options: React.PropTypes.array.isRequired,
  name: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func,
  multi: React.PropTypes.bool,
};

FilterComponent.defaultProps = {
  multi: true,
};

export default FilterComponent;
