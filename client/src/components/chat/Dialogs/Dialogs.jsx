import React from 'react';
import PropTypes from 'prop-types';
import { Input, Empty  } from 'antd';
import orderBy from 'lodash/orderBy';

import DialogItem from '../DialogItem/DialogItem';

import "./Dialogs.scss";

const { Search } = Input;


const Dialogs = ({ items, userId, onSearch, inputValue }) => (
    <div className="dialogs">
      <div className="dialogs__search">
            <Search
               placeholder="Поиск среди контактов"
               onChange={e => onSearch(e.target.value)}
               value={inputValue}
            />
          </div>
    {items.length ? orderBy(items,["created_at"],["desc"]).map(item => (
        <DialogItem 
        key={item.id} 
        isMe={item.user.id === userId} 
        {...item} />

    )): (
      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Ничего не" />
    )}
  </div>
);


export default Dialogs;


