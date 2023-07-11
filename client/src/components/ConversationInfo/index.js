import React from 'react';
import { useSelector } from 'react-redux';
import styles from './ConversationInfo.module.scss';

const ConversationInfo = props => {
  const { currentDialog } = props;
  const { users } = useSelector(({ users }) => users);
  return (
    <div className={styles['chat_info']}>
      <h3>{currentDialog.login}</h3>
      <p>
        {users.find(({ id }) => id === currentDialog.interlocutorId).status}
      </p>
    </div>
  );
};

export default ConversationInfo;
