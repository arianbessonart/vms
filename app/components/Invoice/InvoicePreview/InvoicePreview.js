import React from 'react';
import classnames from 'classnames';
import _ from 'lodash';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import { Tabs, Tab } from 'material-ui/Tabs';
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon';

import Button from 'ui/components/Button';
import DataPair from 'ui/components/DataPair';
import './InvoicePreview.scss';

const styles = {
  tabStyle: {
    backgroundColor: '#FFF',
    color: '#000',
    fontSize: '14px',
    borderBottom: 'solid 1px rgba(207, 207, 207, 0.5)',
  },
};

class InvoicePreview extends React.Component {

  calculateRetention = (total) => total - (total * 0.07);

  render() {
    const { data, onEdit, onDelete } = this.props;
    if (_.isEmpty(data)) {
      return <div></div>;
    }

    return (
      <div className="invoice-preview">
        <div className="header">
          <Avatar
            icon={<FontIcon className="material-icons">store</FontIcon>}
            color={'#CFCFCF'}
            backgroundColor={'#D8D8D8'}
            size={64}
          />
          <h1>{data.name}</h1>
        </div>

        <div className="actions">
          <Button
            flat
            label={data.status === 'pending' ? 'Cobrar' : 'Cobrada'}
            icon={data.status === 'pending' ? 'monetization_on' : 'done'}
            disabled={data.status === 'charged'}
            onClick={() => { onChangeVisibility(data._id, !data.active); }}
          />
          <Button flat label="Editar" icon="edit" onClick={() => { onEdit(data._id); }} />
          <Button flat label="Borrar" icon="delete" onClick={() => { onDelete(data._id); }} />
        </div>

        <Card className="card">
          <Tabs className="tabs">
            <Tab label="Información" className="tab" buttonStyle={styles.tabStyle} >
              <CardText className="card-content info">
                <DataPair label={'Total'} value={data.total.format(2)} />
                <DataPair label={'Sub Total'} value={data.subTotal.format(2)} />
                <DataPair label={'IVA'} value={data.iva.format(2)} />
                <DataPair label={'Retención'} value={'$' + data.retention ? this.calculateRetention(data.total).format(2) : data.total.format(2)} />
              </CardText>
            </Tab>

            <Tab label="Detalle" className="tab" buttonStyle={styles.tabStyle}>
              <div>
                <CardText>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
                  Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
                  Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
                </CardText>
              </div>
            </Tab>
          </Tabs>
        </Card>
      </div>
    );
  }
}

InvoicePreview.propTypes = {
  data: React.PropTypes.object,
  loading: React.PropTypes.bool,
};

InvoicePreview.defaultProps = {
  hasMore: false,
  loading: true,
};

export default InvoicePreview;
