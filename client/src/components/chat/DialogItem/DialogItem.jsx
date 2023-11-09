import React from 'react';
import ClassNames from 'classnames';
import PropTypes from 'prop-types';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import ruLocale from "date-fns/locale/ru";

import IconReaded from '../IconReaded/IconReaded';
import "./DialogItem.scss";

const getAvatar = avatar => {
    if (avatar) {
        return (
        <img
        src = "https://sun7-18.userapi.com/impg/AGGtfJewPxXacmAK9mdKZj_VQfSnxInj4LfS3w/UEmsPHjunok.jpg?size=1439x2160&quality=95&sign=55b85541fb3e59766f7f90ea6f44c03f&type=album"
        alt=""
        />)
    } else {
        // make avatar
    }
};

const DialogItem = ({ user, message, unreaded }) => (
    <div className={ClassNames('dialogs__item', {
        'dialogs__item--online': user.isOnline
        })}>
        <div className='dialogs__item-avatar'>
            {/* <img src={user.avatar} alt={`${user.fullname} avatar`} /> */}
            {getAvatar(
                "https://sun7-18.userapi.com/impg/AGGtfJewPxXacmAK9mdKZj_VQfSnxInj4LfS3w/UEmsPHjunok.jpg?size=1439x2160&quality=95&sign=55b85541fb3e59766f7f90ea6f44c03f&type=album"
            )}
           

        </div>
        <div className="dialogs__item-info">
            <div className="dialogs__item-info-top">
                <b>{user.fullname}</b>
                <span>
                {formatDistanceToNow(new Date('Fri Nov 6 2023 17:10:09'), { addSuffix: true, locale: ruLocale })}
                </span>
            </div>
            <div className="dialogs__item-info-bottom">
                <p>Мы все свидетельствуем Вам глубочайшее наше почтение ии целуем
                    Вам ручки, дражайший папенька: Михайла, Федор, Варвара и Андрюша
                </p>
                <IconReaded isMe={true} isReaded={true} /> 
                {unreaded > 0 && 
                  <div className="dialogs__item-info-bottom-count">
                    {unreaded > 9 ? "+9": unreaded
                  }</div>
                }
                
            </div>
        </div>
    </div>
);

  DialogItem.defaultProps = {
    user: {},
    message: ''
  };
  
  DialogItem.propTypes = {
    message: PropTypes.string

  };
  

export default DialogItem;