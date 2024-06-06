import React, { FC } from 'react';
import { IUserProfileInfo } from '../../types';
import Avatar from '../Avatar';
import styles from './UserProfileInfo.module.scss';

const UserProfileInfo: FC<IUserProfileInfo> = ({ userData }) => {
  return (
    <div className={styles.container}>
      <Avatar
        userName={userData.userName}
        avatar={userData.avatar}
        classes={{
          photoWrapper: styles.photo_wrapper,
          photoInner: styles.photo_inner,
          photoInnerImg: styles.photo_inner_img,
        }}
      />
      <article className={styles.user_info_wrapper}>
        <h3 className={styles.userName}>{userData.userName}</h3>
        <h4 className={styles.name}>{userData.name}</h4>
        {userData.bio && <p className={styles.bio}>{userData.bio}</p>}
      </article>
    </div>
  );
};

export default UserProfileInfo;
