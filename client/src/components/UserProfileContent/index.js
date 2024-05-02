import React from 'react';
import { UserProfileContentPropTypes } from '../../propTypes';
import UserProfileOnlineStatus from '../UserProfileOnlineStatus';
import styles from './UserProfileContent.module.scss';

const UserProfileContent = props => {
  const { userData } = props;
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

UserProfileContent.propTypes = UserProfileContentPropTypes;

export default UserProfileContent;
