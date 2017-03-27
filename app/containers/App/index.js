import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import classnames from 'classnames';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Sidebar from '../../components/Sidebar';
import { selectCurrentUser } from './selectors';
import { logout } from './actions';
injectTapEventPlugin();



class App extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    children: React.PropTypes.node,
  }

  constructor(props) {
    super(props);
    this.state = { open: true };
    this.handleToggle = this.handleToggle.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleToggle() {
    this.setState({ open: !this.state.open });
  }

  handleClose() {
    this.setState({ open: true });
  }

  handleDrawer(openDrawer) {
    this.setState({ open: openDrawer });
  }


  render() {
    const { user, handleLogout } = this.props;
    let sidebar;
    if (user) {
      sidebar = <Sidebar
        handleToggle={this.handleToggle}
        open={this.state.open}
        onDrawerChange={this.handleDrawer}
        user={user}
        onLogout={handleLogout}
      />;
    }
    return (
      <div>
        <MuiThemeProvider>
          <div>
            {sidebar}
            <div>
              <div className={classnames('app-content', { expanded: this.state.open })}> { React.Children.toArray(this.props.children) }</div>
            </div>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}


export function mapDispatchToProps(dispatch) {
  return {
    handleLogout: () => {
      dispatch(logout());
    },
  };
}

const mapStateToProps = createStructuredSelector({
  user: selectCurrentUser(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(App);
