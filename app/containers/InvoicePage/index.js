import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import InvoicePreview from 'components/Invoice/InvoicePreview';
import InvoicesFilters from 'components/Invoice/InvoicesFilters';
import InvoiceList from '../../components/Invoice/InvoiceList';
import { loadInvoices, filterInvoices, deleteInvoice, editInvoice } from './actions';
import { selectLoading, selectInvoices, selectHasMore, selectPage, selectQuery, selectFilters } from '../InvoicePage/selectors';


import './InvoicesPage.scss';

class InvoicePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  state = {
    selectedInvoice: {},
  };

  componentDidMount() {
    this.props.fetchInvoices();
  }

  _onSelect = (selectedInvoice) => {
    this.setState({ selectedInvoice });
  }

  _loadMore = () => {
    if (!this.props.loading) {
      const page = this.props.page + 1;
      let { filters, query } = this.props;
      this.props.fetchInvoices(query, filters, page);
    }
  }

  _search = (query) => {
    this.props.fetchInvoices(query, this.props.filters, 1);
  }

  _filter = (name, value) => {
    this.props.fetchInvoices(this.props.query, { [name]: value }, 1);
  }

  render() {
    const { invoices, loading, hasMore, page } = this.props;
    const { selectedInvoice } = this.state;

    return (
      <section className="invoices-page">
        <div className="list-container">
          <div className="filter-container">
            <InvoicesFilters onSearch={this._search} onFilter={this._filter} />
          </div>

          <InvoiceList
            data={invoices}
            loading={loading}
            loadMore={this._loadMore}
            page={page}
            hasMore={hasMore}
            onSelectInvoice={this._onSelect}
            selectedInvoice={selectedInvoice}
          />
        </div>
        <div className="preview-container">
          <InvoicePreview
            data={selectedInvoice}
            onEdit={this._onEdit}
            onDelete={this._onDelete}
          />
        </div>
      </section>
    );
  }
}

InvoicePage.propTypes = {
  invoices: React.PropTypes.any,
  fetchInvoices: React.PropTypes.func,
  hasMore: React.PropTypes.bool,
  loading: React.PropTypes.bool,
  page: React.PropTypes.number,
  filters: React.PropTypes.any,
  query: React.PropTypes.string,
};


export function mapDispatchToProps(dispatch) {
  return {
    fetchInvoices: (query, filters, page, limit) => {
      dispatch(loadInvoices(query, filters, page, limit));
    },
  };
}

const mapStateToProps = createStructuredSelector({
  invoices: selectInvoices(),
  loading: selectLoading(),
  hasMore: selectHasMore(),
  page: selectPage(),
  filters: selectFilters(),
  query: selectQuery(),
});

export default connect(mapStateToProps, mapDispatchToProps)(InvoicePage);
