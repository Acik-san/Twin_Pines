import React from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import ChatsPreviewList from '../ChatsPreviewList';
import UsersSearchInput from '../UsersSearchInput';
import styles from './Chats.module.scss';

const Chats = () => {
  const { currentDialog } = useSelector(({ chats }) => chats);
  return (
    <div
      className={classNames(styles.container, { [styles.none]: currentDialog })}
    >
      <UsersSearchInput />
      <ChatsPreviewList />
    </div>
  );
};

export default Chats;
