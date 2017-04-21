'use strict'
import React from 'react';
import { List, ListItem } from 'material-ui/List';
import classnames from 'classnames';
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon';
// import InfiniteScroll from 'react-infinite-scroller';

import './InvoiceList.scss';

class InvoiceListComponent extends React.Component {
  _buildList = () => {
    const { data } = this.props;
    return data ? data.map((invoice, idx) => {
      return (
        <div className="invoice-item-container" key={`invoice-${idx}`}>
          <ListItem
            className={classnames('invoice-item')}
            primaryText={invoice.name}
            secondaryTextLines={2}
            leftAvatar={<Avatar icon={<FontIcon className="material-icons">store</FontIcon>} />}
            secondaryText={
              <p>
                Client: {invoice.client.name} <br />
                Número: {invoice.number} <br />
              </p>
            }
          />
        </div>
      );
    }) : null;
  }
  render() {
    return (
      <div className="invoicelist-component">
        <List>
          { this._buildList() }
        </List>
      </div>
    );
  }
}

export default InvoiceListComponent;
