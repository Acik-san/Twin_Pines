import React from 'react';
import classNames from 'classnames';
import { useTypingStatus } from '../../hooks';
import ConversationInfo from '../ConversationInfo';
import ConversationMessagesList from '../ConversationMessagesList';
import ConversationForm from '../forms/ConversationForm';
import styles from './Conversation.module.scss';

const Conversation = () => {
  const { textArea, dialog, setTypingStatus, setTouchedStatus } =
    useTypingStatus();
  return (
    <div
      className={classNames(styles.container, {
        [styles.none]: !dialog,
      })}
    >
      {dialog && (
        <>
          <ConversationInfo currentDialog={dialog} />
          <ConversationMessagesList currentDialog={dialog} />
          <ConversationForm
            currentDialog={dialog}
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
