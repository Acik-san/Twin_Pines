import React from 'react';
import { Skeleton } from '@mui/material';
import styles from './ChatsPreviewSkeleton.module.scss';

const ChatsPreviewSkeleton = () => {
  return (
    <li className={styles.preview}>
      <Skeleton variant='circular' className={styles.avatar} />
      <div className={styles.wrapper}>
        <div className={styles.preview_info}>
          <Skeleton className={styles.name} />
          <Skeleton className={styles.delivered_status} />
          <Skeleton className={styles.date} />
        </div>
        <Skeleton />
      </div>
    </li>
  );
};

export default ChatsPreviewSkeleton;
