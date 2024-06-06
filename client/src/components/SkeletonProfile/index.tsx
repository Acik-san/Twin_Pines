import React from 'react';
import { Skeleton } from '@mui/material';
import styles from './SkeletonProfile.module.scss';

const SkeletonProfile = () => {
  return (
    <article className={styles.user_card}>
      <div className={styles.profile_head}>
        <div className={styles.user_info_container}>
          <Skeleton className={styles.user_photo} />
          <div className={styles.user_info}>
            <Skeleton className={styles.user_name} />
            <Skeleton className={styles.name} />
            <Skeleton className={styles.bio} />
          </div>
        </div>
        <div className={styles.subscription_container}>
          <Skeleton className={styles.subscriptions} />
          <div className={styles.button_container}>
            <Skeleton className={styles.subscribe_button} />
            <Skeleton className={styles.options_button} />
          </div>
        </div>
      </div>
      <div className={styles.profile_body}>
        <div className={styles.left_column}>
          <Skeleton className={styles.user_stories} />
          <Skeleton className={styles.user_posts} />
        </div>
        <div className={styles.right_column}>
          <Skeleton className={styles.container} />
        </div>
      </div>
    </article>
  );
};

export default SkeletonProfile;
