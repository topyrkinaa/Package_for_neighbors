import React from "react";
import PropTypes from "prop-types";
import { Empty } from 'antd';

import Message from "../message/Message";

const Messages = ({ items }) => {
    return items && items.length > 0 ? (
    <div>
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
        avatar="https://sun9-65.userapi.com/impg/JOepnh_WDNgsxp0QWm9Wy7rPEdh1bGugcUr1dw/MYj0RwYwJcY.jpg?size=1431x2160&quality=95&sign=0c65fb10c3370b3e5fc8a077a877fc3f&type=album"
        user={{ fullname: "Имя пользователя" }}
        text="Привет! Как день?"
        date="Fri Nov 6 2023 17:10:09"
        isMe
        isReaded
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
        avatar="https://sun9-65.userapi.com/impg/JOepnh_WDNgsxp0QWm9Wy7rPEdh1bGugcUr1dw/MYj0RwYwJcY.jpg?size=1431x2160&quality=95&sign=0c65fb10c3370b3e5fc8a077a877fc3f&type=album"
        user={{ fullname: "Имя пользователя" }}
        text="Привет! Как день?"
        date="Fri Nov 6 2023 17:10:09"
        isMe
        isReaded
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
        avatar="https://sun9-65.userapi.com/impg/JOepnh_WDNgsxp0QWm9Wy7rPEdh1bGugcUr1dw/MYj0RwYwJcY.jpg?size=1431x2160&quality=95&sign=0c65fb10c3370b3e5fc8a077a877fc3f&type=album"
        user={{ fullname: "Имя пользователя" }}
        text="Привет! Как день?"
        date="Fri Nov 6 2023 17:10:09"
        isMe
        isReaded
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
        avatar="https://sun9-65.userapi.com/impg/JOepnh_WDNgsxp0QWm9Wy7rPEdh1bGugcUr1dw/MYj0RwYwJcY.jpg?size=1431x2160&quality=95&sign=0c65fb10c3370b3e5fc8a077a877fc3f&type=album"
        user={{ fullname: "Имя пользователя" }}
        text="Привет! Как день?"
        date="Fri Nov 6 2023 17:10:09"
        isMe
        isReaded
      />
      <Message
        avatar="https://sun7-18.userapi.com/impg/AGGtfJewPxXacmAK9mdKZj_VQfSnxInj4LfS3w/UEmsPHjunok.jpg?size=1439x2160&quality=95&sign=55b85541fb3e59766f7f90ea6f44c03f&type=album"
        user={{ fullname: "Имя пользователя" }}
        date="Fri Nov 6 2023 17:10:09"

        audio="https://samplelib.com/lib/preview/mp3/sample-3s.mp3"
      />
    </div>) : 
    (<Empty description="Нет сообщений" />)
};


Messages.defaultProps = {
    items: [],
};

  Messages.propTypes = {
    items: PropTypes.array,
};

export default Messages;