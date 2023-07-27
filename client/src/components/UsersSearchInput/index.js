import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getInitials, stringToColour } from '../../utils/usefulFunctions';
import * as ActionsChats from '../../actions/chatsCreator';
import CONSTANTS from '../../constants';
import styles from './UsersSearchInput.module.scss';

const UsersSearchInput = () => {
  const { user, users } = useSelector(({ users }) => users);
  const { chooseCurrentChat } = bindActionCreators(ActionsChats, useDispatch());
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
    ({ id, login }) =>
      id !== user.id && login.toLowerCase().includes(searchTerm.toLowerCase())
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
          {searchResults.map(({ id, login, avatar, status }) => (
            <li
              key={id}
              onClick={() => {
                setShowResults(false);
                chooseCurrentChat({
                  interlocutorId: id,
                  login,
                  avatar,
                });
              }}
            >
              <div className={styles.photo_wrapper}>
                <div
                  className={styles.photo_inner}
                  style={{
                    backgroundColor: stringToColour(`${login}`),
                  }}
                >
                  {getInitials([login])}
                </div>
                <img
                  alt='avatar'
                  src={`${
                    avatar === 'anon.png'
                      ? CONSTANTS.ANONYM_IMAGE_PATH
                      : CONSTANTS.publicURL + avatar
                  }`}
                  className={styles.photo_inner_img}
                />
              </div>
              <div className={styles['text-container']}>
                <h3>{login}</h3>
                <p>{status}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UsersSearchInput;
