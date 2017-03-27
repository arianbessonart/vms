import React from 'react';
import { connect } from 'react-redux';
import { DatePicker, TextField } from 'material-ui';
import RaisedButton from 'material-ui/RaisedButton';

import { login } from '../App/actions';

class LoginPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
    };
  }




  render() {
    const { handleLogin } = this.props;
    const _changeUsername = (value) => {
      this.setState({ username: value });
    }

    const _changePassword = (value) => {
      this.setState({ password: value });
    }

    return (
      <div>
        <TextField
          floatingLabelText="Username"
          name="username"
          value={this.state.username}
          onChange={(e, value) => _changeUsername(value)}
        />
        <TextField
          floatingLabelText="Password"
          name="password"
          type="password"
          value={this.state.password}
          onChange={(e, value) => _changePassword(value)}
        />
        <RaisedButton label="Login" primary onClick={() => handleLogin(this.state.username, this.state.password)} />
      </div>
    );
  }
}

LoginPage.propTypes = {
  handleLogin: React.PropTypes.any,
};

export function mapDispatchToProps(dispatch) {
  return {
    handleLogin: (username, password) => {
      dispatch(login(username, password));
    },
  };
}

export default connect(null, mapDispatchToProps)(LoginPage);
