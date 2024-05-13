import React, { useEffect, useRef, useState}from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';
import format from 'date-fns/format';
import isToday from 'date-fns/isToday';
import { Popover, Button } from 'antd';
import { EllipsisOutlined, EyeOutlined } from '@ant-design/icons';
import reactStringReplace from 'react-string-replace';

import { convertCurrentTime, isAudio } from '../../../utils/helpers';

import waveSvg from "../../../assets/img/wave.svg";
import pauseSvg from "../../../assets/img/pause.svg";
import playSvg from "../../../assets/img/play.svg";

import "./Message.scss";
import IconReaded from '../IconReaded/IconReaded';
import Avatar from '../Avatar/Avatar';

const getMessageTime = created_at => {

  const dateObject = new Date(created_at);

  return isToday(dateObject)
      ? format(dateObject, 'HH:mm')
      : format(dateObject, 'dd.MM.yyyy');
};


const MessageAudio = ({ audioSrc }) => {

  const audioElem = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false); 
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const togglePlay = () => {
    if (!isPlaying) {
      audioElem.current.play();
    } else {
      audioElem.current.pause();
    }
  };

  useEffect(() => {
    audioElem.current.addEventListener(
      'playing',
      () => {
        setIsPlaying(true);
      },
      false,
    );
    audioElem.current.addEventListener(
      'ended',
      () => {
        setIsPlaying(false);
        setProgress(0);
        setCurrentTime(0);
      },
      false,
    );
    audioElem.current.addEventListener(
      'pause',
      () => {
        setIsPlaying(false);
      },
      false,
    );
    audioElem.current.addEventListener('timeupdate', () => {
      const duration = (audioElem.current && audioElem.current.duration) || 0;
      setCurrentTime(audioElem.current.currentTime);
      setProgress((audioElem.current.currentTime / duration) * 100);
    });
  }, []);

  return (
    <div className="message__audio">
      <audio ref={audioElem} src={audioSrc} preload="auto"  />
      
      <div className="message__audio-progress" style={{ width: progress.toString() + '%' }} />
      <div className="message__audio-info">
        <div className="message__audio-btn">
          <button type="button" onClick={togglePlay}>
            {isPlaying ? (
              <img src={pauseSvg} alt="Pause svg" />
            ) : (
              <img src={playSvg} alt="Play svg" />
            )}
          </button>
        </div>
        <div className="message__audio-wave">
          <img src={waveSvg} alt="Wave svg" />
        </div>
        <span className="message__audio-duration">{convertCurrentTime(currentTime)}</span>
      </div>
    </div>
  );
};

const Message = ({ 
  user, 
  text, 
  created_at, 
  isMe, 
  readed, 
  attachments, 
  isTyping,
  onRemoveMessage,
  setPreviewImage
}) => {

  const renderAttachment = item => {
    if(item.ext != 'webm') {
      return (
        <div onClick={() => setPreviewImage(item.url)} key={item.id} className="message__attachments-item">
          <div className='message__attachments-item-overlay' >
            <EyeOutlined style={{ color : 'white', fontSize: 18 }} />
          </div> 
          <img src={item.url} alt={item.filename} />
        </div>
      )
    } else {
      return <MessageAudio key={item.id} audioSrc={item.url}/>
    }
  };




  return (
  <div className={ClassNames('message', { 
    'message--isme': isMe, 
    'message--is-typing': isTyping,
    'message--is-audio': isAudio(attachments),
    'message--image': 
      !isAudio(attachments) && attachments && attachments.length === 1 && !text
    })}>
    <div className='message__content'>
    <Popover
      content={
        <div>
          <Button onClick={onRemoveMessage}>Удалить сообщение</Button>
        </div>
      }
      trigger="click">
        <div className='message__icon-actions'> 
          <Button type="ghost" shape="circle" icon={<EllipsisOutlined  style={{ fontSize: '22px' }}/>} />
        </div>
      </Popover>

     <IconReaded isMe={isMe} isReaded={readed} />
      <div className='message__avatar'>
        <Avatar user={user} />
      </div>
      <div className="message__info">
      { (text || isTyping) && (
          <div className="message__bubble">
            {text  && (<p className="message__text">
              {reactStringReplace(text, /:(.+?):/g, (match,i) => (
                <em-emoji id={match} set="apple"></em-emoji>
              ))}</p> )}
            {isTyping && ( 
            <div className="message__typing">
                  <span />
                  <span />
                  <span />
            </div> 
            )}
            { false && ( <MessageAudio audioSrc={null}/> )}
          </div> 
          )}
          
          { attachments && (
            <div className="message__attachments">
           {attachments.map((item, index) => renderAttachment(item))}
          </div>
          )}
      </div>
      {created_at && 
          <span className="message__date">
            {getMessageTime(created_at)}
          </span> }
    </div>
  </div>
)};

Message.defaultProps = {
  user: {},
  avatar: '', // Значение по умолчанию для "avatar"
  text: '', // Значение по умолчанию для "text"
  date: '', // Значение по умолчанию для "date"
  isMe: false, // Значение по умолчанию для "isMe"
  isReaded: false, // Значение по умолчанию для "isReaded"
  attachments: [], // Значение по умолчанию для "attachments"
  isTyping: false, // Значение по умолчанию для "isTyping"
  audio: ''
};

Message.propTypes = {
  avatar: PropTypes.string,
  text: PropTypes.string,
  date: PropTypes.string,
  user: PropTypes.object,
  isMe: PropTypes.bool,
  isReaded: PropTypes.bool,
  attachments: PropTypes.array,
  isTyping: PropTypes.bool,
  audio:PropTypes.string,
};

export default Message;
