import React, { FC } from 'react';
import { IUserProfileSetting } from '../../types';
import styles from './UserProfileSetting.module.scss';

const UserProfileSetting: FC<IUserProfileSetting> = ({
  name,
  type,
  iconName,
  propertyName,
  propertyValue,
  handleSetting,
  isEdit,
}) => {
  const handleClick = () => {
    handleSetting(propertyValue, name, type);
  };
  return (
    <>
      <article
        className={styles.info_group}
        onClick={isEdit ? () => {} : handleClick}
      >
        <div className={styles[iconName]} />
        <h4>{propertyName}</h4>
        {name !== 'avatar' && propertyValue ? <p>{propertyValue}</p> : null}
      </article>
    </>
  );
};

export default UserProfileSetting;
