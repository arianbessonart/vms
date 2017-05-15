import React from 'react';
import { List, ListItem } from 'material-ui/List';
import classnames from 'classnames';
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon';
import InfiniteScroll from 'react-infinite-scroller';
import LinearProgress from 'material-ui/LinearProgress';
import CircularProgress from 'material-ui/CircularProgress';

import EmptyMessage from 'ui/components/EmptyMessage';

import './InvoiceList.scss';

class InvoiceListComponent extends React.Component {
  _buildList = () => {
    const { data, onSelectInvoice, selectedInvoice } = this.props;
    return data ? data.map((invoice, idx) => {
      return (
        <div key={`invoice-${idx}`}>
          <ListItem
            className={classnames('invoice-item', {
              active: selectedInvoice._id === invoice._id,
            })}
            primaryText={invoice.name}
            secondaryTextLines={2}
            leftAvatar={<Avatar icon={<FontIcon className="material-icons">store</FontIcon>} />}
            secondaryText={
              <p>
                Client: {invoice.client.name} <br />
                Número: {invoice.number} <br />
              </p>
            }
            onTouchTap={() => { onSelectInvoice(invoice); }}
          />
        </div>
      );
    }) : null;
  }
  render() {
    const { data, loadMore, hasMore, loading, page, limit } = this.props;
    return (
      <div className="invoices-list">
        <List className="infinte-list-container">
          { loading && <LinearProgress mode="indeterminate" /> }
          { !loading && data.length === 0 && <EmptyMessage message={'No hay facturas'} icon="assignment" /> }
          <InfiniteScroll
            className="infinite-list"
            pageStart={1}
            threshold={50}
            initialLoad
            loadMore={() => { console.log('Load more...'); loadMore(); }}
            hasMore={hasMore}
            useWindow={false}
            loader={<div></div>}
          >
            {this._buildList()}
          </InfiniteScroll>
        </List>
      </div>
    );
  }
}

InvoiceListComponent.propTypes = {
  onSelectInvoice: React.PropTypes.func,
  data: React.PropTypes.any,
  selectedInvoice: React.PropTypes.object,
  loadMore: React.PropTypes.func,
  hasMore: React.PropTypes.bool,
  loading: React.PropTypes.bool,
  page: React.PropTypes.number,
  limit: React.PropTypes.number,
};

export default InvoiceListComponent;
