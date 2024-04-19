import React from 'react';
import { EllipsisOutlined } from '@ant-design/icons';
import { Button  } from 'antd';


// import Messages from './Messages/Messages';
// import Dialogs from './Dialogs/Dialogs';
import Sidebar from '../../containers/Sidebar';
import Status from '../../containers/Status';
import Messages from '../../containers/Messages';
import Chatinput from '../../containers/ChatInput';
import "./HomeChat.scss";


function HomeChat() {
  return (
    <section className="home">
      
      <div className="chat">
        <Sidebar />
          <div className="chat__dialog">
            <div className="chat__dialog-header">
              
              <Status online/>
              
              <div />
            </div>
            <div className="chat__dialog-messages">
              <Messages />
            </div>

            <div className="chat__dialog-input">
            <Chatinput />
            </div>
        </div>
      </div>
    </section> 
      
  );
}

export default HomeChat;
