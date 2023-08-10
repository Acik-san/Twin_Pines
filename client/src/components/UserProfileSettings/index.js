import React from 'react';
import UserProfileSetting from '../UserProfileSetting';
import UserUpdateForm from '../forms/UserUpdateForm';
import CONSTANTS from '../../constants';
const { USER_PROFILE_SETTINGS } = CONSTANTS;

const UserProfileSettings = props => {
  const {
    user,
    settings: { isEdit, name, value, type, editProfile, handleSetting },
  } = props;
  return (
    <>
      {USER_PROFILE_SETTINGS.map(
        ({ id, iconName, propertyName, name, type }) => (
          <UserProfileSetting
            key={id}
            iconName={iconName}
            propertyName={propertyName}
            propertyValue={user[name]}
            name={name}
            type={type}
            handleSetting={handleSetting}
          />
        )
      )}
      {isEdit ? (
        <UserUpdateForm
          id={user.id}
          name={name}
          value={value}
          type={type}
          editProfile={editProfile}
        />
      ) : null}
    </>
  );
};

export default UserProfileSettings;
