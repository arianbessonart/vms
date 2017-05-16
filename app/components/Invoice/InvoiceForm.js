import React from 'react';
import {TextField, Checkbox, Toggle, DatePicker} from 'material-ui';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentSave from 'material-ui/svg-icons/content/save';
import { Link } from 'react-router';
import { Grid, Row, Col} from 'react-bootstrap';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';

import InvoiceItemTable from '../../containers/InvoicePage/InvoiceItemTable';
import ClientSelector from '../../containers/Client/ClientSelector';

class InvoiceForm extends React.Component {

  componentDidMount() {
  }

  render() {
    const { clients, invoice, onSelectedClient, clientSelected,
      addItem, handleName, handleNumber, handleDate,
      changeItemAmount, save, handleRetention, changeItemDetail,
      addInvoice, deleteItem
    } = this.props;
    return (
      <div>
        <Grid style={{ margin: '10px' }}>
          <Row className="show-grid">
            <Col xs={6} md={4}>
              <Card>
                <CardTitle>
                  <h4>Client</h4>
                </CardTitle>
                <CardText>
                  <ClientSelector onSelected={onSelectedClient} selected={invoice ? invoice.client : null} clients={clients} />
                  <TextField
                    disabled
                    floatingLabelText="RUT"
                    value={clientSelected ? clientSelected.rut : ''}
                  />
                  <TextField
                    disabled
                    floatingLabelText="Address"
                    value={clientSelected ? clientSelected.address : ''}
                  />
                </CardText>
              </Card>
            </Col>
            <Col xs={6} md={4}>
              <Card>
                <CardTitle>
                  <h4>Invoice</h4>
                </CardTitle>
                <CardText>
                  <TextField
                    floatingLabelText="Name Name"
                    name="nameName"
                    value={invoice.name}
                    onChange={(e, val) => handleName(val)}
                  />
                  <TextField
                    floatingLabelText="Invoice N⁰"
                    name="invoiceNumber"
                    value={invoice.number}
                    onChange={(e, val) => handleNumber(val)}
                  />
                  <DatePicker floatingLabelText="Date" mode="landscape" value={invoice.date} onChange={(e, val) => handleDate(val)} />
                  <Toggle
                    label="Retention"
                    toggled={invoice.retention}
                    labelPosition="right"
                    onToggle={handleRetention}
                  />
                </CardText>
              </Card>
            </Col>
            <Col xs={6} md={4}>
              <Card>
                <CardTitle>
                  <h4>Total</h4>
                </CardTitle>
                <CardText>
                  <TextField
                    disabled
                    floatingLabelText="Sub Total"
                    value={invoice.subTotal.format(2)}
                  />
                  <TextField
                    disabled
                    floatingLabelText="Iva"
                    value={invoice.iva.format(2)}
                  />
                  <TextField
                    disabled
                    floatingLabelText="Total"
                    value={invoice.total.format(2)}
                  />
                </CardText>
              </Card>
            </Col>
          </Row>
          <hr />
          <Row style={{ padding: '10px' }}>
            <div style={{ clear: 'both' }}>
              <FloatingActionButton onClick={addItem}>
                <ContentAdd />
              </FloatingActionButton>
              <FloatingActionButton style={{ float: 'right' }} onClick={() => addInvoice(invoice, clientSelected)}>
                <ContentSave />
              </FloatingActionButton>
            </div>
            <InvoiceItemTable invoice={invoice} changeItemAmount={changeItemAmount} deleteItem={deleteItem} changeItemDetail={changeItemDetail} />
          </Row>
        </Grid>
      </div>
    );
  }
}

InvoiceForm.propTypes = {
  changeItemAmount: React.PropTypes.func,
  changeItemDetail: React.PropTypes.func,
  deleteItem: React.PropTypes.func,
};

export default InvoiceForm;
