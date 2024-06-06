import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { IUserData } from '../../types';
import { useTypedSelector, useClickOutside } from '../../hooks';
import Avatar from '../Avatar';
import * as ActionsChats from '../../actions/chatsCreator';
import styles from './UsersSearchInput.module.scss';

const UsersSearchInput = () => {
  const { user, users } = useTypedSelector(({ users }) => users);
  const { editMessageMode, replyMessageMode, forwardMessageMode } =
    useTypedSelector(({ chats }) => chats);
  const {
    startDialogRequest,
    setEditMessageMode,
    setReplyMessageMode,
    setForwardMessageMode,
  } = bindActionCreators(ActionsChats, useDispatch());
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<IUserData[]>([]);
  const [showResults, setShowResults] = useState(false);
  const searchResultsRef = useRef(null);
  useClickOutside(searchResultsRef, () => setShowResults(false));
  const filteredUsers = users.filter(
    ({ id, userName }) =>
      id !== user?.id &&
      userName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleFocus = () => {
    setSearchResults(filteredUsers);
    setShowResults(true);
  };
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  useEffect(() => {
    setSearchResults(filteredUsers);
  }, [searchTerm]);
  return (
    <div className={styles.container} ref={searchResultsRef}>
      <input
        className={styles.input}
        type='text'
        value={searchTerm}
        placeholder='Search'
        onChange={handleSearch}
        onFocus={handleFocus}
      />
      {showResults && (
        <ul className={styles.search_results}>
          {searchResults.map(({ id, userName, avatar }) => (
            <li
              key={id}
              onClick={() => {
                setShowResults(false);
                if (
                  editMessageMode.isEdit &&
                  editMessageMode.message.interlocutorId !== id
                ) {
                  setEditMessageMode({
                    isEdit: false,
                    message: {},
                  });
                }
                if (
                  replyMessageMode.isReply &&
                  replyMessageMode.message.interlocutorId !== id
                ) {
                  setReplyMessageMode({
                    isReply: false,
                    message: {},
                  });
                }
                if (
                  forwardMessageMode.isForward &&
                  forwardMessageMode.message.interlocutorId !== id
                ) {
                  setForwardMessageMode({
                    isChatListOpen: false,
                    isForward: false,
                    message: {},
                  });
                }
                startDialogRequest({
                  userId: user?.id!,
                  interlocutorId: id,
                  userName,
                  avatar,
                });
              }}
            >
              <Avatar
                userName={userName}
                avatar={avatar}
                classes={{
                  photoWrapper: styles.photo_wrapper,
                  photoInner: styles.photo_inner,
                  photoInnerImg: styles.photo_inner_img,
                }}
              />
              <div className={styles['text-container']}>
                <h3>{userName}</h3>
                {/* <p>{status}</p> */}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UsersSearchInput;
