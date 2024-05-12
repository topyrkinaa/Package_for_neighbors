import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import PropTypes from "prop-types";

import dialogsActions from '../reducers/actions/dialogs' 
import BaseDialogs from '../components/chat/Dialogs/Dialogs';
import socket from '../core/socket';


/* Функция для преобразования строковых дат в объекты Date
const parseDates = (data) => {
  return JSON.parse(data, (key, value) => {
    if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/.test(value)) {
      return new Date(value);
    }
    return value;
  });
};
*/


const Dialogs = ({ 
    fetchDialogs, 
    currentDialogId, 
    items, 
    userId 
}) => {
    const [inputValue, setValue] = useState("");  
    const [filtered, setFilteredItems] = useState(Array.from(items)); 

    const onChangeInput = (value = "") => {
        setFilteredItems(items.filter(
            dialog => 
            dialog.author.username.toLowerCase().indexOf(value.toLowerCase()) >= 
            0 ||
            dialog.partner.username.toLowerCase().indexOf(value.toLowerCase()) >= 
            0
        ));
        setValue(value);
    };


    useEffect(() => {
        if (items.length) {
            onChangeInput('');
        }
    }, [items])

    useEffect(() => {
        fetchDialogs();
        socket.on('SERVER:DIALOG_CREATED', fetchDialogs);
        socket.on('SERVER:NEW_MESSAGE', fetchDialogs);
        return () => {
            socket.removeListener('SERVER:DIALOG_CREATED', fetchDialogs);
            socket.removeListener('SERVER:NEW_MESSAGE', fetchDialogs);
    }
    }, []);


    return (
        <BaseDialogs 
            userId={userId}
            items={filtered} 
            onSearch={onChangeInput} 
            inputValue={inputValue} 
            currentDialogId={currentDialogId}
        />
    );
};

Dialogs.propTypes = {
    items: PropTypes.array.isRequired,
    userId: PropTypes.any,
    inputValue: PropTypes.any,
    сurrentDialogId: PropTypes.any
    
};

Dialogs.defaultProps = {
    inputValue: "",  // Значение по умолчанию для inputValue
};

export default connect(({ dialogs }) => dialogs, dialogsActions)(Dialogs);
