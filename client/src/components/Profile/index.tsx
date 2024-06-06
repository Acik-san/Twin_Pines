import React, { FC, useState } from 'react';
import { Skeleton } from '@mui/material';
import { IProfile } from '../../types';
import { useTypedSelector } from '../../hooks';
import UserProfileInfo from '../UserProfileInfo';
import UserSubscriptionInfo from '../UserSubscriptionInfo';
import UserProfileContent from '../UserProfileContent';
import ProfileSettings from '../ProfileSettings';
import UserSubscriptionsList from '../UserSubscriptionsList';
import styles from './Profile.module.scss';

const Profile: FC<IProfile> = ({ userData, profileSettings }) => {
  const { user } = useTypedSelector(({ users }) => users);
  const [isProfileEdit, setIsProfileEdit] = useState(false);
  const [isSubscriptionOpen, setIsSubscriptionOpen] = useState(false);
  const handleProfileEdit = () => setIsProfileEdit(!isProfileEdit);
  const handleSubscriptionOpen = () =>
    setIsSubscriptionOpen(!isSubscriptionOpen);
  return (
    <>
      <article className={styles.user_card}>
        <div className={styles.profile_head}>
          <UserProfileInfo userData={userData} />
          <UserSubscriptionInfo
            userData={userData}
            handleProfileEdit={handleProfileEdit}
            handleSubscriptionOpen={handleSubscriptionOpen}
          />
        </div>
        <div className={styles.profile_body}>
          <div className={styles.left_column}>
            <Skeleton className={styles.user_stories} />
            <Skeleton className={styles.user_posts} />
          </div>
          <div className={styles.right_column}>
            <UserProfileContent userData={userData} />
          </div>
        </div>
      </article>
      {userData.id === user?.id && isProfileEdit ? (
        <ProfileSettings
          handleProfileEdit={handleProfileEdit}
          settings={profileSettings}
        />
      ) : null}
      {isSubscriptionOpen ? (
        <UserSubscriptionsList
          handleSubscriptionOpen={handleSubscriptionOpen}
        />
      ) : null}
    </>
  );
};

export default Profile;
