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
  constructor() {
    super();
  }

  render() {
    const { data, onEdit, onDelete, onChangeState, onChangeVisibility, onFavorite, owner } = this.props;

    if (_.isEmpty(data)) {
      return <div></div>;
    }

    return (
      <div className="invoice-preview">
        <div className="header">
          <Avatar
            icon={<FontIcon className="muidocs-icon-communication-voicemail" />}
            color={'#CFCFCF'}
            backgroundColor={'#D8D8D8'}
            size={64}
          />
          <h1>{ data.name }</h1>
        </div>

        { owner &&
          <div className="actions">
            <Button
              flat
              label={data.active ? 'Ocultar' : 'Activar'}
              icon={data.active ? 'visibility_off' : 'visibility'}
              onClick={() => { onChangeVisibility(data._id, !data.active); }}
            />
            <Button flat label="Editar" icon="edit" onClick={() => { onEdit(data._id); }} />
            <Button flat label="Borrar" icon="delete" onClick={() => { onDelete(data._id); }} />
          </div>
        }

        {
          !owner &&
          <div className="actions">
            <Button
              classNames={classnames({ active: data.favorite })}
              label="Favorito"
              flat
              icon="star"
              onClick={() => { onFavorite(data._id); }}
            />
            <Button flat label="Agregar al PEDIDO" icon="shopping_cart" onClick={() => { }} />
          </div>
        }

        <Card className="card">
          <Tabs className="tabs">
            <Tab label="Información" className="tab" buttonStyle={styles.tabStyle} >
              <CardText className="card-content info">
                <DataPair label={'Código'} value={data.code} />
                <DataPair label={'Unidad'} value={data.unitPrice} />
                <DataPair label={'Fracción Minima'} value={_.concat(data.minimumFraction, data.unitPrice)} />
                <DataPair label={'Descripción'} value={data.description} />
              </CardText>
            </Tab>

            <Tab label="Media" className="tab" buttonStyle={styles.tabStyle}>
              <div>
                <CardText>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
                  Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
                  Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
                </CardText>
              </div>
            </Tab>

            <Tab label="Extras" className="tab" buttonStyle={styles.tabStyle}>
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
  owner: React.PropTypes.bool,
};

InvoicePreview.defaultProps = {
  hasMore: false,
  loading: true,
  owner: true,
};

export default InvoicePreview;
