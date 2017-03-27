import React from 'react';
import { Link, IndexLink } from 'react-router'
import classnames from 'classnames';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import Divider from 'material-ui/Divider'
import FontIcon from 'material-ui/FontIcon'

let Sidebar = ({ user, handleToggle, open, onDrawerChange, onLogout }) => {
  return (
    <div>
      <AppBar
        className={classnames('app-bar', { 'expanded': open })}
        onLeftIconButtonTouchTap={handleToggle}
        title="Vermis"
      />
      <Drawer
        docked
        open={open}
        onRequestChange={(openDrawer) => onDrawerChange(openDrawer)}
      >
        <MenuItem
          primaryText="Invoices"
          leftIcon={ <FontIcon className="material-icons">assignment</FontIcon> }
          containerElement={<Link activeClassName="active" to={ '/invoices' } />}
          className="menu-item" />
        <MenuItem
          primaryText="Clients"
          leftIcon={ <FontIcon className="material-icons">contacts</FontIcon> }
          containerElement={<Link activeClassName="active" to={ '/clients' } />}
          className="menu-item" />
        <MenuItem
          primaryText="Reports"
          leftIcon={ <FontIcon className="material-icons">pie_chart</FontIcon> }
          containerElement={<Link activeClassName="active" to={ '/reports' } />}
          className="menu-item" />
        <MenuItem
          primaryText="Settings"
          leftIcon={ <FontIcon className="material-icons">settings</FontIcon> }
          containerElement={<Link activeClassName="active" to={ '/settings' } />}
          className="menu-item" />
        {
          user
          ?
          <MenuItem
            primaryText="Logout"
            leftIcon={<FontIcon className="material-icons">exit_to_app</FontIcon>}
            className="menu-item"
            onTouchTap={onLogout}
          />
          : null
        }
      </Drawer>
    </div>
  );
};

export default Sidebar;
