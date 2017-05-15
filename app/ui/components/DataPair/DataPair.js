import React from 'react';
import './DataPair.scss';

const component = (props) => {
  let { label, value } = props;

  return (
    <div className="datapair-component">
      <span className="label">{ label }</span>
      <p className="value">{ value || '-' }</p>
    </div>
  );
};

export default component;
