import React from 'react';
import { UserProfileOnlineStatusPropTypes } from '../../propTypes';
import { calculateDate } from '../../utils/usefulFunctions';

const UserProfileOnlineStatus = props => {
  const {
    userData,
    classes: { online_status_container, online_status, last_seen },
  } = props;
  return (
    <div className={online_status_container}>
      {userData.onlineStatus === 'offline' ? (
        <p className={last_seen}>
          last seen{' '}
          {calculateDate(userData.lastSeen, 'HH:mm', 'eeee HH:mm', 'dd.MM.yy')}
        </p>
      ) : (
        <h4 className={online_status}>{userData.onlineStatus}</h4>
      )}
    </div>
  );
};

UserProfileOnlineStatus.propTypes = UserProfileOnlineStatusPropTypes;

export default UserProfileOnlineStatus;
