import React from 'react';
import moment from 'moment';

import styles from './style.module.scss';

const getMessageInformation = (createdAt, editedAt) => {
  let messageDate = moment(createdAt).format('MMMM Do YYYY, h:mm:ss a');
  if (editedAt) {
    messageDate = 'Edited: ' + moment(editedAt).format('MMMM Do YYYY, h:mm:ss a');
  }
  return messageDate;
};

export const Message = ({
  message,
  currentUserId,
  setMessage,
  setEditingMessage,
  setIsEditMessageMode,
  likeMessage,
  deleteMessage
}) => {
  const { text, user, userId, avatar, createdAt, editedAt } = message;
  const isOwner = currentUserId === userId;
  const isLiked = message.like && message.like.has(currentUserId);
  const messageDate = getMessageInformation(createdAt, editedAt);

  const editHandler = () => {
    setIsEditMessageMode(true);
    setMessage(text);
    setEditingMessage(message);
  };

  const likeHandler = () => {
    likeMessage(message.id, currentUserId);
  };

  const deleteHandler = () => {
    deleteMessage(message.id)
  };

  return (
    <div className={[styles.container, isOwner ? styles.own : ''].join(' ')}>
      <img src={avatar} alt={user + ' avatar'} className={styles.avatar} />
      <div className={styles.content}>
        <div className={styles.wrapper}>
          <p className={styles.name}>{user}</p>
          <p className={styles.text}>{text}</p>
        </div>
        <div className={styles.actions}>
          <div>
            {isOwner ? (
              <>
                <button className={styles.edit} onClick={deleteHandler}>
                  Delete
                </button>
                <button className={styles.edit} onClick={editHandler}>
                  Edit
                </button>
              </>
            ) : (
              <button className={[styles.like, isLiked ? styles.liked : ''].join(' ')} onClick={likeHandler}>
                Like
              </button>
            )}
          </div>
          <p className={styles.date}>{messageDate}</p>
        </div>
      </div>
    </div>
  );
};
