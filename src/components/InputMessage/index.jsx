import React from 'react';
import styles from './style.module.scss';

export const InputMessage = ({ message, isEditMessageMode, setMessage, sendMessage, editMessage }) => {
  //добавлено для предотварщения перерисовки всех компонентов страницы при вводе сообщения

  const inputMessageHandler = (msg) => {
    setMessage(msg);
  };

  const sendMessageHandler = (message) => {
    sendMessage(message);
    setMessage('');
  };

  const editMessageHandler = (message) => {
    editMessage(message);
    setMessage('');
  };

  return (
    <div className={styles.container}>
      <textarea
        className={styles.inputMessage}
        onChange={(e) => inputMessageHandler(e.target.value)}
        value={message}
        placeholder="Enter your message "
      ></textarea>
      {isEditMessageMode ? (
        <button type="submit" className={styles.sendMessage} onClick={() => editMessageHandler(message)}>
          Edit
        </button>
      ) : (
        <button type="submit" className={styles.sendMessage} onClick={() => sendMessageHandler(message)}>
          Send
        </button>
      )}
    </div>
  );
};
