import React from 'react';
import { useSelector } from 'react-redux';
import { OnlineBadgePropTypes } from '../../propTypes';
import classNames from 'classnames';

const OnlineBadge = props => {
  const {
    currentStatus,
    previousStatus,
    isMessageRead,
    messageSender,
    classes: { onlineWrapper, onlineWrapperNotRead, online, zoomIn, zoomOut },
  } = props;
  const { user } = useSelector(({ users }) => users);
  return (
    <div
      className={classNames(onlineWrapper, {
        [zoomIn]: currentStatus === 'online',
        [zoomOut]: currentStatus === 'offline' && previousStatus === 'online',
        [onlineWrapperNotRead]: !isMessageRead && messageSender !== user.id,
      })}
    >
      <div className={online}></div>
    </div>
  );
};

OnlineBadge.propTypes = OnlineBadgePropTypes;

export default OnlineBadge;
