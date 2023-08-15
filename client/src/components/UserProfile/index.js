import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { useSettingsForUser, useIsFirstRender } from '../../hooks';
import classNames from 'classnames';
import UserProfileSettings from '../UserProfileSettings';
import { getInitials, stringToColour } from '../../utils/usefulFunctions';
import CONSTANTS from '../../constants';
import 'react-toastify/dist/ReactToastify.css';
import styles from './UserProfile.module.scss';

const UserProfile = () => {
  const {
    isEdit,
    name,
    value,
    type,
    containerRef,
    editProfile,
    handleSetting,
  } = useSettingsForUser();
  const isFirstRender = useIsFirstRender();

  const { user, error } = useSelector(({ users }) => users);

  useEffect(() => {
    if (!isFirstRender && error?.status === 409) {
      toast.error(error?.message);
    }
  }, [error]);
  useEffect(() => {
    if (!isFirstRender) {
      toast.success(`Your ${name} has changed successfully`);
    }
  }, [user]);
  return (
    <section
      className={classNames(styles.section, {
        [styles.section_background_dark]: isEdit,
      })}
    >
      <ToastContainer
        position='top-center'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
      <article className={styles.user_card} ref={containerRef}>
        <div className={styles.photo_wrapper}>
          <div
            className={styles.photo_inner}
            style={{ backgroundColor: stringToColour(`${user.login}`) }}
          >
            {getInitials([user.login])}
          </div>
          <img
            alt='avatar'
            src={`${
              user.avatar === 'anon.png'
                ? CONSTANTS.ANONYM_IMAGE_PATH
                : CONSTANTS.publicURL + user.avatar
            }`}
            className={styles.photo_inner_img}
          />
        </div>
        <h3 className={styles.login}>{user.login}</h3>
        <UserProfileSettings
          user={user}
          settings={{ isEdit, name, value, type, editProfile, handleSetting }}
        />
      </article>
    </section>
  );
};

export default UserProfile;
