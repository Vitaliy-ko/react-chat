import React, { useEffect, useRef } from 'react';

import { Message } from '../Message';
import styles from './styles.module.scss';

export const MessageArea = ({
  messages,
  currentUserId,
  setMessage,
  setEditingMessage,
  setIsEditMessageMode,
  likeMessage,
  deleteMessage,
}) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  return (
    <>
      <div className={styles.container}>
        {messages.map((message) => (
          <Message
            key={message.id}
            message={message}
            currentUserId={currentUserId}
            setMessage={setMessage}
            setEditingMessage={setEditingMessage}
            setIsEditMessageMode={setIsEditMessageMode}
            likeMessage={likeMessage}
            deleteMessage={deleteMessage}
          />
        ))}
        <div ref={messagesEndRef}></div>
      </div>
    </>
  );
};
