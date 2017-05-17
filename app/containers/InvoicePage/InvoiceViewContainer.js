import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Dialog from 'material-ui/Dialog';
import LoadingIndicator from 'ui/components/LoadingIndicator';
import InvoiceViewComponent from 'components/Invoice/InvoiceView';

import { selectSelectedInvoice } from './selectors';
import { loadInvoice } from './actions';

class InvoiceView extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  state = {
    open: true,
  }

  componentWillMount() {
    this.props.fetchInvoice(this.props.params.invoiceId);
  }

  onCancel = () => {
    this.setState({
      open: false,
    }, () => {
      setTimeout(() => {
        this.props.router.replace('/invoices');
      }, 500);
    });
  }

  handleClose = () => {
    this.setState({ open: false });
    this.props.router.replace('/invoices');
  };

  render() {
    const { invoice } = this.props;
    const { open } = this.state;
    return (
      <Dialog
        titleClassName="dialog-title"
        title={invoice ? invoice.name : ''}
        modal={false}
        onRequestClose={this.handleClose}
        open={open}
        autoDetectWindowHeight={false}
        style={{ overflowY: 'auto' }}
        contentStyle={{ transform: 'translate(0px, 30px)' }}
      >
        {
          invoice ? <InvoiceViewComponent invoice={invoice} />
          : <LoadingIndicator height="300px" />
        }
      </Dialog>
    );
  }
}

InvoiceView.propTypes = {
  params: React.PropTypes.object,
  router: React.PropTypes.object,
  invoice: React.PropTypes.object,
  fetchInvoice: React.PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    fetchInvoice: (invoiceId) => {
      dispatch(loadInvoice(invoiceId));
    },
  };
}

const mapStateToProps = createStructuredSelector({
  invoice: selectSelectedInvoice(),
});
export default connect(mapStateToProps, mapDispatchToProps)(InvoiceView);
