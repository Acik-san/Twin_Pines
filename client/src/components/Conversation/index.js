import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import ConversationInfo from '../ConversationInfo';
import ConversationMessagesList from '../ConversationMessagesList';
import ConversationForm from '../forms/ConversationForm';
import * as ActionChat from '../../actions/chatsCreator';
import styles from './Conversation.module.scss';

const Conversation = () => {
  const { currentDialog } = useSelector(({ chats }) => chats);
  const { startTypingRequest, stopTypingRequest } = bindActionCreators(
    ActionChat,
    useDispatch()
  );
  const [isTyping, setIsTyping] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const textArea = useRef(null);

  useEffect(() => {
    let timerId;
    let intervalId;
    if (isTyping) {
      timerId = setTimeout(() => {
        startTypingRequest(currentDialog?.conversationId);
        intervalId = setInterval(
          () => startTypingRequest(currentDialog?.conversationId),
          3000
        );
      }, 1000);
    } else if (isTouched && !isTyping && textArea.current?.value === '') {
      setIsTouched(false);
      timerId = setTimeout(
        () => stopTypingRequest(currentDialog?.conversationId, timerId),
        1000
      );
    }
    return () => {
      clearInterval(intervalId);
      clearTimeout(timerId);
      if (currentDialog && isTyping && textArea.current?.value !== '') {
        const timerId = setTimeout(() => {
          stopTypingRequest(currentDialog?.conversationId, timerId);
        }, 1000);
      }
    };
  }, [isTyping, currentDialog?.conversationId]);

  return (
    <div className={styles.container}>
      {currentDialog && (
        <>
          <ConversationInfo currentDialog={currentDialog} />
          <ConversationMessagesList currentDialog={currentDialog} />
          <ConversationForm
            currentDialog={currentDialog}
            textArea={textArea}
            setIsTyping={setIsTyping}
            setIsTouched={setIsTouched}
          />
        </>
      )}
    </div>
  );
};

export default Conversation;
