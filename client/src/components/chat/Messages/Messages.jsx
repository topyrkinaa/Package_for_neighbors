import React from "react";
import PropTypes from "prop-types";
import { Empty, Spin } from 'antd';
import classNames from "classnames";

import Message from "../message/Message";
import './Messages.scss';

const Messages = ({ onRemoveMessage, blockRef, isLoading, items, user }) => {
    return (
    <div 
    ref={blockRef}
    className={classNames('messages', {'messages--loading': isLoading})}> 
    { isLoading ? (
            <Spin size="large" tip="Загрузка сообщений..." /> 
        ) : items && !isLoading ? (
            items.length > 0 ? (
            items.map(item => 
            <Message 
                key={item.id} 
                {...item} 
                isMe={
                    user && user.id === item.user.id} 
                onRemoveMessage={onRemoveMessage.bind(this, item.id)}/>)
            ) : ( 
            <Empty description="Диалог пуст" /> 
            )
            ) : (
            <Empty description="Начните диалог" />   
        )}
    </div>
    );
};


Messages.defaultProps = {
    items: null,
};

  Messages.propTypes = {
    items: PropTypes.any,
};

export default Messages;