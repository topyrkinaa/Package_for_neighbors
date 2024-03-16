import React,{useState} from "react";
import PropTypes from "prop-types";
import { SmileOutlined,CameraOutlined, AudioOutlined, SendOutlined } from '@ant-design/icons';
import Upload from 'rc-upload';
import data from '@emoji-mart/data';
import { Picker } from 'emoji-mart';

import './Chatinput.scss';
import { Input, Button } from 'antd';

const Chatinput = props => {
    const [value, setValue] = useState("");
    const [emojiPickerVisible, setShowEmojiPicker] = useState("");

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

    return (
        <div className="chat-input">
        <div className="chat-input__smile-btn">
            {emojiPickerVisible && (
                <div className="chat-input__emoji-picker">
                     <em-emoji-picker set="apple" previewPosition="none"/>
                </div>
            )}
            <Button onClick={toggleEmojiPicker} type="ghost" shape="circle" icon={<SmileOutlined />} />
        </div>
        <Input 
            onChange={e => setValue(e.target.value)} 
            onKeyUp={handleSendMessage}
            size="large" 
            placeholder='Введите текст сообщения...'
            value={value}/>
           
        <div className="chat-input__actions">
            <Upload name='chat-input__actions-uplpad-btn' accept='.jpg,.jpeg,,.png,.gif,.bmp' multiple={true}>
                <Button type="ghost" shape="circle" icon={<CameraOutlined />}  />
            </Upload>
            {value ? 
            <Button type="ghost" shape="circle" icon={<SendOutlined />} />
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