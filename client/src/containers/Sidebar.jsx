import React, { useState }from "react";
import { connect } from 'react-redux';
import userAPI from '../core/user';
import dialogsAPI from '../core/dialogs';

import Sidebar from '../components/chat/Sidebar/Sidebar';

const SidebarContainer = ({ user }) => {
    const [visible, setVisible ] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [messageText, setMessageText] = useState("");
    const [users, setUsers ] = useState([]);
    const [isLoading, setIsLoading ] = useState(false);
    const [selectedUserId, setSelectedUserId ] = useState(false);

    const handleChangeInput = (value) => {
        setInputValue(value)
    };

    
    const onClose = () => {
        setVisible(false);
    };

    const onShow = () => {
        setVisible(true);
    };

    const onSearch = (value) => {
        setIsLoading(true);
        userAPI
            .findUser(value)
            .then(({data}) => {
            setUsers(data);
            setIsLoading(false);
        }).catch(() => {
            setIsLoading(false);
        });
    };

    const onAddDialog = () => {
        dialogsAPI
        .create(messageText, selectedUserId)
        .then(({data}) => {
            console.log(data);
        setIsLoading(false);
        onClose();
    }).catch(() => {
        setIsLoading(false);
    });
    };

    const onChangeTextArea = e => {
        setMessageText(e.target.value);
    };


    const onSelectUser = userId => {
        console.log(userId);
        setSelectedUserId(userId);
    };

    return ( 
        <Sidebar 
        user={user} 
        inputValue={inputValue}
        visible={visible} 
        isLoading={isLoading}
        onClose={onClose} 
        onShow={onShow} 
        onChangeInput={handleChangeInput}
        onSelectUser={onSelectUser}
        onSearch={onSearch}
        onModalOk={onAddDialog}
        onChangeTextArea={onChangeTextArea}
        messageText={messageText}
        selectedUserId={selectedUserId}
        users={users}
        />
    );
};

export default connect(({ user }) => ({ user: user.data }))(SidebarContainer);
