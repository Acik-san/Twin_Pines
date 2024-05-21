import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ActionsChats from '../../actions/chatsCreator';
import styles from './UsersSearchInput.module.scss';
import Avatar from '../Avatar';

const UsersSearchInput = () => {
  const { user, users } = useSelector(({ users }) => users);
  const { editMessageMode, replyMessageMode, forwardMessageMode } = useSelector(
    ({ chats }) => chats
  );
  const {
    startDialogRequest,
    setEditMessageMode,
    setReplyMessageMode,
    setForwardMessageMode,
  } = bindActionCreators(ActionsChats, useDispatch());
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const searchResultsRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = event => {
      if (
        searchResultsRef.current &&
        !searchResultsRef.current.contains(event.target)
      ) {
        setShowResults(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
  const filteredUsers = users.filter(
    ({ id, userName }) =>
      id !== user.id &&
      userName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleFocus = () => {
    setSearchResults(filteredUsers);
    setShowResults(true);
  };
  const handleSearch = event => {
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
                    messgae: {},
                  });
                }
                if (
                  replyMessageMode.isReply &&
                  replyMessageMode.message.interlocutorId !== id
                ) {
                  setReplyMessageMode({
                    isReply: false,
                    messgae: {},
                  });
                }
                if (
                  forwardMessageMode.isForward &&
                  forwardMessageMode.message.interlocutorId !== id
                ) {
                  setForwardMessageMode({
                    isChatListOpen: false,
                    isForward: false,
                    messgae: {},
                  });
                }
                startDialogRequest({
                  userId: user.id,
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
