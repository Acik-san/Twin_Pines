import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { format, isSameDay, parseISO } from 'date-fns';
import classNames from 'classnames';
import * as ActionChat from '../../actions/chatsCreator';
import styles from './ConversationMessagesList.module.scss';

const ConversationMessagesList = props => {
  const { currentDialog } = props;
  const { user } = useSelector(({ users }) => users);
  const { messages, messagesPreview } = useSelector(({ chats }) => chats);
  const { getMessagesRequest } = bindActionCreators(ActionChat, useDispatch());
  useEffect(() => {
    if (currentDialog !== null && messages.length === 0) {
      getMessagesRequest(currentDialog.interlocutorId);
    }
  }, [currentDialog]);
  useEffect(() => {
    if (currentDialog) {
      const dialog = document.getElementById('dialog');
      dialog.scrollTop = dialog.scrollHeight;
    }
  }, [messages]);
  return (
    <ul className={styles.dialog} id='dialog'>
      {messages.map(({ _id, body, sender, createdAt }, i) => (
        <li
          key={_id}
          className={classNames({
            [styles['my_message']]: user.id === sender,
            [styles.message]: user.id !== sender,
          })}
        >
          {i === 0 ? (
            <div className={styles.date}>
              {format(parseISO(messages[i].createdAt), 'dd.MM')}
            </div>
          ) : null}
          <div
            className={classNames({
              [styles['my_message_body']]: user.id === sender,
              [styles['message_body']]: user.id !== sender,
            })}
          >
            <p>{body}</p>
            <div className={styles.a}> </div>
            <span>{format(parseISO(createdAt), 'HH:mm')}</span>
          </div>
          {messages[i] !== messages[messages.length - 1] &&
          !isSameDay(
            parseISO(createdAt),
            parseISO(messages[i + 1].createdAt)
          ) ? (
            <div className={styles.date}>
              {format(parseISO(messages[i + 1].createdAt), 'dd.MM')}
            </div>
          ) : null}
          {i === messages.length - 1 &&
          messagesPreview.find(
            chat => chat._id === currentDialog?.conversationId
          )?.isTyping ? (
            <div style={{ textAlign: 'left', marginLeft: '20px' }}>
              {currentDialog.login} is typing...
            </div>
          ) : null}
        </li>
      ))}
    </ul>
  );
};

export default ConversationMessagesList;
