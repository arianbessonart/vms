import React from 'react';
import classnames from 'classnames';
import {Link} from 'react-router'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import Sidebar from '../../components/Sidebar';


export default class App extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  constructor(props){
    super(props);
    this.state = {open: true};
    this.handleToggle = this.handleToggle.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleToggle() {
    this.setState({open: !this.state.open});
  }

  handleClose() {
    this.setState({open: true});
  }

  handleDrawer(openDrawer) {
    this.setState({open: openDrawer})
  }


  render() {
    return (
      <div>
        <MuiThemeProvider>
          <div>
            <Sidebar handleToggle={this.handleToggle} open={this.state.open} onDrawerChange={this.handleDrawer} />
            <div>
              <div className={classnames('app-content', {'expanded': this.state.open})}> { React.Children.toArray(this.props.children) }</div>
            </div>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }

  static propTypes = {
    children: React.PropTypes.node,
  };

}
