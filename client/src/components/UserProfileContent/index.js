import React from 'react';
import UserProfileOnlineStatus from '../UserProfileOnlineStatus';
import styles from './UserProfileContent.module.scss';

const UserProfileContent = props => {
  const { userData } = props;
  return (
    <div className={styles.container}>
      <UserProfileOnlineStatus userData={userData} />
    </div>
  );
};

export default UserProfileContent;
