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
        <tr key={`invoice-${idx}`} className={classnames('item', {
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
    console.log(invoice);
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
                    Creada: {moment(invoice.date).format('DD-MM-YYYY')}<br />
                    Due: February 1, 2015
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
                    <img src="http://gmkfreelogos.com/logos/G/img/Geant-1.gif" style={{width: '100%', maxWidth: '300px'}} />
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
              Precio
            </td>
          </tr>
          {this.buildItems()}
          <tr className="total">
            <td />
            <td>
              Total: $385.00
            </td>
          </tr>
        </table>
      </div>
    );
  }
};

InvoiceView.propTypes = {
  store: React.PropTypes.object,
  handleSubmit: React.PropTypes.func,
  onCancel: React.PropTypes.func
};

export default InvoiceView;
