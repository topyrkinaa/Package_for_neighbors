import React, { useEffect, useState, useRef } from "react";
import { connect } from 'react-redux';
import { Empty } from 'antd';
import PropTypes from "prop-types";

import messagesActions from '../reducers/actions/messages';
import BaseMessages from '../components/chat/Messages/Messages';
import socket from '../core/socket';

const Dialogs = ({ 
    currentDialogId, 
    fetchMessages, 
    addMessage, 
    items, 
    isLoading,
    removeMessageById,
    user,
    attachments
 }) => {
    if (!currentDialogId) {
        return <Empty description="Начните диалог" />;
    }

    const [previewImage, setPreviewImage ] = useState(null);
    const [blockHeigth, setBlockHeigth ] = useState(140);
    const [isTyping, setIsTyping ] = useState(false);
    const typingTimeoutId = null;

    const messagesRef = useRef(null);

    const onNewMessage = data => {
        addMessage(data);
    };

    const toggleIsTyping = () => {
        setIsTyping(true);
        clearInterval(typingTimeoutId);
        typingTimeoutId = setTimeout(() => {
            setIsTyping(false);
        }, 3000);
    };

    useEffect(() => {
        socket.on('DIALOGS:TYPING', toggleIsTyping)
        
    },[]);

    useEffect(() => {
        if (attachments.length) {
            setBlockHeigth(245);
        } else {
            setBlockHeigth(140);
        }
    }, [attachments]);

    useEffect(() => {
        if (currentDialogId) {
            fetchMessages(currentDialogId);
        }

        socket.on('SERVER:NEW_MESSAGE', onNewMessage);

        return () => socket.removeListener('SERVER:NEW_MESSAGE', onNewMessage);
    }, [currentDialogId]);

    useEffect(() => {
        messagesRef.current.scrollTo(0, 999999);
    }, [items]);

    return (
        <BaseMessages 
        user={user} 
        blockRef={messagesRef} 
        items={items} 
        isLoading={isLoading && !user} 
        onRemoveMessage={removeMessageById}
        setPreviewImage={setPreviewImage}
        previewImage={previewImage}
        blockHeigth={blockHeigth}
        isTyping={isTyping}/>
    );
};


export default connect(
    ({ dialogs, messages, user, attachments }) => ({
        currentDialogId: dialogs.currentDialogId,
        items: messages.items,
        isLoading: messages.isLoading,
        attachments: attachments.items,
        user: user.data
    }), 
    messagesActions
)(Dialogs);
