import React from 'react';
import ClassNames from 'classnames';
import PropTypes from 'prop-types';
import format from 'date-fns/format';
import isToday from 'date-fns/isToday';
import { Link } from 'react-router-dom'

import IconReaded from '../IconReaded/IconReaded';
import './DialogItem.scss';
import Avatar from '../Avatar/Avatar';
import differenceInMinutes from 'date-fns/differenceInMinutes';

const getMessageTime = created_at => {
  // Преобразуем строку в объект даты
  const dateObject = new Date(created_at);

  // Проверяем, сегодня ли дата создания сообщения
  return isToday(dateObject)
      ? format(dateObject, 'HH:mm')
      : format(dateObject, 'dd.MM.yyyy');
};


const isOnline = last_seen => (
  differenceInMinutes(new Data().toIsoString(), last_seen) < 5
)

const DialogItem = ({ 
  id, 
  isMe, 
  onSelect, 
  currentDialogId, 
  partner, 
  lastMessage 
}) => (
  <Link to={`/chat/${id}`} style={{ textDecoration: 'none' }}>
  
  <div className={ClassNames('dialogs__item', {
    'dialogs__item--online': false,
    'dialogs__item--selected': currentDialogId === id
  })}
    onClick={() => onSelect(id)}
  >
    <div className='dialogs__item-avatar'>
      <Avatar user={partner} />
    </div>
    <div className="dialogs__item-info">
      <div className="dialogs__item-info-top">
        <b>{partner.surname} {partner.username}</b>
        <span>
          {getMessageTime(lastMessage.created_at)}
        </span>
      </div>
      <div className="dialogs__item-info-bottom">
        <p>
          {lastMessage.title}
        </p>
        {isMe && <IconReaded isMe />}
        {lastMessage.unread > 0 &&
          <div className="dialogs__item-info-bottom-count">
            {lastMessage.unread > 9 ? "+9" : lastMessage.unread}
          </div>}

      </div>
    </div>
  </div>
  </Link>
);

  DialogItem.defaultProps = {
    user: {},
    isMe: false,
    text: '',
    unreaded: 0,
    created_at: new Date()
  };
  
  DialogItem.propTypes = {
    user: PropTypes.object,
    isMe: PropTypes.bool,
    text: PropTypes.string,
    unreaded: PropTypes.number,
    created_at: PropTypes.instanceOf(Date)

  };
  

export default DialogItem;