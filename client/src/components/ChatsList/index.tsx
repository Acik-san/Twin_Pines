import React, { useRef } from 'react';
import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import { compareDesc } from 'date-fns';
import { useTypedSelector, useClickOutside } from '../../hooks';
import Avatar from '../Avatar';
import UserProfileOnlineStatus from '../UserProfileOnlineStatus';
import * as ActionChat from '../../actions/chatsCreator';
import styles from './ChatsList.module.scss';

const ChatsList = () => {
  const { messagesPreview, contextMenuTarget, currentDialog } = useTypedSelector(
    ({ chats }) => chats
  );
  const { setForwardMessageMode, chooseCurrentChat } = bindActionCreators(
    ActionChat,
    useDispatch()
  );
  const chatsListRef = useRef(null);
  const handleForwardMessageModeClose = () =>
    setForwardMessageMode({
      isChatListOpen: false,
      isForward: false,
      message: {},
    });
  useClickOutside(chatsListRef, handleForwardMessageModeClose);
  return (
    <div className={styles.chats_list_wrapper}>
      <article className={styles.chats_list_container} ref={chatsListRef}>
        <div className={styles.button_container}>
          <h4 className={styles.title}>Forward to...</h4>
          <button
            className={styles.close_icon}
            onClick={handleForwardMessageModeClose}
          />
        </div>
        <ul className={styles.chats_list}>
          {messagesPreview
            .slice()
            .sort((preview, nextPreview) =>
              compareDesc(
                new Date(preview.createdAt),
                new Date(nextPreview.createdAt)
              )
            )
            .map(({ _id: conversationId, interlocutor }) => (
              <li
                key={conversationId}
                className={styles.chats_list_item}
                onClick={() => {
                  setForwardMessageMode({
                    isChatListOpen: false,
                    isForward: true,
                    message: {
                      messageId: contextMenuTarget?.messageId,
                      sender: contextMenuTarget?.sender,
                      interlocutorId: currentDialog?.interlocutorId,
                      conversationId: contextMenuTarget?.conversationId,
                      body: contextMenuTarget?.body,
                      forwardedFrom: contextMenuTarget?.forwardedFrom,
                      isRead: contextMenuTarget?.isRead,
                      isForwarded: contextMenuTarget?.isForwarded,
                    },
                  });
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
                  classes={{
                    photoWrapper: styles.photo_wrapper,
                    photoInner: styles.photo_inner,
                    photoInnerImg: styles.photo_inner_img,
                  }}
                />
                <div>
                  <h4 className={styles.chats_list_username}>
                    {interlocutor.userName}
                  </h4>
                  <UserProfileOnlineStatus
                    userData={{
                      onlineStatus: interlocutor.onlineStatus,
                      lastSeen: interlocutor.lastSeen,
                    }}
                    classes={{
                      online_status_container: styles.online_status_container,
                      online_status: styles.online_status,
                      last_seen: styles.last_seen,
                    }}
                  />
                </div>
              </li>
            ))}
        </ul>
      </article>
    </div>
  );
};

export default ChatsList;
