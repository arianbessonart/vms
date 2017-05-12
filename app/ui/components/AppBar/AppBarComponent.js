'use strict'

import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon';

import { selectCurrentUser } from 'containers/App/selectors';

import './AppBar.scss'

class AppBarComponent extends React.Component {
  static propTypes = {
    title: React.PropTypes.string,
    onToggleNavbar: React.PropTypes.func.isRequired
  };

  constructor(props) {
    super(props)
    this._checkSize = this._checkSize.bind(this)
    this.state = {
      mobile : this._isMobile()
    }
  }

  componentWillMount() {
    window.addEventListener("resize", this._checkSize)
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this._checkSize)
  }

  _checkSize() {
    this.setState({ mobile: this._isMobile() });
  }

  _isMobile() {
    let w = window,
      d = document,
      documentElement = d.documentElement,
      body = d.getElementsByTagName('body')[0],
      width = w.innerWidth || documentElement.clientWidth || body.clientWidth

    return width < 1224
  }

  _renderRight() {
    let { user } = this.props

    return (
      <div className="right-col">
        <div className="action-bar-container">
          { this.props.actionBar }
        </div>
        <div className="user-info">
          <div className="data">
            <span className="name">{ user && user.store.name }</span>
            <span className="email">{ user && user.mail }</span>
          </div>
          <Link to="/profile">
            <Avatar />
          </Link>
        </div>
      </div>
    )
  }

  render() {
    let { mobile } = this.state,
        { onToggleNavbar, route } = this.props

    return (
      <AppBar
        className="main-appbar-component"
        title={ route.title ? route.title : '' }
        style={{ minHeight: '64px' }}
        titleStyle={{ color: '#444', lineHeight: '64px' }}
        iconStyleLeft={{ display: 'flex', alignItems: 'center' }}
        iconElementLeft={<IconButton iconClassName="material-icons" iconStyle={{ color: '#666' }}>menu</IconButton>}
        showMenuIconButton={ mobile }
        onLeftIconButtonTouchTap={() => { onToggleNavbar(true) }}
        iconStyleRight={{ display: 'flex', alignItems: 'center' }}
        iconElementRight={ this._renderRight() } />
    );
  }
}

const mapStateToProps = createStructuredSelector({
  user: selectCurrentUser(),
});

export default connect(mapStateToProps)(AppBarComponent);
