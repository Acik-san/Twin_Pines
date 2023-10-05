import React from 'react';
import { useSelector } from 'react-redux';
import { OnlineBadgePropTypes } from '../../propTypes';
import { CSSTransition } from 'react-transition-group';
import classNames from 'classnames';

const OnlineBadge = props => {
  const {
    currentStatus,
    isMessageRead,
    messageSender,
    classes: { onlineWrapper, onlineWrapperNotRead, online, zoomIn, zoomOut },
  } = props;
  const { user } = useSelector(({ users }) => users);
  return (
    <CSSTransition in={currentStatus === 'online'} timeout={300} unmountOnExit>
      <div
        className={classNames(onlineWrapper, {
          [zoomIn]: currentStatus === 'online',
          [zoomOut]: currentStatus === 'offline',
          [onlineWrapperNotRead]: !isMessageRead && messageSender !== user.id,
        })}
      >
        <div className={online}></div>
      </div>
    </CSSTransition>
  );
};

OnlineBadge.propTypes = OnlineBadgePropTypes;

export default OnlineBadge;
