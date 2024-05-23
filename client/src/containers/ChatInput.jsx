
import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';

import messagesActions from '../reducers/actions/messages';
import filesAPI from '../core/files';
import BaseChatInput from '../components/chat/Chatinput/Chatinput';
import { CodeSandboxCircleFilled } from '@ant-design/icons';


const ChatInput = ({ fetchSendMessage, currentDialogId }) => {

    if (!currentDialogId) {
        return null;
    }

    const [value, setValue] = useState("");
    const [attachments, setAttachments] = useState([0]);
    const [emojiPickerVisible, setShowEmojiPicker] = useState(false);

    const toggleEmojiPicker = () => {
        setShowEmojiPicker(!emojiPickerVisible);
    };

    const handleOutsideClick = (el, e) => {
        if (el && !el.contains(e.target)) {
            setShowEmojiPicker(false);
        }
    }


    const onUpload = (file, uid) => {
        filesAPI.upload(file).then(({ data }) => {
            setAttachments(
                attachments.map(item => {
                if (item.uid === uid) {
                    item = {
                        uid: data.file.id,
                        name: data.file.filename,
                        status: 'done',
                        url: data.file.url
                    };
                }
                return item;
            }));
        });
    }


    const onSelectFiles = file => {
        let uploaded = []
        console.log(file)
        const uid =  Math.round(Math.random() * 1000);
        uploaded.push({
            uid,
            file,
            name: file.name,
            status: "uploading"
          });
        setAttachments(uploaded);
        uploaded.forEach( item => {
            onUpload(item.file, item.uid);
        });
    }

    const sendMessage = () => {
        fetchSendMessage(value, currentDialogId);
        setValue("");
    }

    const addEmoji = ({ id }) => {
        setValue((value + ' ' + ':' + id + ':').trim());
    } 

    const handleSendMessage = (e) => {
        if (e.keyCode === 13) {
            sendMessage();
        }
    }

    useEffect(() => {
        const el = document.querySelector('.chat-input__smile-btn');
       
        document.addEventListener("click", handleOutsideClick.bind(this, el));

        return () => {
            document.removeEventListener("click",  handleOutsideClick.bind(this, el));
        };
    }, [])

    return <BaseChatInput 
    value = {value}
    setValue = {setValue}
    emojiPickerVisible = {emojiPickerVisible}
    toggleEmojiPicker= {toggleEmojiPicker}
    handleSendMessage = {handleSendMessage}
    addEmoji = {addEmoji}
    sendMessage ={sendMessage} 
    attachments = {attachments}
    onSelectFiles = {onSelectFiles}
    />
}

export default connect(
    ({ dialogs }) => dialogs,
    messagesActions 
)(ChatInput);