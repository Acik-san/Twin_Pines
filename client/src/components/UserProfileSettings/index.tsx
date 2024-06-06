import React, { FC } from 'react';
import { IUserProfileSettings } from '../../types';
import UserProfileSetting from '../UserProfileSetting';
import UserUpdateForm from '../forms/UserUpdateForm';
import CONSTANTS from '../../constants';
const { USER_PROFILE_SETTINGS } = CONSTANTS;

const UserProfileSettings: FC<IUserProfileSettings> = ({
  user,
  settings: { isEdit, name, value, type, editProfile, handleSetting },
}) => {
  return (
    <>
      {USER_PROFILE_SETTINGS.map(
        ({ id, iconName, propertyName, name, type }) => (
          <UserProfileSetting
            key={id}
            iconName={iconName}
            propertyName={propertyName}
            propertyValue={user[name as keyof typeof user] as string}
            name={name}
            type={type}
            handleSetting={handleSetting}
            isEdit={isEdit}
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
