
import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';

import messagesActions from '../reducers/actions/messages';
import filesAPI from '../core/files';
import BaseChatInput from '../components/chat/Chatinput/Chatinput';
import { CodeSandboxCircleFilled } from '@ant-design/icons';
import { set } from 'date-fns';


const ChatInput = ({ fetchSendMessage, currentDialogId }) => {

    if (!currentDialogId) {
        return null;
    }


    window.navigator.getUserMedia = (window.navigator.getUserMedia ||
        window.navigator.mozGetUserMedia ||
        window.navigator.msGetUserMedia ||
        window.navigator.webkitGetUserMedia);


    const [value, setValue] = useState("");
    const [isRecording, setIsRecording] = useState(false);
    const [attachments, setAttachments] = useState([]);
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [emojiPickerVisible, setShowEmojiPicker] = useState(false);

    const toggleEmojiPicker = () => {
        setShowEmojiPicker(!emojiPickerVisible);
    };

    const onRecord = () => {
        if (navigator.getUserMedia) {
            navigator.getUserMedia({  audio : true }, onRecording, onError);
        }
    }

    const onRecording = (stream) => {
        const recorder = new MediaRecorder(stream);
        setMediaRecorder(recorder);
        recorder.start();

        recorder.onstart = () => {
            setIsRecording(true);
        }

        recorder.onstop = () => {
            setIsRecording(false);
        }

        recorder.ondataavailable = function(e) {
            const audioURL = window.URL.createObjectURL(e.data);
            new Audio(audioURL).play();
        }
    }

    const onError = (err) => {
        console.log('The following error occured: ' + err);
    }

    const handleOutsideClick = (el, e) => {
        if (el && !el.contains(e.target)) {
            setShowEmojiPicker(false);
        }
    }



    const onStopRecording = () => {
        mediaRecorder.stop();
    }

    const onSelectFiles = async file => {
        let uploaded = []
            uploaded = [
            ...uploaded,
            {
                file,
                name: file.name,
                status: "uploading"
            }
        ];
        setAttachments(uploaded);
        await filesAPI.upload(file).then(({ data }) => {
                    return uploaded =[{
                        status: 'done',
                        uid: data.id,
                        name: data.filename,
                        url: data.url
                    }];
        });
        console.log(uploaded)
        setAttachments(uploaded);
    };

    const sendMessage = () => {
        fetchSendMessage(value, currentDialogId, attachments.map(file => file.uid));
        setValue("");
        setAttachments([]);
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
    isRecording = {isRecording}
    onRecord = {onRecord}
    onStopRecording = {onStopRecording}
    />
}

export default connect(
    ({ dialogs }) => dialogs,
    messagesActions 
)(ChatInput);