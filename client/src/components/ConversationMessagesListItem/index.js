import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { format, isSameDay, parseISO } from 'date-fns';
import classNames from 'classnames';
import TypingAnimation from '../TypingAnimation';
import styles from './ConversationMessagesListItem.module.scss';

const ConversationMessagesListItem = props => {
  const {
    body,
    sender,
    createdAt,
    typingStatus,
    conversation,
    isRead,
    i,
    id,
    observer,
  } = props;
  const { user } = useSelector(({ users }) => users);
  const { messagesPreview, messages } = useSelector(({ chats }) => chats);
  const [previousTypingStatus, setPreviousTypingStatus] = useState(false);
  const currentTypingStatus = useMemo(
    () => messagesPreview.find(({ _id }) => _id === conversation)?.isTyping,
    [messagesPreview, conversation]
  );
  useEffect(() => {
    setPreviousTypingStatus(prevStatus => {
      if (currentTypingStatus && !prevStatus) {
        return currentTypingStatus;
      }
      return prevStatus;
    });
  }, [currentTypingStatus]);

  useEffect(() => {
    let messageItem;
    if (user.id !== sender && !isRead) {
      messageItem = document.getElementById(id);
      observer.observe(messageItem);
    }
    return () => {
      if (messageItem) {
        observer.unobserve(messageItem);
      }
    };
  }, []);

  return (
    <li
      className={classNames({
        [styles['my_message']]: user.id === sender,
        [styles.message]: user.id !== sender,
        [styles.not_read]: user.id !== sender && !isRead,
      })}
    >
      {i === 0 ? (
        <div className={styles.date}>
          {format(parseISO(messages[i].createdAt), 'dd.MM')}
        </div>
      ) : null}
      <div
        id={id}
        className={classNames({
          [styles['my_message_body']]: user.id === sender,
          [styles['message_body']]: user.id !== sender,
        })}
      >
        <p>{body}</p>
        <span>
          {format(parseISO(createdAt), 'HH:mm')}
          {user.id === sender ? (
            <div
              className={classNames({
                [styles.message_delivered]: !isRead,
                [styles.message_read]: isRead,
              })}
            ></div>
          ) : null}
        </span>
      </div>
      {messages[i] !== messages[messages.length - 1] &&
      !isSameDay(parseISO(createdAt), parseISO(messages[i + 1].createdAt)) ? (
        <div className={styles.date}>
          {format(parseISO(messages[i + 1].createdAt), 'dd.MM')}
        </div>
      ) : null}
      {i === messages.length - 1 ? (
        <TypingAnimation
          classes={classNames(styles.notTyping, {
            [styles.fadeInLeft]: previousTypingStatus && typingStatus,
            [styles.fadeOutLeft]: previousTypingStatus && !typingStatus,
          })}
        />
      ) : null}
    </li>
  );
};

export default ConversationMessagesListItem;
