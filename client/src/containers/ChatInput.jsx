
import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';

import messagesActions from '../reducers/actions/messages';
import attachmentsActions from '../reducers/actions/attachments';
import filesAPI from '../core/files';
import BaseChatInput from '../components/chat/Chatinput/Chatinput';
import { CodeSandboxCircleFilled } from '@ant-design/icons';
import { set } from 'date-fns';

import socket from '../core/socket';


const ChatInput = (props) => {
    const { 
        dialogs: { currentDialogId }, 
        attachments,
        fetchSendMessage,
        setAttachments, 
        removeAttachments,
        user
    } = props;

    if (!currentDialogId) {
        return null;
    }


    window.navigator.getUserMedia = (window.navigator.getUserMedia ||
        window.navigator.mozGetUserMedia ||
        window.navigator.msGetUserMedia ||
        window.navigator.webkitGetUserMedia);


    const [value, setValue] = useState("");
    const [isRecording, setIsRecording] = useState(false);
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [emojiPickerVisible, setShowEmojiPicker] = useState(false);
    const [isLoading, setLoading] = useState(false);

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

        recorder.ondataavailable = e => {
            //const audioURL = window.URL.createObjectURL(e.data);
            //new Audio(audioURL).play();
            const file = new File([e.data], "audio.webm");
            setLoading(true);
            filesAPI.upload(file).then(({ data }) => {
                sendAudio(data.id).then(() => {
                    setLoading(false);
                });
            });
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


    const onHideRecording = () => {
        setIsRecording(false);
    };

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
        setAttachments(uploaded);
    };


    const sendAudio = audioId => {
        return fetchSendMessage({
            text: null,
            dialogid: currentDialogId,
            attachments: [audioId]
        });
    };

    const sendMessage = () => {
        if (isRecording) {
            mediaRecorder.stop();
        } else if (value) {
            fetchSendMessage({
                text: value,
                dialogid: currentDialogId,
                attachments: attachments.map(file => file.uid)});
            setValue("");
            setAttachments([]);
        }
    };

    const addEmoji = ({ id }) => {
        setValue((value + ' ' + ':' + id + ':').trim());
    };

    const handleSendMessage = e => {
        socket.emit('DIALOGS:TYPING',{dialogId: currentDialogId, user });
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
    onHideRecording = {onHideRecording}
    isLoading = {isLoading}
    removeAttachments = {removeAttachments}
    />
}

export default connect(
    ({ dialogs, attachments, user }) => ({dialogs, attachments: attachments.items, user: user.data}),
    {...messagesActions, ...attachmentsActions} 
)(ChatInput);