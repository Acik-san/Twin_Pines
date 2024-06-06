import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import useTypedSelector from './useTypedSelector';
import * as ActionChat from '../actions/chatsCreator';

const useTypingStatus = () => {
  const { currentDialog } = useTypedSelector(({ chats }) => chats);
  const { startTypingRequest, stopTypingRequest } = bindActionCreators(
    ActionChat,
    useDispatch()
  );

  const [isTyping, setIsTyping] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const textArea = useRef<HTMLTextAreaElement | null>(null);

  const setTypingStatus = useCallback(
    (status: boolean) => setIsTyping(status),
    []
  );
  const setTouchedStatus = useCallback(
    (status: boolean) => setIsTouched(status),
    []
  );

  useEffect(() => {
    let intervalId: number | NodeJS.Timeout;
    if (currentDialog && isTouched && isTyping) {
      startTypingRequest(currentDialog?.conversationId);
      intervalId = setInterval(
        () => startTypingRequest(currentDialog?.conversationId),
        3000
      );
    }
    if (
      currentDialog &&
      isTouched &&
      !isTyping &&
      textArea.current?.value === ''
    ) {
      stopTypingRequest(currentDialog?.conversationId);
    }
    return () => {
      clearInterval(intervalId);
      if (
        currentDialog &&
        isTouched &&
        isTyping &&
        textArea.current?.value !== ''
      ) {
        stopTypingRequest(currentDialog?.conversationId);
        setIsTyping(false);
        setIsTouched(false);
      }
    };
  }, [isTouched, isTyping, currentDialog?.conversationId]);

  return { textArea, setTypingStatus, setTouchedStatus };
};

export default useTypingStatus;
