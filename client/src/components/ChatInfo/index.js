import React, { useRef } from 'react';
import { bindActionCreators } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { useClickOutside, useMenuForChat } from '../../hooks';
import Avatar from '../Avatar';
import UserProfileOnlineStatus from '../UserProfileOnlineStatus';
import * as ActionChat from '../../actions/chatsCreator';
import styles from './ChatInfo.module.scss';

const ChatInfo = () => {
  const { currentDialog } = useSelector(({ chats }) => chats);
  const { setChatInfoOpen } = bindActionCreators(ActionChat, useDispatch());
  const chatInfoRef = useRef(null);
  const chatMenuProps = useMenuForChat();
  useClickOutside(chatInfoRef, () => setChatInfoOpen(false));
  return (
    <div className={styles.chat_info_wrapper}>
      <article className={styles.chat_info} ref={chatInfoRef}>
        <div className={styles.info_container}>
          <Avatar
            userName={currentDialog.userName}
            avatar={currentDialog.avatar}
            classes={{
              photoWrapper: styles.photo_wrapper,
              photoInner: styles.photo_inner,
              photoInnerImg: styles.photo_inner_img,
            }}
          />
          <div>
            <h4 className={styles.chat_info_username}>
              {currentDialog.userName}
            </h4>
            <UserProfileOnlineStatus
              userData={{
                onlineStatus: currentDialog.onlineStatus,
                lastSeen: currentDialog.lastSeen,
              }}
              classes={{
                online_status_container: styles.online_status_container,
                online_status: styles.online_status,
                last_seen: styles.last_seen,
              }}
            />
          </div>
        </div>
        <ul className={styles.menu_list}>
          {chatMenuProps.map(({ id, iconName, propertyName, handleClick }) => (
            <li
              key={id}
              className={styles.menu_list_item}
              onClick={e => {
                e.stopPropagation();
                handleClick();
              }}
            >
              <div className={styles[iconName]} />
              <h2 className={styles.propertyName}>{propertyName}</h2>
            </li>
          ))}
        </ul>
      </article>
    </div>
  );
};

export default ChatInfo;
