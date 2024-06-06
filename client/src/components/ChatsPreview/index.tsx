import React, { FC, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { CSSTransition } from 'react-transition-group';
import classNames from 'classnames';
import { IChatsPreview } from '../../types';
import { useTypedSelector } from '../../hooks';
import Avatar from '../Avatar';
import OnlineBadge from '../OnlineBadge';
import TypingAnimation from '../TypingAnimation';
import { calculateDate } from '../../utils/usefulFunctions';
import * as ActionsChats from '../../actions/chatsCreator';
import styles from './ChatsPreview.module.scss';

const ChatsPreview: FC<IChatsPreview> = ({
  conversationId,
  sender,
  interlocutor,
  body,
  createdAt,
  isTyping,
  isRead,
}) => {
  const { user } = useTypedSelector(({ users }) => users);
  const {
    unreadMessages,
    currentDialog,
    editMessageMode,
    replyMessageMode,
    forwardMessageMode,
  } = useTypedSelector(({ chats }) => chats);
  const {
    chooseCurrentChat,
    setEditMessageMode,
    setReplyMessageMode,
    setForwardMessageMode,
  } = bindActionCreators(ActionsChats, useDispatch());

  const unreadMessagesCount = useMemo(
    () => unreadMessages.find(message => message._id === conversationId)?.count,
    [unreadMessages, conversationId]
  );
  return (
    <li
      className={classNames(styles.conversation_container, {
        [styles.conversation_container_choosed]:
          currentDialog?.conversationId === conversationId,
        [styles.not_read]: sender !== user?.id && unreadMessagesCount,
      })}
      onClick={() => {
        if (
          editMessageMode.isEdit &&
          editMessageMode.message.interlocutorId !== interlocutor.id
        ) {
          setEditMessageMode({
            isEdit: false,
            message: {},
          });
        }
        if (
          replyMessageMode.isReply &&
          replyMessageMode.message.interlocutorId !== interlocutor.id
        ) {
          setReplyMessageMode({
            isReply: false,
            message: {},
          });
        }
        if (
          forwardMessageMode.isForward &&
          forwardMessageMode.message.interlocutorId !== interlocutor.id
        ) {
          setForwardMessageMode({
            isChatListOpen: false,
            isForward: false,
            message: {},
          });
        }
        chooseCurrentChat({
          conversationId,
          interlocutorId: interlocutor.id,
          userName: interlocutor.userName,
          avatar: interlocutor.avatar,
          onlineStatus: interlocutor.onlineStatus,
          lastSeen: interlocutor.lastSeen,
        });
      }}
    >
      <Avatar
        userName={interlocutor.userName}
        avatar={interlocutor.avatar}
        onlineBadge={
          <OnlineBadge
            currentStatus={interlocutor.onlineStatus}
            isMessageRead={isRead}
            messageSender={sender}
            classes={{
              onlineWrapper: styles['online-wrapper'],
              onlineWrapperNotRead: styles['online-wrapper-not-read'],
              online: styles.online,
              zoomIn: styles.zoomIn,
              zoomOut: styles.zoomOut,
            }}
          />
        }
        classes={{
          photoWrapper: styles.photo_wrapper,
          photoInner: styles.photo_inner,
          photoInnerImg: styles.photo_inner_img,
        }}
      />
      <div className={styles.preview}>
        <div className={styles.name_preview}>
          <h3>{interlocutor.userName}</h3>
          {sender === user?.id ? (
            <div
              className={classNames({
                [styles.message_delivered]: !isRead,
                [styles.message_read]: isRead,
              })}
            ></div>
          ) : null}
          <p>{calculateDate(createdAt, 'HH:mm', 'EEE', 'dd.MM.yy')}</p>
        </div>
        <div className={styles.body_wrapper}>
          {interlocutor.onlineStatus === 'online' ? (
            <CSSTransition in={isTyping} timeout={300} unmountOnExit>
              <TypingAnimation
                classes={classNames(styles.notTyping, styles.typingPosition, {
                  [styles.fadeIn]: isTyping,
                  [styles.fadeOut]: !isTyping,
                })}
              />
            </CSSTransition>
          ) : null}
          <CSSTransition in={!isTyping} timeout={300} unmountOnExit>
            <p
              className={classNames(styles.typing, {
                [styles.fadeIn]: !isTyping,
                [styles.fadeOut]: isTyping,
              })}
            >
              {body}
            </p>
          </CSSTransition>
          {unreadMessagesCount ? (
            <div className={styles.badge}>
              {unreadMessagesCount > 9999 ? '9999+' : unreadMessagesCount}
            </div>
          ) : null}
        </div>
      </div>
    </li>
  );
};

export default ChatsPreview;
