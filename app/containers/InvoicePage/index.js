import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import InvoicePreview from 'components/Invoice/InvoicePreview';
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
    console.log('seleccionado: ', selectedInvoice);
    this.setState({ selectedInvoice });
  }

  _loadMore = () => {
    if (!this.props.loading) {
      const page = this.props.page + 1;
      let { filters, query } = this.props;
      this.props.fetchInvoices(query, filters, page);
    }
  }

  render() {
    const { invoices, loading, hasMore, page } = this.props;
    const { selectedInvoice } = this.state;

    return (
      <section className="invoices-page">
        <div className="list-container">
          <InvoiceList
            data={invoices}
            loading={loading}
            loadMore={this._loadMore}
            page={page}
            hasMore
            onSelectInvoice={this._onSelect}
            selectedInvoice={this.state.selectedInvoice}
          />
        </div>
        <div className="preview-container">
          {/*<InvoicePreview
            data={selectedInvoice}
            onEdit={this._onEdit}
            onDelete={this._onDelete}
          />*/}
        </div>
      </section>
    );
  }
}

InvoicePage.propTypes = {
  filter: React.PropTypes.any,
  invoices: React.PropTypes.any,
  fetchInvoices: React.PropTypes.func,
  handleFilter: React.PropTypes.func,
  handleDelete: React.PropTypes.func,
  handleCancel: React.PropTypes.func,
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

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(InvoicePage);
