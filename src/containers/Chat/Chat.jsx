import React, { useState, useEffect } from 'react';
import { Spinner } from '../../components/Spinner';
import { v4 as uuidv4 } from 'uuid';

import WillSmith from './../../assets/images/WillSmith.jpg';
import { container } from './chat.module.scss';
import { MessageArea } from '../../components/MessageArea';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { InputMessage } from '../../components/InputMessage';

export const Chat = () => {
  const currentUserId = '111';
  const [isEditMessageMode, setIsEditMessageMode] = useState(false);
  const [editingMessage, setEditingMessage] = useState({});
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const messageTemplate = {
    id: '',
    text: '',
    user: 'Will Smith',
    avatar: WillSmith,
    userId: currentUserId,
    editedAt: '',
    createdAt: '',
    like: new Map(),
  };

  useEffect(() => {
    fetch('https://api.npoint.io/b919cb46edac4c74d0a8')
      .then((response) => response.json())
      .then((messages) => {
        setMessages(messages);
        setIsLoaded(true);
      });
  }, []);

  const sendMessage = (text) => {
    const newMessage = {
      ...messageTemplate,
      text,
      id: uuidv4(),
      createdAt: new Date(),
    };

    setMessages([...messages, newMessage]);
  };

  const getMessageIndex = (messageId) => messages.findIndex((message) => message.id === messageId);

  const editMessage = (text) => {
    setMessage('');
    const { id: messageId } = editingMessage;
    const editedMessage = { ...editingMessage, text };
    const editedMessageIndex = getMessageIndex(messageId);
    const newMessagesList = [...messages];

    newMessagesList.splice(editedMessageIndex, 1, editedMessage);
    setMessages(newMessagesList);
    setIsEditMessageMode(false);
  };

  const likeMessage = (messageId, currentUserId) => {
    const newMessagesList = [...messages];
    const likeMessageIndex = getMessageIndex(messageId)
    const editedMessage = messages[likeMessageIndex];
    const isMessageLiked = editedMessage.like && editedMessage.like.has(currentUserId);

    if (isMessageLiked) {
      editedMessage.like.delete(currentUserId);
    } else {
      editedMessage.like = new Map();
      editedMessage.like.set(currentUserId, true);
    }

    newMessagesList.splice(likeMessageIndex, 1, editedMessage);
    setMessages(newMessagesList);
  };

  const deleteMessage = (messageId) => {
    const newMessagesList = [...messages];
    const deleteMessageIndex = getMessageIndex(messageId);
    newMessagesList.splice(deleteMessageIndex, 1);
    setMessages(newMessagesList);
  };

  return (
    <div className={container}>
      {!isLoaded ? (
        <Spinner />
      ) : (
        <>
          <Header messages={messages} />
          <MessageArea
            messages={messages}
            currentUserId={currentUserId}
            setMessage={setMessage}
            setEditingMessage={setEditingMessage}
            setIsEditMessageMode={setIsEditMessageMode}
            likeMessage={likeMessage}
            deleteMessage={deleteMessage}
          />
          <InputMessage
            sendMessage={sendMessage}
            isEditMessageMode={isEditMessageMode}
            message={message}
            setMessage={setMessage}
            editMessage={editMessage}
          />
          <Footer />
        </>
      )}
    </div>
  );
};
