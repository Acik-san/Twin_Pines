import React, { FC } from 'react';
import { IUserProfileContent } from '../../types';
import UserProfileOnlineStatus from '../UserProfileOnlineStatus';
import styles from './UserProfileContent.module.scss';

const UserProfileContent: FC<IUserProfileContent> = ({ userData }) => {
  return (
    <div className={styles.container}>
      <UserProfileOnlineStatus
        userData={userData}
        classes={{
          online_status_container: styles.online_status_container,
          online_status: styles.online_status,
          last_seen: styles.last_seen,
        }}
      />
    </div>
  );
};

export default UserProfileContent;
