

import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

import './LoadingIndicator.scss';

const LoadingIndicator = (props) => {
  const style = {
    height: props.height ? props.height : 'auto',
  };

  return (
    <div className="loading-indicator-component" style={style}>
      <CircularProgress />
    </div>
  );
};

export default LoadingIndicator;
