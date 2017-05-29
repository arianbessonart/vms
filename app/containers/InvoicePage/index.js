import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { DatePicker } from 'material-ui';

import InvoicePreview from 'components/Invoice/InvoicePreview';
import InvoicesFilters from 'components/Invoice/InvoicesFilters';
import InvoiceList from '../../components/Invoice/InvoiceList';
import { loadInvoices, deleteInvoice, editInvoice } from './actions';
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
      const { filters, query } = this.props;
      this.props.fetchInvoices(query, filters, page);
    }
  }

  _search = (query) => {
    this.props.fetchInvoices(query, this.props.filters, 1);
  }

  _filter = (name, value) => {
    this.props.fetchInvoices(this.props.query, { [name]: value }, 1);
  }

  _onView = (id) => {
    this.props.router.push(`/invoices/${id}`);
  }

  _onEdit = (id) => {
    this.props.router.push(`/invoices/${id}/edit`);
  }

  _onCharge = () => {
    this.dp.openDialog();
  }

  handleOnChargeConfirmed = (e, date) => {
    this.props.chargeInvoice(this.state.selectedInvoice, date);
  };

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
            onCharge={this._onCharge}
            onView={this._onView}
            onEdit={this._onEdit}
            onDownload={this._onDownload}
          />
        </div>
        { this.props.modal }
        <DatePicker ref={(c) => { this.dp = c; }} style={{ display: 'None' }} name="chargeDp" onChange={this.handleOnChargeConfirmed} />
      </section>
    );
  }
}

InvoicePage.propTypes = {
  invoices: React.PropTypes.any,
  fetchInvoices: React.PropTypes.func,
  chargeInvoice: React.PropTypes.func,
  hasMore: React.PropTypes.bool,
  loading: React.PropTypes.bool,
  page: React.PropTypes.number,
  filters: React.PropTypes.any,
  modal: React.PropTypes.any,
  router: React.PropTypes.any,
  query: React.PropTypes.string,
};


export function mapDispatchToProps(dispatch) {
  return {
    fetchInvoices: (query, filters, page, limit) => {
      dispatch(loadInvoices(query, filters, page, limit));
    },
    chargeInvoice: (invoice, date) => {
      invoice.status = 'charged';
      invoice.dateBilled = date;
      dispatch(editInvoice(invoice));
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
