import React, { FC, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import { format, isSameDay, parseISO } from 'date-fns';
import { CSSTransition } from 'react-transition-group';
import classNames from 'classnames';
import { IConversationMessagesListItem } from '../../types';
import { useTypedSelector } from '../../hooks';
import TypingAnimation from '../TypingAnimation';
import { getMessages } from '../../api';
import * as ActionChat from '../../actions/chatsCreator';
import * as ActionCreators from '../../actions/creators';
import styles from './ConversationMessagesListItem.module.scss';

const ConversationMessagesListItem: FC<IConversationMessagesListItem> = ({
  body,
  sender,
  createdAt,
  typingStatus,
  isRead,
  isEdited,
  isOriginal,
  isForwarded,
  i,
  id,
  conversationId,
  observer,
  showContextMenu,
  repliedMessage,
  replyOn,
  setReplyOn,
  replyObserver,
  forwardedFrom,
}) => {
  const { user } = useTypedSelector(({ users }) => users);
  const { messages, currentDialog, limit, offset } = useTypedSelector(
    ({ chats }) => chats
  );
  const { setContextMenuTarget, getMessagesSuccess, getMessagesError } =
    bindActionCreators(ActionChat, useDispatch());
  const { cleanError } = bindActionCreators(ActionCreators, useDispatch());

  const handleRepliedMessageClick = async (offset: number) => {
    try {
      if (repliedMessage) {
        let currentOffset = offset;
        const repliedMessageElement = document.getElementById(
          repliedMessage._id
        );
        if (repliedMessageElement) {
          repliedMessageElement.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          });
          setReplyOn(repliedMessage._id);
        } else {
          const {
            data: {
              data: { messages, haveMore },
            },
          } = await getMessages({
            id: currentDialog!.interlocutorId,
            limit,
            offset: currentOffset,
          });
          await getMessagesSuccess({ messages, haveMore });
          if (haveMore) {
            currentOffset += messages.length;
            handleRepliedMessageClick(currentOffset);
          }
        }
      }
    } catch (err) {
      if (err instanceof Error) {
        await getMessagesError({ message: err.message });
      }
    }
  };

  useEffect(() => {
    let messageItem: HTMLElement | null = null;
    if (user?.id !== sender && !isRead) {
      messageItem = document.getElementById(id);
      if (messageItem) {
        observer.observe(messageItem);
      }
    }
    return () => {
      if (messageItem) {
        observer.unobserve(messageItem);
      }
    };
  }, [isRead]);

  useEffect(() => {
    let messageItem: HTMLElement | null = null;
    if (replyOn === id) {
      messageItem = document.getElementById(id);
      if (messageItem) {
        replyObserver.observe(messageItem);
      }
    }
    return () => {
      if (messageItem) {
        replyObserver.unobserve(messageItem);
      }
    };
  }, [replyOn]);
  return (
    <>
      {i === 0 ? (
        <div className={styles.date}>
          {format(parseISO(messages[i].createdAt), 'dd.MM')}
        </div>
      ) : null}
      <CSSTransition
        in={id === replyOn}
        timeout={2000}
        classNames={{
          exit: styles['background-color-exit'],
          exitActive: styles['background-color-exit-active'],
        }}
      >
        <li
          className={classNames({
            [styles['my_message']]: user?.id === sender,
            [styles.message]: user?.id !== sender,
            [styles.not_read]: user?.id !== sender && !isRead,
          })}
        >
          <div
            id={id}
            className={classNames({
              [styles['my_message_body']]: user?.id === sender,
              [styles['message_body']]: user?.id !== sender,
            })}
            style={{ minWidth: isEdited ? '122px' : '70px' }}
            onContextMenu={e => {
              setContextMenuTarget({
                messageId: id,
                prevMessage: messages[i - 1],
                numberOfMessages: messages.length,
                sender,
                body,
                forwardedFrom: forwardedFrom,
                conversationId,
                isRead,
                isOriginal,
                isForwarded,
              });
              showContextMenu(e);
            }}
          >
            {repliedMessage ? (
              <div
                className={styles.body_wrapper}
                onClick={() => {
                  if (
                    repliedMessage.body ||
                    repliedMessage.forwardedFrom?.body
                  ) {
                    handleRepliedMessageClick(offset);
                  }
                }}
              >
                <div className={styles.reply_border} />
                <div className={styles.reply_content}>
                  {repliedMessage.forwardedFrom?.sender ? (
                    <h3 className={styles.sender_name}>
                      Forwarded from {repliedMessage.forwardedFrom?.userName}
                    </h3>
                  ) : (
                    repliedMessage.sender && (
                      <h3 className={styles.sender_name}>
                        {repliedMessage.sender === user?.id
                          ? user?.userName
                          : currentDialog?.userName}
                      </h3>
                    )
                  )}
                  {repliedMessage.body ? (
                    <p className={styles.replied_message_body}>
                      {repliedMessage.body}
                    </p>
                  ) : (
                    <p className={styles.deleted_message}>Deleted message</p>
                  )}
                </div>
              </div>
            ) : null}
            {forwardedFrom ? (
              <div className={styles.forwardFrom_container}>
                {forwardedFrom.sender && (
                  <h3 className={styles.forwardFrom_title}>
                    Forwarded from {forwardedFrom.userName}
                  </h3>
                )}
              </div>
            ) : null}
            <p>{body}</p>
            <span>
              {isEdited ? <div className={styles.message_edited}></div> : null}
              {format(parseISO(createdAt), 'HH:mm')}
              {user?.id === sender ? (
                <div
                  className={classNames({
                    [styles.message_delivered]: !isRead,
                    [styles.message_read]: isRead,
                  })}
                />
              ) : null}
            </span>
          </div>
        </li>
      </CSSTransition>
      {messages[i] !== messages[messages.length - 1] &&
      !isSameDay(parseISO(createdAt), parseISO(messages[i + 1].createdAt)) ? (
        <div className={styles.date}>
          {format(parseISO(messages[i + 1].createdAt), 'dd.MM')}
        </div>
      ) : null}
      {i === messages.length - 1 ? (
        <CSSTransition in={typingStatus} timeout={300} unmountOnExit>
          <TypingAnimation
            classes={classNames(styles.notTyping, {
              [styles.fadeInLeft]: typingStatus,
              [styles.fadeOutLeft]: !typingStatus,
            })}
          />
        </CSSTransition>
      ) : null}
    </>
  );
};

export default ConversationMessagesListItem;
