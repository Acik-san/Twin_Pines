import React from 'react';
import { useSelector } from 'react-redux';
import { compareDesc } from 'date-fns';
import ChatsPreview from '../ChatsPreview';
import styles from './ChatsPreviewList.module.scss';

const ChatsPreviewList = () => {
  const { messagesPreview } = useSelector(({ chats }) => chats);
  return (
    <ul className={styles['preview-list']}>
      {messagesPreview
        .slice()
        .sort((preview, nextPreview) =>
          compareDesc(
            new Date(preview.createdAt),
            new Date(nextPreview.createdAt)
          )
        )
        .map(
          ({
            _id: conversationId,
            sender,
            interlocutor,
            body,
            createdAt,
            isTyping,
            isRead,
          }) => (
            <ChatsPreview
              key={conversationId}
              conversationId={conversationId}
              sender={sender}
              interlocutor={interlocutor}
              body={body}
              createdAt={createdAt}
              isTyping={isTyping}
              isRead={isRead}
            />
          )
        )}
    </ul>
  );
};

export default ChatsPreviewList;
