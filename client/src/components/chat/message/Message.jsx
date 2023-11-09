import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import ruLocale from "date-fns/locale/ru";


import "./Message.scss";
import IconReaded from '../IconReaded/IconReaded';

const Message = ({ 
  avatar, 
  user, 
  text, 
  date, 
  isMe, 
  isReaded, 
  attachments, 
  isTyping 
}) => (
  <div className={ClassNames('message', { 
    'message--isme': isMe, 
    'message--is-typing': isTyping,
    'message--image': attachments && attachments.length === 1
    })}>
    <div className='message__content'>
     <IconReaded isMe={isMe} isReaded={isReaded} />
      <div className='message__avatar'>
        <img src={avatar} alt={`Avatar ${user.fullname}`} />
      </div>
      <div className="message__info">
      {(text || isTyping) && (
          <div className="message__bubble">
            {text && <p className="message__text">{text}</p>}
            {isTyping && <div className="message__typing">
                  <span />
                  <span />
                  <span />
            </div> }
          </div> 
          )}
          <div className="message__attachments">
          { attachments &&
           attachments.map(item => (
            <div className="message__attachments-item">
              <img src={item.url} alt={item.filename} />
            </div>
          ))}
        </div>
          {date && 
          <span className="message__date">
            {formatDistanceToNow(new Date(date), { addSuffix: true, locale: ruLocale })}
          </span> }
      </div>
    </div>
  </div>
);

Message.defaultProps = {
  user: {},
  avatar: '', // Значение по умолчанию для "avatar"
  text: '', // Значение по умолчанию для "text"
  date: '', // Значение по умолчанию для "date"
  isMe: false, // Значение по умолчанию для "isMe"
  isReaded: false, // Значение по умолчанию для "isReaded"
  attachments: [], // Значение по умолчанию для "attachments"
  isTyping: false, // Значение по умолчанию для "isTyping"
};

Message.propTypes = {
  avatar: PropTypes.string,
  text: PropTypes.string,
  date: PropTypes.string,
  user: PropTypes.object,
  isMe: PropTypes.bool,
  isReaded: PropTypes.bool,
  attachments: PropTypes.array,
  isTyping: PropTypes.bool
};

export default Message;
