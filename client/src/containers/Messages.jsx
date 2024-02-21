import React, { useEffect, useRef } from "react";
import { connect } from 'react-redux';
import PropTypes from "prop-types";

import messagesActions from '../reducers/actions/messages' 
import BaseMessages from '../components/chat/Messages/Messages';

const Dialogs = ({ currentDialogId, fetchMessages, items, isLoading }) => {
    const messagesRef = useRef(null);

    useEffect(() => {
        if (currentDialogId) {
            fetchMessages(currentDialogId);
        }
    }, [currentDialogId]);

    useEffect(() => {
        messagesRef.current.scrollTo(0, 999999);
    }, [items]);

    return (
        <BaseMessages blockRef={messagesRef} items={items} isLoading={isLoading} />
    );
};


export default connect(
    ({ dialogs, messages }) => ({
        currentDialogId: dialogs.currentDialogId,
        items: messages.items,
        isLoading: messages.isLoading
    }), 
    messagesActions
)(Dialogs);
