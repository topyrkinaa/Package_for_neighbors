import React, {Fragment} from "react";
import PropTypes from "prop-types";
import { SmileOutlined,CameraOutlined, AudioOutlined, SendOutlined, CloseCircleOutlined, LoadingOutlined } from '@ant-design/icons';
import { Input, Button } from 'antd';
import Upload from 'rc-upload';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';


import './Chatinput.scss';
import UploadFiles from '../UploadFiles/UploadFiles';


const { TextArea } = Input;
const Chatinput = props => {
    const { 
        emojiPickerVisible, 
        toggleEmojiPicker,
        setValue, 
        value,
        addEmoji,
        handleSendMessage,
        sendMessage,
        attachments,
        onSelectFiles,
        isRecording,
        onRecord,
        onHideRecording,
        isLoading,
        removeAttachments
    } = props;

    return (
        <Fragment>
            <div className="chat-input">
        <div>
        <div className="chat-input__smile-btn">
        <div className="chat-input__emoji-picker"> {emojiPickerVisible && (
                <Picker 
                    data ={data}
                    set="native"
                    onEmojiSelect = {(emojiTag) => addEmoji(emojiTag)}
                    
                />
            )}
        </div>
            <Button onClick={toggleEmojiPicker} type="ghost" shape="circle" icon={<SmileOutlined />} />
        </div>
                {
                    isRecording ? (
                    <div className="chat-input__record-status">
                        <i className="chat-input__record-status-bubble"></i>
                        Запись...
                        <Button 
                            onClick={onHideRecording} 
                            type="ghost" 
                            shape="circle" 
                            icon={<CloseCircleOutlined />} 
                            className="stop-recording"
                            />
                    </div>
                ) : (
                    <TextArea 

                        onChange={e => setValue(e.target.value) } 
                        onKeyUp={handleSendMessage}
                        size="large" 
                        placeholder='Введите текст сообщения...'
                        value={value}
                        autoSize={{minRows: 1, maxRows: 6}}/>

                )}
            
           
                <div className="chat-input__actions">
                    <Upload 
                    data={onSelectFiles}
                    name='chat-input__actions-uplpad-btn' 
                    accept='.jpg, .jpeg, .png, .gif, .bmp' multiple={true}>
                        <Button 
                            type="ghost" 
                            shape="circle" 
                            icon={<CameraOutlined />}
                        />
                    </Upload>
                    {  isLoading ? <Button 
                            type="ghost" 
                            shape="circle" 
                            icon={<LoadingOutlined />} 
                        /> : (isRecording || value || attachments.length) ? (
                        <Button 
                            type="ghost" 
                            shape="circle" 
                            icon={<SendOutlined />} 
                            onClick={sendMessage} 
                        />
                    ) : ( 
                        <div className="chat-input__record-btn">
                            <Button 
                                onClick={onRecord} 
                                type="ghost" 
                                shape="circle" 
                                icon={<AudioOutlined />} 
                                />
                        </div> 
                    )}
                </div>
        </div>
                { attachments.length > 0 && (
                <div className="chat-input__attachments">
              <UploadFiles removeAttachments={removeAttachments} attachments={attachments} />
            </div>)}
            </div>
           
        </Fragment>

)};

Chatinput.defaultProps = {
  
  };

Chatinput.propTypes = {

};

export default Chatinput;