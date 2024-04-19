import React,{useEffect, useState} from "react";
import PropTypes from "prop-types";
import { SmileOutlined,CameraOutlined, AudioOutlined, SendOutlined } from '@ant-design/icons';
import Upload from 'rc-upload';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';


import './Chatinput.scss';
import { Input, Button } from 'antd';

const { TextArea } = Input;
 
const Chatinput = props => {
    const [value, setValue] = useState("");
    const [emojiPickerVisible, setShowEmojiPicker] = useState(false);
    const { onSendMessage, currentDialogId } = props;

    const toggleEmojiPicker = () => {
        setShowEmojiPicker(!emojiPickerVisible);
    };

    const handleSendMessage = (e) => {
        if (e.keyCode === 13) {
            onSendMessage(value, currentDialogId);
            setValue("");
        }
    }

    const handleSendMessageClick = () => {
        onSendMessage(value, currentDialogId);
        setValue("");
    }


    const handleOutsideClick = (el, e) => {
        if (el && !el.contains(e.target)) {
            setShowEmojiPicker(false);
        }
    }

    useEffect(() => {
        const el = document.querySelector('.chat-input__smile-btn');
       
        document.addEventListener("click", handleOutsideClick.bind(this, el));

        return () => {
            document.removeEventListener("click",  handleOutsideClick.bind(this, el));
        };
    }, [])


    const addEmoji = ({ id }) => {
        setValue((value + ' ' + ':' + id + ':').trim());
    } 

    return (
        <div className="chat-input">
        <div className="chat-input__smile-btn">
        <div className="chat-input__emoji-picker"> {emojiPickerVisible && (
                <Picker 
                    data ={data}
                    set="apple"
                    onEmojiSelect = {(emojiTag) => addEmoji(emojiTag)}
                    
                />
            )}
        </div>
            <Button onClick={toggleEmojiPicker} type="ghost" shape="circle" icon={<SmileOutlined />} />
        </div>
        <TextArea 
            onChange={e => setValue(e.target.value)} 
            onKeyUp={handleSendMessage}
            size="large" 
            placeholder='Введите текст сообщения...'
            value={value}
            autoSize={{minRows: 1, maxRows: 6}}/>
           
        <div className="chat-input__actions">
            <Upload name='chat-input__actions-uplpad-btn' accept='.jpg,.jpeg,,.png,.gif,.bmp' multiple={true}>
                <Button type="ghost" shape="circle" icon={<CameraOutlined />}  />
            </Upload>
            {value ? 
            <Button type="ghost" shape="circle" icon={<SendOutlined />} onClick={handleSendMessageClick} />
            :  <Button type="ghost" shape="circle" icon={<AudioOutlined />} /> 
            }
            
        </div>
    </div>

)};

Chatinput.defaultProps = {
  
  };

Chatinput.propTypes = {

};

export default Chatinput;