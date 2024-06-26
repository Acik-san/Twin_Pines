import React from 'react';
import { compareDesc } from 'date-fns';
import { useTypedSelector } from '../../hooks';
import ChatsPreviewSkeleton from '../ChatsPreviewSkeleton';
import ChatsPreview from '../ChatsPreview';
import styles from './ChatsPreviewList.module.scss';

const ChatsPreviewList = () => {
  const { isChatsFetching, messagesPreview } = useTypedSelector(
    ({ chats }) => chats
  );
  return (
    <ul className={styles['preview-list']}>
      {isChatsFetching && messagesPreview.length === 0
        ? new Array(5)
            .fill(null)
            .map((e, i) => <ChatsPreviewSkeleton key={i} />)
        : messagesPreview
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
