import React from 'react';

import DialogItem from './DialogItem/DialogItem';
import Message from './message/Message';

function HomeChat() {
  return (
    <section className="home">
      <DialogItem user={{
        fullname: 'Федор Достоевский',
        isOnline: false
      }} 
      unreaded={0}
      />

<DialogItem user={{
        fullname: 'Федор Достоевский',
        isOnline: true
      }} 
      unreaded={10}
      />

<DialogItem user={{
        fullname: 'Федор Достоевский',
        isOnline: false
      }} 
      unreaded={2}
      />


     {/* <Dialogs item={[
        {
          user: {
            fullname: "Федор Достоевский",
            avatar: null
          },
          message: {
            text: "Мы все свидетельствуем Вам глубочайшее наше почтение ии целуем Вам ручки, дражайший папенька: Михайла, Федор, Варвара и Андрюша",
            isReaded: false,
            created_at: new Date() 
          }
        }
      ]}/> */}
       
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
    </section>
      
  );
}

export default HomeChat;
