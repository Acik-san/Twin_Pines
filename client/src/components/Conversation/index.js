import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import classNames from 'classnames';
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

  const dialog = useMemo(() => currentDialog, [currentDialog]);
  const setTypingStatus = useCallback(status => setIsTyping(status), []);
  const setTouchedStatus = useCallback(status => setIsTouched(status), []);

  useEffect(() => {
    let intervalId;
    if (isTyping) {
      startTypingRequest(currentDialog?.conversationId);
      intervalId = setInterval(
        () => startTypingRequest(currentDialog?.conversationId),
        3000
      );
    } else if (isTouched && !isTyping && textArea.current?.value === '') {
      stopTypingRequest(currentDialog?.conversationId);
    }
    return () => {
      clearInterval(intervalId);
      if (currentDialog && isTyping && textArea.current?.value !== '') {
        stopTypingRequest(currentDialog?.conversationId);
      }
    };
  }, [isTyping, currentDialog?.conversationId]);

  return (
    <div
      className={classNames(styles.container, {
        [styles.none]: !currentDialog,
      })}
    >
      {currentDialog && (
        <>
          <ConversationInfo currentDialog={dialog} />
          <ConversationMessagesList currentDialog={dialog} />
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
