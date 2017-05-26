import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import classnames from 'classnames';

class ButtonComponent extends React.Component {
  static defaultProps = {
    lodaing: false,
  }

  /*
  * Returns the button corresponding to its type and in the state found
  * @return {Component} react component
  */
  _buildButton() {
    let { label, loading, isFinished, primary, flat, disabled, type, icon, classNames, href, fullWidth } = this.props,
      labelContent = null;

    if (loading) {
      const loadingColor = flat ? '#CCC' : '#FFF';
      labelContent = <CircularProgress size={20} thickness={1} color={loadingColor} style={{ marginTop: 10 }} innerStyle={{ display: 'flex', justify: 'content', alignItems: 'center' }} />;
    } else {
      labelContent = label;
    }


    if (!flat) {
      return (
        <RaisedButton
          className={classnames('btn-component', { [classNames]: classNames })}
          fullWidth={fullWidth}
          type={type}
          label={labelContent}
          primary={primary}
          disabled={disabled}
          onTouchTap={this.props.onClick}
          icon={icon ? <FontIcon className="material-icons">{ icon }</FontIcon> : null}
        />
      );
    } else {
      return (
        <FlatButton
          className={classnames('btn-component', { [classNames]: classNames })}
          type={type}
          label={labelContent}
          primary={primary}
          disabled={disabled}
          onTouchTap={this.props.onClick}
          icon={icon ? <FontIcon className="material-icons">{ icon }</FontIcon> : null}
        />
      );
    }
  }

  render() {
    const button = this._buildButton();
    return button;
  }
}


export default ButtonComponent;
