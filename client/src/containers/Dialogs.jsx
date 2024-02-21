import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import axios from 'axios';
import dialogsActions from '../reducers/actions/dialogs' 
import BaseDialogs from '../components/chat/Dialogs/Dialogs';


axios.defaults.baseURL = 'http://localhost:9999';

// Функция для преобразования строковых дат в объекты Date
const parseDates = (data) => {
  return JSON.parse(data, (key, value) => {
    if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/.test(value)) {
      return new Date(value);
    }
    return value;
  });
};


const Dialogs = ({ fetchDialogs, setCurrentDialogId, items, userId }) => {
    const [inputValue, setValue] = useState("");  
    const [filtered, setFilteredItems] = useState(Array.from(items)); 

    const onChangeInput = value => {
        setFilteredItems(items.filter(
            dialog => 
            dialog.user.fullname.toLowerCase().indexOf(value.toLowerCase()) >= 0
        ));
        setValue(value);
    };

    useEffect(() => {
        if (!items.length) {
            fetchDialogs();
        } else {
             // Преобразуйте строки в даты перед установкой в состояние
             setFilteredItems(parseDates(JSON.stringify(items)));
        }
    }, [items]);

    return (
        <BaseDialogs 
            userId={userId}
            items={filtered} 
            onSearch={onChangeInput} 
            inputValue={inputValue} 
            onSelectDialog={setCurrentDialogId}
        />
    );
};

Dialogs.propTypes = {
    items: PropTypes.array.isRequired,
    userId: PropTypes.any.isRequired,
    inputValue: PropTypes.any,
    
};

Dialogs.defaultProps = {
    inputValue: "",  // Значение по умолчанию для inputValue
};

export default connect(({ dialogs }) => dialogs, dialogsActions)(Dialogs);
