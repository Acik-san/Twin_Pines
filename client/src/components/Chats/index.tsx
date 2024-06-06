import React from 'react';
import classNames from 'classnames';
import { useTypedSelector } from '../../hooks';
import ChatsPreviewList from '../ChatsPreviewList';
import UsersSearchInput from '../UsersSearchInput';
import styles from './Chats.module.scss';

const Chats = () => {
  const { currentDialog } = useTypedSelector(({ chats }) => chats);
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
