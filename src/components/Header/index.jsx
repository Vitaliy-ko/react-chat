import React from 'react';
import moment from 'moment';

import styles from './styles.module.scss';

const getMessagesData = (messages) => {
  const users = [];
  let lastMessageDate = 0;

  messages.forEach((message) => {
    const { createdAt, user } = message;
    const isUserNameAdded = users.includes(user);

    if (!isUserNameAdded) {
      users.push(message.user);
    }

    if (lastMessageDate < Date.parse(createdAt)) {
      lastMessageDate = createdAt;
    }
  });

  return { users, lastMessageDate };
};

export const Header = ({ messages }) => {
  const { users, lastMessageDate } = getMessagesData(messages);

  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <p>Chat-X</p>
        <p>Users count: {users.length}</p>
        <p>Messages count: {messages.length}</p>
        <p>Last message: {moment(lastMessageDate).fromNow()}</p>
      </div>
    </div>
  );
};
