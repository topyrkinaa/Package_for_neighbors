import React,{useState} from "react";
import PropTypes from "prop-types";
import { SmileOutlined,CameraOutlined, AudioOutlined, SendOutlined } from '@ant-design/icons';

import './Chatinput.scss';
import { Input, Button } from 'antd';

const Chatinput = props => {
    const [value, setValue] = useState("");
    return (
        <div className="chat-input">
        <div className="chat-input__smile-btn">
             <Button type="ghost" shape="circle" icon={<SmileOutlined />} />
        </div>
        <Input 
            onChange={e => setValue(e.target.value)} 
            size="large" 
            placeholder='Введите текст сообщения...'/>
        <div className="chat-input__actions">
            <Button type="ghost" shape="circle" icon={<CameraOutlined />} />
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