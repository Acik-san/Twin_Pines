import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import classNames from 'classnames';
import {
  getInitials,
  stringToColour,
  calculateMessageDate,
} from '../../utils/usefulFunctions';
import CONSTANTS from '../../constants';
import * as ActionsChats from '../../actions/chatsCreator';
import styles from './ChatsPreviewList.module.scss';

const ChatsPreviewList = () => {
  const { users } = useSelector(({ users }) => users);
  const { messagesPreview, currentDialog } = useSelector(({ chats }) => chats);
  const { chooseCurrentChat } = bindActionCreators(ActionsChats, useDispatch());
  return (
    <ul>
      {messagesPreview.map(
        ({ _id: conversationId, interlocutor, body, createdAt, isTyping }) => (
          <li
            key={conversationId}
            className={classNames(styles.conversation_container, {
              [styles['conversation_container_choosed']]:
                currentDialog?.conversationId === conversationId,
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
                {getInitials([interlocutor.login])}
              </div>
              {interlocutor?.avatar === 'anon.png' ? (
                <img
                  alt='avatar'
                  src={`${CONSTANTS.ANONYM_IMAGE_PATH}`}
                  className={styles.photo_inner_img}
                />
              ) : (
                <img
                  alt='avatar'
                  src={`${CONSTANTS.publicURL}${interlocutor?.avatar}`}
                  className={styles.photo_inner_img}
                />
              )}
            </div>
            <div className={styles.preview}>
              <div className={styles.name_preview}>
                <h3>
                  {interlocutor.login}{' '}
                  {users.find(({ id }) => id === interlocutor.id).status ===
                  'online'
                    ? 'Online'
                    : null}
                </h3>
                <p>{calculateMessageDate(createdAt)}</p>
              </div>
              <p>{isTyping ? 'Typing...' : body}</p>
            </div>
          </li>
        )
      )}
    </ul>
  );
};

export default ChatsPreviewList;
