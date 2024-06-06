import React, { FC, useRef } from 'react';
import { useTypedSelector, useClickOutside } from '../../hooks';
import { IProfileSettings } from '../../types';
import Avatar from '../Avatar';
import UserProfileSettings from '../UserProfileSettings';
import styles from './ProfileSettings.module.scss';

const ProfileSettings: FC<IProfileSettings> = ({
  handleProfileEdit,
  settings,
}) => {
  const { user } = useTypedSelector(({ users }) => users);
  const settingsRef = useRef(null);
  useClickOutside(settingsRef, handleProfileEdit);
  return (
    <div className={styles.profile_settings_wrapper}>
      <article className={styles.settings} ref={settingsRef}>
        {user && (
          <>
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
          </>
        )}
      </article>
    </div>
  );
};

export default ProfileSettings;
