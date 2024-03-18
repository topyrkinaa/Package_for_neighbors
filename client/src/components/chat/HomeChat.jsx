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
              <div />
              <Status online/>
              
              <Button type="ghost" shape="circle" icon={<EllipsisOutlined  style={{ fontSize: '22px' }}/>} />
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

 /*
      <Dialogs 
      userId={0}
      items={[
        {
          id: Math.random(),
            text: "1234123",
            isReaded: false,
            created_at: new Date(),
            user: {
              id: 1,
              fullname: "Алина Топыркина",
              avatar: "https://sun9-86.userapi.com/sun9-37/impf/c852036/v852036795/49158/648a_o75mpo.jpg?size=320x347&quality=96&sign=fba48aefb60fae3db01573df941a72e9&c_uniq_tag=JwrVKtIzIKJ2Tf9A7Y471jKSAfL9PS4Bh3kb6n5KioU&type=album"
            }
        },
        {
          id: Math.random(),
            text: "Привет! Как день?",
            isReaded: false,
            created_at: new Date(),
            unreaded: 3,
            user: {
              id: '2cfc02eb198d70be19d1bb18563cb6b1',
              fullname: "Татьяна Топыркина",
              avatar: null
            } 
            
        }
      ]}
      />

        <Message
        avatar="https://sun7-18.userapi.com/impg/AGGtfJewPxXacmAK9mdKZj_VQfSnxInj4LfS3w/UEmsPHjunok.jpg?size=1439x2160&quality=95&sign=55b85541fb3e59766f7f90ea6f44c03f&type=album"
        user={{ fullname: "Имя пользователя" }}
        text="Привет!"
        date="Fri Nov 6 2023 16:04:09"
        attachments={[
          {
            filename: 'image.jpg',
            url: 'https://source.unsplash.com/100x100/?random=1&nature,water',
          },
          {
            filename: 'image.jpg',
            url: 'https://source.unsplash.com/100x100/?random=2&nature,water',
          },
          {
            filename: 'image.jpg',
            url: 'https://source.unsplash.com/100x100/?random=3&nature,water',
          }
        ]}
      />

      <Message
        avatar="https://sun9-65.userapi.com/impg/JOepnh_WDNgsxp0QWm9Wy7rPEdh1bGugcUr1dw/MYj0RwYwJcY.jpg?size=1431x2160&quality=95&sign=0c65fb10c3370b3e5fc8a077a877fc3f&type=album"
        user={{ fullname: "Имя пользователя" }}
        text="Привет! Как день?"
        date="Fri Nov 6 2023 17:10:09"
        isMe
        isReaded
      />

      <Message
        avatar="https://sun7-18.userapi.com/impg/AGGtfJewPxXacmAK9mdKZj_VQfSnxInj4LfS3w/UEmsPHjunok.jpg?size=1439x2160&quality=95&sign=55b85541fb3e59766f7f90ea6f44c03f&type=album"
        isTyping
      />

      <Message
        avatar="https://sun7-18.userapi.com/impg/AGGtfJewPxXacmAK9mdKZj_VQfSnxInj4LfS3w/UEmsPHjunok.jpg?size=1439x2160&quality=95&sign=55b85541fb3e59766f7f90ea6f44c03f&type=album"
        attachments={[
          {
            filename: 'image.jpg',
            url: 'https://source.unsplash.com/100x100/?random=4&nature,water',
          }
        ]}
      /> 

<Message
        avatar="https://sun9-65.userapi.com/impg/JOepnh_WDNgsxp0QWm9Wy7rPEdh1bGugcUr1dw/MYj0RwYwJcY.jpg?size=1431x2160&quality=95&sign=0c65fb10c3370b3e5fc8a077a877fc3f&type=album"
        user={{ fullname: "Имя пользователя" }}
        date="Fri Nov 6 2023 17:10:09"
        
        audio="https://samplelib.com/lib/preview/mp3/sample-3s.mp3"
      /> */ 

