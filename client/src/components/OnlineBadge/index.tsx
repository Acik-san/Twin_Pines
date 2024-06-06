import React, { FC } from 'react';
import { IOnlineBadge } from '../../types';
import { useTypedSelector } from '../../hooks';
import { CSSTransition } from 'react-transition-group';
import classNames from 'classnames';

const OnlineBadge: FC<IOnlineBadge> = ({
  currentStatus,
  isMessageRead,
  messageSender,
  classes: { onlineWrapper, onlineWrapperNotRead, online, zoomIn, zoomOut },
}) => {
  const { user } = useTypedSelector(({ users }) => users);
  return (
    <CSSTransition in={currentStatus === 'online'} timeout={300} unmountOnExit>
      <div
        className={classNames(onlineWrapper, {
          [zoomIn]: currentStatus === 'online',
          [zoomOut]: currentStatus === 'offline',
          [onlineWrapperNotRead]: !isMessageRead && messageSender !== user?.id,
        })}
      >
        <div className={online}></div>
      </div>
    </CSSTransition>
  );
};

export default OnlineBadge;
