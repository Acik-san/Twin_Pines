import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { useClickOutside } from '../../hooks';
import Avatar from '../Avatar';
import UserProfileSettings from '../UserProfileSettings';
import styles from './ProfileSettings.module.scss';

const ProfileSettings = props => {
  const { handleProfileEdit, settings } = props;
  const { user } = useSelector(({ users }) => users);
  const settingsRef = useRef(null);
  useClickOutside(settingsRef, handleProfileEdit);
  return (
    <div className={styles.profile_settings_wrapper}>
      <article className={styles.settings} ref={settingsRef}>
        <Avatar
          userName={user.userName}
          avatar={user.avatar}
          classes={{
            photoWrapper: styles.photo_wrapper,
            photoInner: styles.photo_inner,
            photoInnerImg: styles.photo_inner_img,
          }}
        />
        <h3 className={styles.settings_username}>{user.userName}</h3>
        <UserProfileSettings user={user} settings={settings} />
      </article>
    </div>
  );
};

export default ProfileSettings;
