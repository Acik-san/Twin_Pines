import React, { FC } from 'react';
import { IUserProfileOnlineStatus } from '../../types';
import { calculateDate } from '../../utils/usefulFunctions';

const UserProfileOnlineStatus: FC<IUserProfileOnlineStatus> = ({
  userData,
  classes: { online_status_container, online_status, last_seen },
}) => {
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

export default UserProfileOnlineStatus;
