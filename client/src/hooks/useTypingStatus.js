import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ActionChat from '../actions/chatsCreator';

const useTypingStatus = () => {
  const { currentDialog } = useSelector(({ chats }) => chats);
  const { startTypingRequest, stopTypingRequest } = bindActionCreators(
    ActionChat,
    useDispatch()
  );

  const [isTyping, setIsTyping] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const textArea = useRef(null);

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

  return { textArea, setTypingStatus, setTouchedStatus };
};

export default useTypingStatus;
