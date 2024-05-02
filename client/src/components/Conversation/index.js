import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { useTypingStatus } from '../../hooks';
import ConversationInfo from '../ConversationInfo';
import ConversationMessagesList from '../ConversationMessagesList';
import ConversationForm from '../forms/ConversationForm';
import * as ActionUser from '../../actions/userCreators';
import styles from './Conversation.module.scss';

const Conversation = () => {
  const { currentDialog } = useSelector(({ chats }) => chats);
  const { getOnlineStatusRequest } = bindActionCreators(
    ActionUser,
    useDispatch()
  );
  const { textArea, setTypingStatus, setTouchedStatus } = useTypingStatus();
  useEffect(() => {
    if (currentDialog !== null && !currentDialog.onlineStatus) {
      getOnlineStatusRequest(currentDialog.interlocutorId);
    }
  }, [currentDialog]);
  return (
    <div
      className={classNames(styles.container, {
        [styles.none]: !currentDialog,
      })}
    >
      {currentDialog && (
        <>
          <ConversationInfo currentDialog={currentDialog} />
          <ConversationMessagesList currentDialog={currentDialog} />
          <ConversationForm
            currentDialog={currentDialog}
            textArea={textArea}
            setIsTyping={setTypingStatus}
            setIsTouched={setTouchedStatus}
          />
        </>
      )}
    </div>
  );
};

export default Conversation;
