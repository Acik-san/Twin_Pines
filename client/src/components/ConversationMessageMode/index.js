import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useFormikContext } from 'formik';
import CONSTANTS from '../../constants';
import * as ActionChat from '../../actions/chatsCreator';
import styles from './ConversationMessageMode.module.scss';

const ConversationMessageMode = () => {
  const { editMessageMode, deleteMessageMode, replyMessageMode } = useSelector(
    ({ chats }) => chats
  );
  const { setEditMessageMode, setReplyMessageMode } = bindActionCreators(
    ActionChat,
    useDispatch()
  );
  const { handleReset } = useFormikContext();

  const handleClick = () => {
    if (editMessageMode.isEdit) {
      setEditMessageMode({
        isEdit: false,
        message: {},
      });
    } else {
      setReplyMessageMode({ isReply: false, message: {} });
    }
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
      handleReset();
    }
  }, [editMessageMode.isEdit]);
  useEffect(() => {
    if (replyMessageMode.isReply) {
      setEditMessageMode({ isEdit: false, message: {} });
      handleReset();
    }
  }, [replyMessageMode.isReply]);
  return (
    <div className={styles.container}>
      <div className={styles.icon}>
        <img
          src={`${CONSTANTS.STATIC_IMAGES_PATH}${
            editMessageMode.isEdit ? 'svg/edit.svg' : 'svg/reply.svg'
          }`}
        />
      </div>
      <div className={styles.message}>
        <h4>{editMessageMode.isEdit ? 'Edit message' : 'Reply message'}</h4>
        <p>
          {editMessageMode.isEdit
            ? editMessageMode.message.body
            : replyMessageMode.isReply
            ? replyMessageMode.message.body
            : null}
        </p>
      </div>
      <div onClick={handleClick} className={styles.cancel} />
    </div>
  );
};

export default ConversationMessageMode;
