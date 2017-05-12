"use strict";

import React from "react";
import NavBar from "ui/components/NavBar";
import AppBar from "ui/components/AppBar";

import "../../styles/core.scss";

import "./CoreLayout.scss";

class CoreLayout extends React.Component {
  static propTypes = {
    children: React.PropTypes.element.isRequired,
    actionBar: React.PropTypes.element,
  };

  constructor(props) {
    super(props);
    this._toggleNavBar = this._toggleNavBar.bind(this);
    this.state = {
      navBarOpen: false,
    };
  }

  _toggleNavBar(open) {
    this.setState({ navBarOpen: open });
  }

  render() {
    const { children, actionBar, modal } = this.props;
    const { navBarOpen } = this.state;

    return (
      <div className="layout layout-core flex flex-row">
        <NavBar menuOpen={navBarOpen} onToggleMenu={this._toggleNavBar} />
        <section className="content">
          <AppBar
            onToggleNavbar={this._toggleNavBar}
            route={children.props.route}
            actionBar={actionBar}
          />
          <main>
            {children}
          </main>
        </section>
      </div>
    );
  }
}

export default CoreLayout;
