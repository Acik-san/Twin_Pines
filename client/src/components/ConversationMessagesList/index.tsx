import React, { FC, memo, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { CSSTransition } from 'react-transition-group';
import { Skeleton } from '@mui/material';
import { IConversationMessagesList } from '../../types';
import { useTypedSelector, useContextMenu } from '../../hooks';
import ContextMenu from '../ContextMenu';
import Confirm from '../Confirm';
import ConfirmButton from '../ConfirmButton';
import ConversationMessagesListItem from '../ConversationMessagesListItem';
import * as ActionChat from '../../actions/chatsCreator';
import styles from './ConversationMessagesList.module.scss';

const ConversationMessagesList: FC<IConversationMessagesList> = memo(
  ({ currentDialog }) => {
    const {
      isMessagesFetching,
      messages,
      messagesPreview,
      limit,
      offset,
      haveMore,
      deleteMessageMode,
    } = useTypedSelector(({ chats }) => chats);
    const {
      getMessagesRequest,
      setSeenMessageRequest,
      setDeleteMessageMode,
      deleteMessageRequest,
    } = bindActionCreators(ActionChat, useDispatch());
    const {
      contextMenuRef,
      contextMenuPosition,
      contextMenuVisible,
      hideContextMenu,
      showContextMenu,
      propsMenu,
    } = useContextMenu();
    const chatContainerRef = useRef<HTMLUListElement>(null);
    const previousScrollHeightRef = useRef(0);
    const thresholdSets = useMemo(
      () =>
        Array.from(
          { length: Math.ceil(1 / 0.01) + 1 },
          (_, index) => index * 0.01
        ),
      []
    );

    const handleDeleteMessageMod = () =>
      setDeleteMessageMode({ isDelete: false, message: {} });

    const handleDeleteClick = () => {
      deleteMessageRequest({
        messageId: deleteMessageMode.message.messageId,
        conversationId: deleteMessageMode.message.conversationId,
        prevMessage: deleteMessageMode.message.prevMessage,
        numberOfMessages: deleteMessageMode.message.numberOfMessages,
        isRead: deleteMessageMode.message.isRead,
        isOriginal: deleteMessageMode.message.isOriginal,
        isForwarded: deleteMessageMode.message.isForwarded,
      });
      handleDeleteMessageMod();
    };
    const [replyOn, setReplyOn] = useState<string | null>(null);

    const replyObserver = useMemo(
      () =>
        new IntersectionObserver(entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              setReplyOn(null);
            }
          });
        }),
      []
    );

    const observer = useMemo(
      () =>
        new IntersectionObserver(
          entries => {
            entries.forEach(entry => {
              const visiblePct = Math.floor(entry.intersectionRatio * 100);
              if (visiblePct > 48 && visiblePct <= 100) {
                const messageId =
                  entry.target.getAttribute(
                    'id'
                  ); /*entry.target.attributes.id.value;*/
                if (messageId) {
                  setSeenMessageRequest(messageId);
                }
              }
            });
          },
          { threshold: thresholdSets }
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
      if (chatContainerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } =
          chatContainerRef.current;
        previousScrollHeightRef.current =
          scrollHeight - clientHeight - scrollTop;
        if (scrollTop === 0 && haveMore) {
          getMessagesRequest({
            id: currentDialog.interlocutorId,
            limit,
            offset,
          });
        }
      }
    };

    useEffect(() => {
      if (currentDialog !== null && messages.length === 0) {
        getMessagesRequest({ id: currentDialog.interlocutorId, limit, offset });
      }
    }, [currentDialog]);

    useEffect(() => {
      if (chatContainerRef.current) {
        const { scrollHeight, clientHeight } = chatContainerRef.current;
        chatContainerRef.current.scrollTop =
          scrollHeight - clientHeight - previousScrollHeightRef.current;
      }
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
          <CSSTransition
            in={contextMenuVisible}
            timeout={300}
            classNames={{
              enter: styles['fade-enter'],
              enterActive: styles['fade-enter-active'],
              exit: styles['fade-exit'],
              exitActive: styles['fade-exit-active'],
            }}
            unmountOnExit
          >
            <ContextMenu
              contextMenuRef={contextMenuRef}
              contextMenuPosition={contextMenuPosition}
              hideContextMenu={hideContextMenu}
              propsMenu={propsMenu}
            />
          </CSSTransition>
          <CSSTransition
            in={deleteMessageMode.isDelete}
            timeout={300}
            classNames={{
              enter: styles['fade-enter'],
              enterActive: styles['fade-enter-active'],
              exit: styles['fade-exit'],
              exitActive: styles['fade-exit-active'],
            }}
            unmountOnExit
          >
            <Confirm
              messageText='Do you want to delete this message ?'
              handleClick={handleDeleteMessageMod}
            >
              <ConfirmButton
                buttonText='Cancel'
                handleClick={handleDeleteMessageMod}
              />
              <ConfirmButton
                buttonText='Delete'
                handleClick={handleDeleteClick}
              />
            </Confirm>
          </CSSTransition>
          {isMessagesFetching && messages.length === 0 ? (
            <>
              <Skeleton className={styles.message_body} />
              <Skeleton className={styles.my_message_body} />
              <Skeleton className={styles.message_body} />
              <Skeleton className={styles.my_message_body} />
            </>
          ) : (
            messages.map(
              (
                {
                  _id,
                  body,
                  sender,
                  createdAt,
                  isRead,
                  isEdited,
                  isOriginal,
                  isForwarded,
                  conversation,
                  repliedMessage,
                  forwardedFrom,
                },
                i: number
              ) => (
                <ConversationMessagesListItem
                  key={_id}
                  body={body}
                  sender={sender}
                  createdAt={createdAt}
                  typingStatus={typingStatus || false}
                  isRead={isRead}
                  isEdited={isEdited}
                  isOriginal={isOriginal}
                  isForwarded={isForwarded}
                  i={i}
                  observer={observer}
                  id={_id}
                  conversationId={conversation}
                  showContextMenu={showContextMenu}
                  repliedMessage={repliedMessage}
                  replyOn={replyOn}
                  setReplyOn={setReplyOn}
                  replyObserver={replyObserver}
                  forwardedFrom={forwardedFrom}
                />
              )
            )
          )}
        </ul>
      </>
    );
  }
);

export default ConversationMessagesList;
