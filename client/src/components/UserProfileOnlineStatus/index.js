import React from 'react';
import { calculateDate } from '../../utils/usefulFunctions';
import styles from './UserProfileOnlineStatus.module.scss';

const UserProfileOnlineStatus = props => {
  const { userData } = props;
  return (
    <div className={styles.container}>
      <h4 className={styles.online_status}>{userData.onlineStatus}</h4>
      {userData.onlineStatus === 'offline' ? (
        <p className={styles.last_seen}>
          last seen{' '}
          {calculateDate(userData.lastSeen, 'HH:mm', 'eeee HH:mm', 'dd.MM.yy')}
        </p>
      ) : null}
    </div>
  );
};

export default UserProfileOnlineStatus;
