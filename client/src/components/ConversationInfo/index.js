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
  return (
    <div className={styles['chat_info']} onClick={e => setChatInfoOpen(true)}>
      <label
        className={styles['back-button']}
        onClick={e => e.stopPropagation()}
      >
        <button
          className={styles['button-none']}
          onClick={e => clearCurrentChat()}
        ></button>
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
    </div>
  );
};

ConversationInfo.propTypes = ConversationInfoPropTypes;

export default ConversationInfo;
