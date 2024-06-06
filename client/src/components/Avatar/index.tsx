import { FC } from 'react';
import { IAvatar } from '../../types';
import { getInitials, stringToColour } from '../../utils/usefulFunctions';
import CONSTANTS from '../../constants';

const Avatar: FC<IAvatar> = ({
  userName,
  avatar,
  onlineBadge,
  classes: { photoInner, photoInnerImg, photoWrapper },
}) => {
  return (
    <div className={photoWrapper}>
      <div
        className={photoInner}
        style={{ backgroundColor: stringToColour(`${userName}`) }}
      >
        {onlineBadge}
        {getInitials([userName])}
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

export default Avatar;
