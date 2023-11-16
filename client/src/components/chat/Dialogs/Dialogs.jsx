import React from 'react';
import PropTypes from 'prop-types';
import orderBy from 'lodash/orderBy';

import './Dialogs.scss';
import DialogItem from '../DialogItem/DialogItem';

const Dialogs = ({ items, userId }) => (
    <div className="dialogs">
    {orderBy(items,["created_at"],["desc"]).map(item => (
        <DialogItem
          key={item.id} isMe={item.user.id === userId} {...item}
        />
    ))}
  </div>
);


export default Dialogs;


