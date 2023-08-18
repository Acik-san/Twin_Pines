import React from 'react';
import { UserProfileSettingPropTypes } from '../../propTypes';
import styles from './UserProfileSetting.module.scss';

const UserProfileSetting = props => {
  const { name, type, iconName, propertyName, propertyValue, handleSetting } =
    props;
  const handleClick = () => {
    handleSetting(propertyValue, name, type);
  };
  return (
    <>
      <article className={styles.info_group} onClick={handleClick}>
        <div className={styles[iconName]}></div>
        <h4>{propertyName}</h4>
        {name !== 'avatar' && propertyValue ? <p>{propertyValue}</p> : null}
      </article>
    </>
  );
};

UserProfileSetting.propTypes = UserProfileSettingPropTypes;

export default UserProfileSetting;
