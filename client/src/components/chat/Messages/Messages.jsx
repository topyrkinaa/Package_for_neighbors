import React from "react";
import PropTypes from "prop-types";
import { Empty, Spin, Alert } from 'antd';
import classNames from "classnames";

import Message from "../message/Message";
import './Messages.scss';
// && items.length

const Messages = ({ blockRef, isLoading, items }) => {
    return (
    <div 
    ref={blockRef}
    className={classNames('messages', {'messages--loading': isLoading})}> 
    { isLoading ? (
            <Spin size="large" tip="Загрузка сообщений..." /> 
        ) : items && !isLoading ? (
            items.length > 0 ? (
            items.map(item => <Message key={item.id} {...item} />)
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