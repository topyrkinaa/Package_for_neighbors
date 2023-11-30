import React from 'react';
import ClassNames from 'classnames';
import PropTypes from 'prop-types';
import format from 'date-fns/format';
import isToday from 'date-fns/isToday';

import IconReaded from '../IconReaded/IconReaded';
import './DialogItem.scss';
import Avatar from '../Avatar/Avatar';

const getMessageTime = created_at => (
    isToday(created_at)
      ? format(created_at, 'HH:mm')
      : format(created_at, 'dd.MM.yyyy')
);

const DialogItem = ({ user, unreaded, created_at, text, isMe }) => (
    
    
    <div className={ClassNames('dialogs__item', {
        'dialogs__item--online': user.isOnline
        })}>
        <div className='dialogs__item-avatar'>
            <Avatar user={user} />
        </div>
        <div className="dialogs__item-info">
            <div className="dialogs__item-info-top">
                <b>{user.fullname}</b>
                <span>
                {getMessageTime(created_at)}
                </span>
            </div>
            <div className="dialogs__item-info-bottom">
                <p>
                    {text}
                </p>
                { isMe && <IconReaded isMe  /> }
                {unreaded > 0 && 
                  <div className="dialogs__item-info-bottom-count">
                    {unreaded > 9 ? "+9": unreaded}
                   </div>
                }
                
            </div>
        </div>
    </div>
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