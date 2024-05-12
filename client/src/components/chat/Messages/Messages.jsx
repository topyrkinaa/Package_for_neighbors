import React from "react";
import PropTypes from "prop-types";
import { Empty, Spin, Modal } from 'antd';
import classNames from "classnames";

import Message from "../message/Message";
import './Messages.scss';

const Messages = ({ 
    onRemoveMessage, 
    blockRef, isLoading, 
    items, 
    user, 
    setPreviewImage, 
    previewImage, 
    blockHeigth,
    isTyping 
}) => {

    return (
    <div className="chat__dialog-messages" 
        style={{ 'height': `calc(100% - ${blockHeigth}px)` }}
    >
        <div  
            ref={blockRef}
            className={classNames('messages', {'messages--loading': isLoading})}> 
            { isLoading && !user ? (
                <Spin size="large" tip="Загрузка сообщений..." /> 
                ) : items && !isLoading ? (
                items.length > 0 ? (
                items.map(item => 
                    <Message 
                    {...item} 
                isMe={user && user.id === item.user.id} 
                onRemoveMessage={onRemoveMessage.bind(this, item.id)}
                setPreviewImage={setPreviewImage}
                key={item.id} 
                />)
            ) : ( 
            <Empty description="Диалог пуст" /> 
            )
            ) : (
            <Empty description="Начните диалог" />   
        )}
       {isTyping && (<Message isTyping={true} user={{ username: 'Amm', id: 56}}/>)}

        <Modal
            open={!!previewImage} 
            onCancel={() => setPreviewImage(null)} 
            footer={null}
            >
                <img src={previewImage} style={{ width:'100%'}} alt="Preview" />
        </Modal>
    </div>
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