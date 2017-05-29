import React from "react";
import classnames from 'classnames';
import moment from 'moment';

import Button from "ui/components/Button";
import "./InvoiceView.scss";

class InvoiceView extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  buildItems = () => {
    const { invoice } = this.props;
    return invoice && invoice.items ? invoice.items.map((item, idx) => {
      return (
        <tr
          key={`invoice-${idx}`} className={classnames('item', {
            last: invoice.items.length - 1 === idx,
          })}>
          <td>
            {item.detail}
          </td>
          <td>
            ${item.amount.format(2)}
          </td>
        </tr>
      );
    }) : null;
  }

  render() {
    const { handleSubmit, onCancel, invoice } = this.props;
    if (!invoice) {
      return null;
    }
    return (
      <div className="invoice-box">
        <table cellPadding="0" cellSpacing="0">
          <tr className="top">
            <td colSpan="2">
              <table>
                <tr>
                  <td className="title">
                  </td>

                  <td>
                    Factura #: {invoice.number}<br />
                    Fecha Creada: {moment(invoice.date).format('LL')}<br />
                    Fecha Cobrada: {invoice.status === 'charged' ? moment(invoice.dateBilled).format('LL') : '-'}<br />
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr className="information">
            <td colSpan="2">
              <table>
                <tr>
                  <td>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr className="heading">
            <td>
              Item
            </td>
            <td>
              Monto
            </td>
          </tr>
          {this.buildItems()}
          <tr className="total">
            <td />
            <td>
              Total: ${invoice.total.format(2)}
            </td>
          </tr>
        </table>
      </div>
    );
  }
}

InvoiceView.propTypes = {
  invoice: React.PropTypes.object,
  handleSubmit: React.PropTypes.func,
  onCancel: React.PropTypes.func,
};

export default InvoiceView;
