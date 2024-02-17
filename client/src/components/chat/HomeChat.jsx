import React from 'react';
import { TeamOutlined, FormOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Button  } from 'antd';


import Messages from './Messages/Messages';
// import Dialogs from './Dialogs/Dialogs';
import Status from './Status/Status';
import Dialogs from '../../containers/Dialogs';
import Chatinput from './Chatinput/Chatinput';
import "./HomeChat.scss";



function HomeChat() {
  return (
    <section className="home">

      <div className="chat">
        <div className="chat__sidebar">
          <div className="chat__sidebar-header">
          <div>
            <TeamOutlined />
            <span>Список диалогов</span>
          </div>
          <Button type="ghost" shape="circle" icon={<FormOutlined />} />
          </div>


          <div className="chat__sidebar-dialogs">
          <Dialogs 
      userId={0}
      items={[
        {
          id: "655637529096569cfb927368",
          text: "Ipsum in sint proident exercitation. Voluptate ea in deserunt cillum non eu aute ea et. Est laboris dolor enim quis eu ullamco ipsum.",
          created_at: new Date("Wed Aug 11 1971 07:28:05 GMT+0400"),
          user: {
            id: "655637529096569cfb927368",
            fullname: "Lillian Horton",
            avatar: null
          }
        },
        {
          id: "655637429096566cfb927368",
          text: "Ipsum in sint proident exercitation. Voluptate ea in deserunt cillum non eu aute ea et. Est laboris dolor enim quis eu ullamco ipsum.",
          created_at: new Date("Wed Aug 11 1971 07:28:05 GMT+0400"),
          user: {
            id: "655637429096566cfb927368",
            fullname: "Lillian Horton",
            avatar: null
          }
        },
        {
          id: "655637429096569cf1927368",
          text: "Ipsum in sint proident exercitation. Voluptate ea in deserunt cillum non eu aute ea et. Est laboris dolor enim quis eu ullamco ipsum.",
          created_at: new Date("Wed Aug 11 1971 07:28:05 GMT+0400"),
          user: {
            id: "655637429096569cf1927368",
            fullname: "Lillian Horton",
            avatar: null
          }
        },
        {
          id: "655637429096569cfb927368",
          text: "Ipsum in sint proident exercitation. Voluptate ea in deserunt cillum non eu aute ea et. Est laboris dolor enim quis eu ullamco ipsum.",
          created_at: new Date("Wed Aug 11 1971 07:28:05 GMT+0400"),
          user: {
            id: "655637429096569cfb927368",
            fullname: "Lillian Horton",
            avatar: null
          }
        },
        {
          id: "0a6a8d2fa87fc48aebdba9b2b9892356",
          text: "Aute ipsum pariatur nostrud ea excepteur. Officia mollit Lorem commodo voluptate velit anim voluptate velit aliqua veniam ullamco. Voluptate duis anim exercitation in pariatur.",
          created_at: new Date("Tue Jan 11 1983 19:05:26 GMT+0400"),
          user: {
            id: "0a6a8d2fa87fc48aebdba9b2b9892356",
            fullname: "Ball Holt",
            avatar: null
          }
        },
        {
          id: "5384805262bd61e7226d3bcdc013695c",
          text: "Adipisicing mollit consectetur veniam occaecat tempor voluptate laboris pariatur ullamco. Culpa anim nisi culpa occaecat officia et tempor amet elit ipsum aute officia mollit aliqua. Magna sint duis anim dolor aliquip quis et id non laboris et laboris labore.",
          created_at: new Date("Fri Oct 22 2004 10:04:45 GMT+0500"),
          user: {
            id: "5384805262bd61e7226d3bcdc013695c",
            fullname: "Warner Santos",
            avatar: null
          }
        },
        {
          id: "3965efb5c6d5b0ab4d317471c7d6a2e4",
          text: "Proident nulla officia sunt aliquip aliquip ex sit adipisicing. Eiusmod anim minim sint aliquip aliqua dolore veniam nulla sint mollit quis magna ullamco. Ut id anim fugiat ex esse irure dolore.",
          created_at: new Date("Mon Oct 20 2008 09:05:44 GMT+0500"),
          user: {
            id: "3965efb5c6d5b0ab4d317471c7d6a2e4",
            fullname: "Freda Craft",
            avatar: null
          }
        },
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
              fullname: "Freda Santos",
              avatar: null
            } 
            
        }
      ]}
      />
          </div>
        </div>
          <div className="chat__dialog">
            <div className="chat__dialog-header">
              <div />
              <div className="chat__dialog-header-center">
                <b className="chat__dialog-header-username">Гай Юлий Цезарь</b>
                <div className="chat__dialog-status">
                  <Status online/>
                </div>
              </div>
              <Button type="ghost" shape="circle" icon={<EllipsisOutlined  style={{ fontSize: '22px' }}/>} />
            </div>
            <div className="chat__dialog-message">
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

