import React from 'react';

import { useNavigate } from 'react-router-dom';

import format from 'date-fns/format';
import isToday from 'date-fns/isToday';
import { Button, Modal } from 'antd';
import { MessageOutlined, EyeOutlined } from '@ant-design/icons';

import "./NewsFeed.scss";


import Avatar from '../../chat/Avatar/Avatar';

/* eslint-disable */


const NewsFeed =  ({ user, setPreviewImage, previewImage }) => {
  const navigate = useNavigate();

const handleNavigateChat = () => {
  navigate("/chat");
};

const getMessageTime = created_at => {
  // Преобразуем строку в объект даты
  const dateObject = new Date(created_at);

  // Проверяем, сегодня ли дата создания сообщения
  return isToday(dateObject)
      ? format(dateObject, 'HH:mm')
      : format(dateObject, 'dd.MM.yyyy');
};

  return (
          <div className='newsfeed-container'>
            
            <div className="newsfeed-item">
              <div className='newsfeed-item-avatar'>
                <Avatar user={user} />
              </div>
            
              <div className="newsfeed-item-info">
                <div className="newsfeed-item-info-top">
                  <b>{user.username} {user.surname}</b>
                  <span>
                    {getMessageTime(user.last_seen)}
                  </span>
                </div>
                
                <div className="newsfeed-item-bottom">
                  <p>Уважаемые жильцы!
                    <br/><br/>Сообщаем вам, что в связи с плановыми ремонтными работами 15 мая с 9:00 до 17:00 в нашем доме будет отключено водоснабжение. Просим вас заранее запастись необходимым количеством воды и приносим извинения за временные неудобства.
                    <br/><br/>С уважением, ТСЖ.
                  </p>
                    <div class="newsfeed-item-bottom__attachments">
                      <div onClick={() => 
                        setPreviewImage('https://mir-s3-cdn-cf.behance.net/project_modules/1400/abc2d3158719643.6390b32b8394d.jpg')}
                        className="newsfeed-item-bottom__attachments-item">
                        <div className='newsfeed-item-bottom__attachments-item-overlay' >
                         <EyeOutlined style={{ color : 'white', fontSize: 18 }} />
                        </div> 
                      <img src={'https://mir-s3-cdn-cf.behance.net/project_modules/1400/abc2d3158719643.6390b32b8394d.jpg'} alt={'Название'} />
                    </div>

                    <Modal
                      open={!!previewImage} 
                      onCancel={() => setPreviewImage(null)} 
                      footer={null}
                    >
                      <img src={previewImage} style={{ width:'100%'}} alt="Preview" />
                    </Modal>
                  </div >

                  <div class="newsfeed-item-bottom__button">
                    <Button 
                      type="primary" 
                      icon={<MessageOutlined />}
                      size='large'
                      onClick={handleNavigateChat}>
                        Перейти к обсуждению
                    </Button>
                  </div>
                </div>
              </div>
            </div>


            <div className="newsfeed-item">
              <div className='newsfeed-item-avatar'>
                <Avatar user={user} />
              </div>
            
              <div className="newsfeed-item-info">
                <div className="newsfeed-item-info-top">
                  <b>{user.username} {user.surname}</b>
                  <span>
                    {getMessageTime(user.last_seen)}
                  </span>
                </div>
                
                <div className="newsfeed-item-bottom">
                  <p>Уважаемые жильцы!
                    <br/><br/>Сообщаем вам, что в связи с плановыми ремонтными работами 15 мая с 9:00 до 17:00 в нашем доме будет отключено водоснабжение. Просим вас заранее запастись необходимым количеством воды и приносим извинения за временные неудобства.
                    <br/><br/>С уважением, ТСЖ.
                  </p>
                    <div class="newsfeed-item-bottom__attachments">
                      <div onClick={() => 
                        setPreviewImage('https://mir-s3-cdn-cf.behance.net/project_modules/1400/abc2d3158719643.6390b32b8394d.jpg')}
                        className="newsfeed-item-bottom__attachments-item">
                        <div className='newsfeed-item-bottom__attachments-item-overlay' >
                         <EyeOutlined style={{ color : 'white', fontSize: 18 }} />
                        </div> 
                      <img src={'https://mir-s3-cdn-cf.behance.net/project_modules/1400/abc2d3158719643.6390b32b8394d.jpg'} alt={'Название'} />
                    </div>

                    <Modal
                      open={!!previewImage} 
                      onCancel={() => setPreviewImage(null)} 
                      footer={null}
                    >
                      <img src={previewImage} style={{ width:'100%'}} alt="Preview" />
                    </Modal>
                  </div >

                  <div class="newsfeed-item-bottom__button">
                    <Button 
                      type="primary" 
                      icon={<MessageOutlined />}
                      size='large'
                      onClick={handleNavigateChat}>
                        Перейти к обсуждению
                    </Button>
                  </div>
                </div>
              </div>
            </div>



          </div>
  );
}

export default NewsFeed;
