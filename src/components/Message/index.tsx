import React from 'react';
import './style.scss';

interface IMessage {
  text: string;
  isRight: boolean;
}

const Message = ({ text, isRight }: IMessage) => (
  <div className={`message ${isRight ? 'message-right' : ''}`}>{text}</div>
);

export default Message;
