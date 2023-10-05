import React, { useEffect } from 'react';
import { useFormikContext } from 'formik';
import { ConversationEditMessagePropTypes } from '../../propTypes';
import CONSTANTS from '../../constants';
import styles from './ConversationEditMessage.module.scss';

const ConversationEditMessage = props => {
  const { editMessageMode, setEditMessageMode, deleteMessageMode } = props;
  const { handleReset } = useFormikContext();
  const handleClick = () => {
    setEditMessageMode({
      isEdit: false,
      message: {},
    });
    handleReset();
  };
  useEffect(() => {
    if (deleteMessageMode.isDelete) {
      handleClick();
    }
  }, [deleteMessageMode.isDelete]);
  return (
    <div className={styles.container}>
      <div className={styles.edit_img}>
        <img src={`${CONSTANTS.STATIC_IMAGES_PATH}svg/edit.svg`} />
      </div>
      <div className={styles.edit_message}>
        <h4>Editing</h4>
        <p>{editMessageMode.message.body}</p>
      </div>
      <div onClick={handleClick} className={styles.stop_editing} />
    </div>
  );
};

ConversationEditMessage.propTypes = ConversationEditMessagePropTypes;

export default ConversationEditMessage;
