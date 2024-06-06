import React, { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useFormikContext } from 'formik';
import { IConversationMessageMode } from '../../types';
import { useTypedSelector } from '../../hooks';
import CONSTANTS from '../../constants';
import * as ActionChat from '../../actions/chatsCreator';
import styles from './ConversationMessageMode.module.scss';

const ConversationMessageMode: FC<IConversationMessageMode> = ({
  setIsTyping,
}) => {
  const {
    currentDialog,
    editMessageMode,
    deleteMessageMode,
    replyMessageMode,
    forwardMessageMode,
  } = useTypedSelector(({ chats }) => chats);
  const { setEditMessageMode, setReplyMessageMode, setForwardMessageMode } =
    bindActionCreators(ActionChat, useDispatch());
  const { handleReset } = useFormikContext();
  const handleClick = () => {
    if (editMessageMode.isEdit) {
      setEditMessageMode({
        isEdit: false,
        message: {},
      });
    }
    if (replyMessageMode.isReply) {
      setReplyMessageMode({ isReply: false, message: {} });
    }
    if (forwardMessageMode.isForward) {
      setForwardMessageMode({
        isChatListOpen: false,
        isForward: false,
        message: {},
      });
    }
    setIsTyping(false);
    handleReset();
  };
  useEffect(() => {
    if (deleteMessageMode.isDelete) {
      handleClick();
    }
  }, [deleteMessageMode.isDelete]);
  useEffect(() => {
    if (editMessageMode.isEdit) {
      setReplyMessageMode({ isReply: false, message: {} });
      setForwardMessageMode({
        isChatListOpen: false,
        isForward: false,
        message: {},
      });
      setIsTyping(false);
      handleReset();
    }
  }, [editMessageMode.isEdit]);
  useEffect(() => {
    if (replyMessageMode.isReply) {
      setEditMessageMode({ isEdit: false, message: {} });
      setForwardMessageMode({
        isChatListOpen: false,
        isForward: false,
        message: {},
      });
      setIsTyping(false);
      handleReset();
    }
  }, [replyMessageMode.isReply]);
  useEffect(() => {
    if (forwardMessageMode.isForward) {
      setEditMessageMode({
        isEdit: false,
        message: {},
      });
      setReplyMessageMode({ isReply: false, message: {} });
      setIsTyping(false);
      handleReset();
    }
  }, [forwardMessageMode.isForward]);
  return (
    <div className={styles.container}>
      <div className={styles.icon}>
        <img
          src={`${CONSTANTS.STATIC_IMAGES_PATH}${
            editMessageMode.isEdit
              ? 'svg/edit.svg'
              : replyMessageMode.isReply
              ? 'svg/reply.svg'
              : 'svg/forward.svg'
          }`}
        />
      </div>
      <div className={styles.message}>
        <h4>
          {editMessageMode.isEdit
            ? 'Edit message'
            : replyMessageMode.isReply
            ? `Reply to ${currentDialog?.userName}`
            : `Forward to ${currentDialog?.userName}`}
        </h4>
        <p>
          {editMessageMode.isEdit
            ? editMessageMode.message.body
            : replyMessageMode.isReply
            ? replyMessageMode.message.body
            : forwardMessageMode.message.body}
        </p>
      </div>
      <div onClick={handleClick} className={styles.cancel} />
    </div>
  );
};

export default ConversationMessageMode;
