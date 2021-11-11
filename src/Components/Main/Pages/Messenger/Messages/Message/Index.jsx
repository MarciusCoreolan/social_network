import React from 'react';
import s from './message.module.css';

function Message(props) {
  return (
    <div
      className={
        props.message.opponentName !== props.userName ? s.author_message : ''
      }
    >
      <div className={s.messages}>
        <div className={s.message}>{props.message.message}</div>
        <div className={s.author}>{props.message.userName}</div>
      </div>
    </div>
  );
}

export default Message;
