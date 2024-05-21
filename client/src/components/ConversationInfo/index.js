import React, { memo, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ConversationInfoPropTypes } from '../../propTypes';
import * as ActionChat from '../../actions/chatsCreator';
import styles from './ConversationInfo.module.scss';

const ConversationInfo = memo(props => {
  const { currentDialog } = props;
  const { users } = useSelector(({ users }) => users);
  const { clearCurrentChat } = bindActionCreators(ActionChat, useDispatch());
  const onlineStatus = useMemo(
    () => users.find(({ id }) => id === currentDialog.interlocutorId).status,
    [currentDialog, users]
  );
  return (
    <div className={styles['chat_info']}>
      <label className={styles['back-button']}>
        <button
          className={styles['button-none']}
          onClick={() => clearCurrentChat()}
        ></button>
      </label>
      <div className={styles.wrapper}>
        <h3>{currentDialog.userName}</h3>
        <p>{onlineStatus}</p>
      </div>
    </div>
  );
});

ConversationInfo.propTypes = ConversationInfoPropTypes;

export default ConversationInfo;
