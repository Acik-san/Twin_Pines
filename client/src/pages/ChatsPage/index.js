import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import FixedBackground from '../../components/FixedBackground';
import Header from '../../components/Header';
import Chats from '../../components/Chats';
import Conversation from '../../components/Conversation';
import * as ActionUser from '../../actions/userCreators';
import * as ActionChat from '../../actions/chatsCreator';
import styles from './ChatsPage.module.scss';

const ChatsPage = () => {
  const { user, users } = useSelector(({ users }) => users);
  const { messagesPreview } = useSelector(({ chats }) => chats);
  const { getUsersRequest, getOnlineUsersRequest } = bindActionCreators(
    ActionUser,
    useDispatch()
  );
  const {
    getChatsRequest,
    clearCurrentChat,
    subscribeChatsRequest,
    setEditMessageMode,
    setDeleteMessageMode,
    setReplyMessageMode,
    setContextMenuTarget,
  } = bindActionCreators(ActionChat, useDispatch());
  useEffect(() => {
    if (users.length === 0) {
      getUsersRequest();
    }
    if (messagesPreview.length === 0) {
      getChatsRequest();
    }
    return () => {
      clearCurrentChat();
      setContextMenuTarget(null);
      setEditMessageMode({ isEdit: false, message: {} });
      setDeleteMessageMode({ isDelete: false, message: {} });
      setReplyMessageMode({ isReply: false, message: {} });
    };
  }, []);
  useEffect(() => {
    if (user && messagesPreview.length !== 0) {
      subscribeChatsRequest({
        userId: user.id,
        conversations: messagesPreview.map(({ _id, interlocutor: { id } }) => ({
          conversationId: _id,
          interlocutorId: id,
        })),
      });
      getOnlineUsersRequest(user.id);
    }
  }, [messagesPreview.length]);
  return (
    <>
      <FixedBackground />
      <Header />
      <section className={styles.section}>
        <Chats />
        <Conversation />
      </section>
    </>
  );
};

export default ChatsPage;
