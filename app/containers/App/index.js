import React from 'react';
import {Link} from 'react-router'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Sidebar from 'react-sidebar';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

export default class App extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  render() {
    const sidebarContent = "";
    return (
      <div>
        <MuiThemeProvider>
          <div>
            <Sidebar sidebar={sidebarContent}
                     open
                     docked>
              {React.Children.toArray(this.props.children)}
            </Sidebar>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }

  static propTypes = {
    children: React.PropTypes.node,
  };

}
