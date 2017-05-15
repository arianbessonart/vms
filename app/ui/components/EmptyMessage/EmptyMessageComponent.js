import React from 'react';
import FontIcon from 'material-ui/FontIcon';

import './EmptyMessage.scss';

const EmptyMessage = ({ icon, message }) => (
  <div className="emptymessage-component">
    <FontIcon className="material-icons">{ icon }</FontIcon>
    <p>{ message }</p>
  </div>
  );

export default EmptyMessage;
