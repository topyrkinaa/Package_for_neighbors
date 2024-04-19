import React, { useEffect, useRef } from "react";
import { connect } from 'react-redux';
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
    user
 }) => {
    const messagesRef = useRef(null);

    const onNewMessage = data => {
        addMessage(data);
    };

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
        onRemoveMessage={removeMessageById}/>
    );
};


export default connect(
    ({ dialogs, messages, user }) => ({
        currentDialogId: dialogs.currentDialogId,
        items: messages.items,
        isLoading: messages.isLoading,
        user: user.data
    }), 
    messagesActions
)(Dialogs);
