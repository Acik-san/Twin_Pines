import React from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ConversationInfoPropTypes } from '../../propTypes';
import UserProfileOnlineStatus from '../UserProfileOnlineStatus';
import * as ActionChat from '../../actions/chatsCreator';
import styles from './ConversationInfo.module.scss';

const ConversationInfo = props => {
  const { currentDialog } = props;
  const { clearCurrentChat, setChatInfoOpen } = bindActionCreators(
    ActionChat,
    useDispatch()
  );
  const handleChatInfoOpen = () => setChatInfoOpen(true);
  return (
    <div className={styles['chat_info']} onClick={handleChatInfoOpen}>
      <label
        className={styles['back-button']}
        onClick={e => e.stopPropagation()}
      >
        <button
          className={styles['button-none']}
          onClick={() => clearCurrentChat()}
        />
      </label>
      <div className={styles.wrapper}>
        <h3>{currentDialog.userName}</h3>
        {currentDialog.onlineStatus && (
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
        )}
      </div>
      <button
        className={styles['dots-menu-button']}
        onClick={e => {
          e.stopPropagation();
          handleChatInfoOpen();
        }}
      />
    </div>
  );
};

ConversationInfo.propTypes = ConversationInfoPropTypes;

export default ConversationInfo;
