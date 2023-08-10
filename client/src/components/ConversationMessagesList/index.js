import React, { memo, useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import ConversationMessagesListItem from '../ConversationMessagesListItem';
import * as ActionChat from '../../actions/chatsCreator';
import styles from './ConversationMessagesList.module.scss';

const ConversationMessagesList = memo(props => {
  const { currentDialog } = props;
  const { messages, messagesPreview, limit, offset, haveMore } = useSelector(
    ({ chats }) => chats
  );
  const { getMessagesRequest, setSeenMessageRequest } = bindActionCreators(
    ActionChat,
    useDispatch()
  );
  const chatContainerRef = useRef(null);
  const previousScrollHeightRef = useRef(0);
  const observer = useMemo(
    () =>
      new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const messageId = entry.target.attributes.id.value;
              setSeenMessageRequest(messageId);
            }
          });
        },
        { threshold: 1 }
      ),
    []
  );
  const typingStatus = useMemo(
    () =>
      messagesPreview.find(chat => chat._id === currentDialog?.conversationId)
        ?.isTyping,
    [messagesPreview, currentDialog.conversationId]
  );

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
    previousScrollHeightRef.current = scrollHeight - clientHeight - scrollTop;
    if (chatContainerRef.current.scrollTop === 0 && haveMore) {
      getMessagesRequest({ id: currentDialog.interlocutorId, limit, offset });
    }
  };

  useEffect(() => {
    if (currentDialog !== null && messages.length === 0) {
      getMessagesRequest({ id: currentDialog.interlocutorId, limit, offset });
    }
  }, [currentDialog]);

  useEffect(() => {
    const { scrollHeight, clientHeight } = chatContainerRef.current;
    chatContainerRef.current.scrollTop =
      scrollHeight - clientHeight - previousScrollHeightRef.current;
  }, [messages]);

  useEffect(() => {
    previousScrollHeightRef.current = 0;
  }, [currentDialog.conversationId]);
  return (
    <>
      <ul
        className={styles.dialog}
        ref={chatContainerRef}
        onScroll={handleScroll}
      >
        {messages.map(
          ({ _id, body, sender, createdAt, isRead, conversation }, i) => (
            <ConversationMessagesListItem
              key={_id}
              body={body}
              sender={sender}
              createdAt={createdAt}
              typingStatus={typingStatus}
              isRead={isRead}
              i={i}
              observer={observer}
              id={_id}
            />
          )
        )}
      </ul>
    </>
  );
});

export default ConversationMessagesList;
