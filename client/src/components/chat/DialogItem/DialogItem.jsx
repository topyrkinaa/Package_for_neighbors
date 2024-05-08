import React from 'react';
import ClassNames from 'classnames';
import PropTypes from 'prop-types';
import format from 'date-fns/format';
import isToday from 'date-fns/isToday';
import { Link } from 'react-router-dom';
import reactStringReplace from 'react-string-replace';

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

const isMeName = partner => {
    if (partner.id === user.id) {
        partner = currentDialogObj.partner;
    } else {

        partner = partner;
    }
  }

const DialogItem = ({ 
  id, 
  isMe, 
  currentDialogId, 
  partner, 
  lastMessage 
}) => (
  <Link to={`/chat/${id}`} style={{ textDecoration: 'none' }}>
  <div className={ClassNames('dialogs__item', {
    'dialogs__item--online': false,
    'dialogs__item--selected': currentDialogId === id
  })}
  >
    <div className='dialogs__item-avatar'>
      <Avatar user={partner} />
    </div>
    <div className="dialogs__item-info">
      <div className="dialogs__item-info-top">
        <b>{partner.username} {partner.surname}</b>
        <span>
          {getMessageTime(lastMessage.created_at)}
        </span>
      </div>
    <div className="dialogs__item-info-bottom">

    {lastMessage.title && (<p>
              {reactStringReplace(lastMessage.title, /:(.+?):/g, (match,i) => (
                <em-emoji id={match} set="apple"></em-emoji>
              ))}
              </p>
      )}
        {isMe && <IconReaded isMe isReaded={lastMessage.readed} />}
        {/*lastMessage.readed > 0 &&
          <div className="dialogs__item-info-bottom-count">
            {lastMessage.readed > 9 ? "+9" : lastMessage.readed}
    </div>*/}

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