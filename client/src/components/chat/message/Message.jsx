import React, { useEffect, useRef, useState}from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import ruLocale from "date-fns/locale/ru";

import { convertCurrentTime } from '../../../utils/helpers';

import waveSvg from "../../../assets/img/wave.svg";
import pauseSvg from "../../../assets/img/pause.svg";
import playSvg from "../../../assets/img/play.svg";


import "./Message.scss";
import IconReaded from '../IconReaded/IconReaded';

const MessageAudio = ({audioSrc}) => {

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
  avatar, 
  user, 
  text, 
  date, 
  audio,
  isMe, 
  isReaded, 
  attachments, 
  isTyping 
}) => {

  return (
  <div className={ClassNames('message', { 
    'message--isme': isMe, 
    'message--is-typing': isTyping,
    'message--is-audio': audio,
    'message--image': attachments && attachments.length === 1
    })}>
    <div className='message__content'>
     <IconReaded isMe={isMe} isReaded={isReaded} />
      <div className='message__avatar'>
        <img src={avatar} alt={`Avatar ${user.fullname}`} />
      </div>
      <div className="message__info">
      {(audio || text || isTyping) && (
          <div className="message__bubble">
            {text && <p className="message__text">{text}</p>}
            {isTyping && ( 
            <div className="message__typing">
                  <span />
                  <span />
                  <span />
            </div> 
            )}
            { audio && ( <MessageAudio audioSrc={audio}/> )}
          </div> 
          )}

          { attachments && (
            <div className="message__attachments">
           {attachments.map((item, index) => (
            <div key={index} className="message__attachments-item">
              <img src={item.url} alt={item.filename} />
            </div>
          ))}
          </div>
          )}

          {date && 
          <span className="message__date">
            {formatDistanceToNow(new Date(date), { addSuffix: true, locale: ruLocale })}
          </span> }
      </div>
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
