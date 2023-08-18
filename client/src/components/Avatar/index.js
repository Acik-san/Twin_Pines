import React from 'react';
import { AvatarPropTypes } from '../../propTypes';
import { getInitials, stringToColour } from '../../utils/usefulFunctions';
import CONSTANTS from '../../constants';

const Avatar = props => {
  const {
    login,
    avatar,
    onlineBadge,
    classes: { photoWrapper, photoInner, photoInnerImg },
  } = props;
  return (
    <div className={photoWrapper}>
      <div
        className={photoInner}
        style={{ backgroundColor: stringToColour(`${login}`) }}
      >
        {onlineBadge}
        {getInitials([login])}
      </div>
      <img
        alt='avatar'
        src={`${
          avatar === 'anon.png'
            ? CONSTANTS.ANONYM_IMAGE_PATH
            : CONSTANTS.publicURL + avatar
        }`}
        className={photoInnerImg}
      />
    </div>
  );
};

Avatar.propTypes = AvatarPropTypes;

export default Avatar;
