import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Button from 'ui/components/Button';
// import ProductExportDialog from 'components/Product/ProductExportDialog';

class InvoiceActionBar extends React.Component {

  state = {
    exportModal: false,
  }

  /**
   * Callback to go to products form
   */
  _addInvoice = () => {
    this.props.router.push('/invoices/add');
  }

  /**
   * Shows the export modal.
   */
  _exportInvoices = () => {
    this.setState({ exportModal: true });
  }

  /**
  * Callback to the close the export modal.
  */
  _onCloseExportModal = () => {
    this.setState({ exportModal: false });
  }


  render() {
    const { exportModal } = this.state;

    return (
      <div className="action-bar product-action-bar">
        <Button flat label="Nuevo" icon="add_circle" onClick={this._addInvoice} />
        <Button flat label="Exportar" icon="file_download" onClick={this._exportInvoices} />

        {/*<ProductExportDialog
          open={exportModal}
          onClose={this._onCloseExportModal}
          storeId={this._getStoreId()}
        />*/}
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
});

InvoiceActionBar.propTypes = {
  router: React.PropTypes.any,
};

export default connect(mapStateToProps)(InvoiceActionBar);
