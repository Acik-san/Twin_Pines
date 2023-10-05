import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { CSSTransition } from 'react-transition-group';
import classNames from 'classnames';
import { ChatsPreviewPropTypes } from '../../propTypes';
import Avatar from '../Avatar';
import OnlineBadge from '../OnlineBadge';
import TypingAnimation from '../TypingAnimation';
import { calculateMessageDate } from '../../utils/usefulFunctions';
import * as ActionsChats from '../../actions/chatsCreator';
import styles from './ChatsPreview.module.scss';

const ChatsPreview = props => {
  const {
    conversationId,
    sender,
    interlocutor,
    body,
    createdAt,
    isTyping,
    isRead,
  } = props;
  const { user, users } = useSelector(({ users }) => users);
  const { unreadMessages, currentDialog, editMessageMode } = useSelector(
    ({ chats }) => chats
  );
  const { chooseCurrentChat, setEditMessageMode } = bindActionCreators(
    ActionsChats,
    useDispatch()
  );

  const unreadMessagesCount = useMemo(
    () => unreadMessages.find(message => message._id === conversationId)?.count,
    [unreadMessages, conversationId]
  );

  const currentStatus = useMemo(
    () => users.find(({ id }) => id === interlocutor.id)?.status,
    [users, interlocutor.id]
  );

  return (
    <li
      className={classNames(styles.conversation_container, {
        [styles.conversation_container_choosed]:
          currentDialog?.conversationId === conversationId,
        [styles.not_read]: sender !== user.id && unreadMessagesCount,
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
        chooseCurrentChat({
          conversationId,
          interlocutorId: interlocutor.id,
          login: interlocutor.login,
          avatar: interlocutor.avatar,
        });
      }}
    >
      <Avatar
        login={interlocutor.login}
        avatar={interlocutor.avatar}
        onlineBadge={
          <OnlineBadge
            currentStatus={currentStatus}
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
          <h3>{interlocutor.login}</h3>
          {sender === user.id ? (
            <div
              className={classNames({
                [styles.message_delivered]: !isRead,
                [styles.message_read]: isRead,
              })}
            ></div>
          ) : null}
          <p>{calculateMessageDate(createdAt)}</p>
        </div>
        <div className={styles.body_wrapper}>
          {currentStatus === 'online' ? (
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

ChatsPreview.propTypes = ChatsPreviewPropTypes;

export default ChatsPreview;
