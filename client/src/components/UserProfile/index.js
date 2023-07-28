import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UserUpdateForm from '../forms/UserUpdateForm';
import { getInitials, stringToColour } from '../../utils/usefulFunctions';
import Error from '../Error';
import CONSTANTS from '../../constants';
import styles from './UserProfile.module.scss';

const UserProfile = () => {
  const [isEdit, setIsEdit] = useState(false);
  const { user } = useSelector(({ users }) => users);
  const editProfile = () => {
    setIsEdit(!isEdit);
  };
  const navigate = useNavigate();
  return (
    <section className={styles.section}>
      {/* {error && <Error error={error} />} */}
      <article
        className={styles.user_card}
        style={{ height: isEdit && '410px' }}
      >
        <div className={styles.photo_wrapper}>
          <div
            className={styles.photo_inner}
            style={{ backgroundColor: stringToColour(`${user.login}`) }}
          >
            {getInitials([user.login])}
          </div>
          {user.avatar === 'anon.png' ? (
            <img
              alt='avatar'
              src={`${CONSTANTS.ANONYM_IMAGE_PATH}`}
              className={styles.photo_inner_img}
            />
          ) : (
            <img
              alt='avatar'
              src={`${CONSTANTS.publicURL}${user.avatar}`}
              className={styles.photo_inner_img}
            />
          )}
        </div>
        <h3 className={styles.login}>{user.login}</h3>
        <div className={styles.buttons}>
          <label htmlFor='edit_profile' className={styles.edit_profile}>
            <button
              id='edit_profile'
              className={styles.button_none}
              onClick={editProfile}
            ></button>
          </label>
        </div>
        {isEdit && <UserUpdateForm editProfile={editProfile} />}
      </article>
    </section>
  );
};

export default UserProfile;
