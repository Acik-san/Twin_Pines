import React from 'react';
import ChatsPreviewList from '../ChatsPreviewList';
import UsersSearchInput from '../UsersSearchInput';
import styles from './Chats.module.scss';

const Chats = () => {
  return (
    <div className={styles.container}>
      <UsersSearchInput />
      <ChatsPreviewList />
    </div>
  );
};

export default Chats;
