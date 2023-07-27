import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import classNames from 'classnames';
import TypingAnimation from '../TypingAnimation';
import {
  getInitials,
  stringToColour,
  calculateMessageDate,
} from '../../utils/usefulFunctions';
import CONSTANTS from '../../constants';
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
  const { messages, messagesPreview, unreadMessages, currentDialog } =
    useSelector(({ chats }) => chats);
  const { chooseCurrentChat } = bindActionCreators(ActionsChats, useDispatch());
  const [previousStatus, setPreviousStatus] = useState('offline');
  const [previousTypingStatus, setPreviousTypingStatus] = useState(false);

  const unreadMessagesCount = useMemo(
    () => unreadMessages.find(message => message._id === conversationId)?.count,
    [unreadMessages, conversationId]
  );

  const currentStatus = useMemo(
    () => users.find(({ id }) => id === interlocutor.id)?.status,
    [users, interlocutor.id]
  );
  const currentTypingStatus = useMemo(
    () =>
      messagesPreview.find(({ interlocutor: { id } }) => id === interlocutor.id)
        .isTyping,
    [messagesPreview, interlocutor.id]
  );

  useEffect(() => {
    setPreviousStatus(prevStatus => {
      if (currentStatus === 'online' && prevStatus === 'offline') {
        return currentStatus;
      }
      return prevStatus;
    });
  }, [currentStatus]);

  useEffect(() => {
    setPreviousTypingStatus(prevStatus => {
      if (currentTypingStatus && !prevStatus) {
        return currentTypingStatus;
      }
      return prevStatus;
    });
  }, [currentTypingStatus]);

  return (
    <li
      className={classNames(styles.conversation_container, {
        [styles.conversation_container_choosed]:
          currentDialog?.conversationId === conversationId,
        [styles.not_read]: sender !== user.id && unreadMessagesCount,
      })}
      onClick={() => {
        chooseCurrentChat({
          conversationId,
          interlocutorId: interlocutor.id,
          login: interlocutor.login,
          avatar: interlocutor.avatar,
        });
      }}
    >
      <div className={styles.photo_wrapper}>
        <div
          className={styles.photo_inner}
          style={{
            backgroundColor: stringToColour(`${interlocutor.login}`),
          }}
        >
          <div
            className={classNames(styles['online-wrapper'], {
              [styles.zoomIn]: currentStatus === 'online',
              [styles.zoomOut]:
                currentStatus === 'offline' && previousStatus === 'online',
              [styles['online-wrapper-not-read']]: !isRead,
            })}
          >
            <div className={styles.online}></div>
          </div>
          {getInitials([interlocutor.login])}
        </div>
        <img
          alt='avatar'
          src={`${
            interlocutor?.avatar === 'anon.png'
              ? CONSTANTS.ANONYM_IMAGE_PATH
              : CONSTANTS.publicURL + interlocutor?.avatar
          }`}
          className={styles.photo_inner_img}
        />
      </div>
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
          <TypingAnimation
            classes={classNames(styles.notTyping, styles.typingPosition, {
              [styles.fadeIn]: previousTypingStatus && isTyping,
              [styles.fadeOut]: previousTypingStatus && !isTyping,
            })}
          />
          <p
            className={classNames(styles.typing, {
              [styles.fadeIn]: previousTypingStatus && !isTyping,
              [styles.fadeOut]: previousTypingStatus && isTyping,
            })}
          >
            {body}
          </p>
          {unreadMessagesCount ? (
            <div className={styles.badge}>{unreadMessagesCount}</div>
          ) : null}
        </div>
      </div>
    </li>
  );
};

export default ChatsPreview;
