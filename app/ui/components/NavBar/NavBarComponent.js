'use strict'

import React from 'react';
import { connect } from 'react-redux';
import { Link, IndexLink } from 'react-router';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import FontIcon from 'material-ui/FontIcon';
import Drawer from 'material-ui/Drawer';
import MediaQuery from 'react-responsive';

// import { logout } from 'containers/App/actions'

import './NavBar.scss';

class NavBarComponent extends React.Component {
  static propTypes = {
    title: React.PropTypes.string,
  };

  constructor(props) {
    super(props)
    this._onRequestChange = this._onRequestChange.bind(this)
    this.state = {
      menuOpen: false
    }
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.menuOpen != nextProps.menuOpen) {
      this.setState({ menuOpen: nextProps.menuOpen })
    }
  }

  _onRequestChange(open) {
    this.setState({
      menuOpen: open
    }, () => {
      this.props.onToggleMenu(open)
    })
  }

  /*
  * Build the navigation menu.
  */
  _buildMenu() {
    return (
      <div className="menu-container">
        <Menu autoWidth={false} width={256}>
          <MenuItem
            primaryText="Home"
            leftIcon={ <FontIcon className="material-icons">home</FontIcon> }
            containerElement={<IndexLink activeClassName="active" to={ '/' } />}
            className="menu-item"
            onTouchTap={() => { this._onRequestChange(false) }} />

          <MenuItem
            primaryText="Facturas"
            leftIcon={ <FontIcon className="material-icons">home</FontIcon> }
            containerElement={<IndexLink activeClassName="active" to={ '/invoices' } />}
            className="menu-item"
            onTouchTap={() => { this._onRequestChange(false) }} />

          <MenuItem
            primaryText="Reportes"
            leftIcon={ <FontIcon className="material-icons">local_offer</FontIcon> }
            containerElement={<Link activeClassName="active" to={ '/reports' } />}
            className="menu-item"
            onTouchTap={() => { this._onRequestChange(false) }} />

          <Divider inset style={{margin: '10px 20px'}} />

          <MenuItem
            primaryText="Clientes"
            leftIcon={ <FontIcon className="material-icons">move_to_inbox</FontIcon> }
            containerElement={<Link activeClassName="active" to={ '/clients' } />}
            className="menu-item"
            onTouchTap={() => { this._onRequestChange(false) }} />

          <MenuItem
            primaryText="Compras"
            leftIcon={ <FontIcon className="material-icons">rate_review</FontIcon> }
            containerElement={<Link activeClassName="active" to={ '/purchases' } />}
            className="menu-item"
            onTouchTap={() => { this._onRequestChange(false) }} />

          <Divider inset style={{margin: '10px 20px'}} />
        </Menu>

        <Menu autoWidth={false} width={256}>

          <MenuItem
            primaryText="Salir"
            leftIcon={ <FontIcon className="material-icons">power_settings_new</FontIcon> }
            className="menu-item"
            onTouchTap={() => {
              this._onRequestChange(false)
              this.props.onLogout()
            }} />
        </Menu>
      </div>
    )
  }

  render() {
    let { menuOpen } = this.state

    return (
      <div className="nav-bar-component">
        <MediaQuery query='(min-width: 1224px)'>
          <nav className="nav">
            <div className="top">
              <span className="main-logo-white">ProVm</span>
            </div>
            { this._buildMenu() }
          </nav>
        </MediaQuery>

        <MediaQuery query='(max-width: 1224px)'>
          <Drawer
            open={ menuOpen }
            width={256}
            docked={false}
            containerClassName={'drawer'}
            onRequestChange={ this._onRequestChange }>
            <div className="top">
              <span className="main-logo-white">ProVm</span>
            </div>
            { this._buildMenu() }
          </Drawer>
        </MediaQuery>
      </div>
    );
  }
}


function mapDispatchToProp(dispatch) {
  return {
    onLogout: () => {
      dispatch(logout());
    },
  };
}

export default connect(null, mapDispatchToProp)(NavBarComponent);
