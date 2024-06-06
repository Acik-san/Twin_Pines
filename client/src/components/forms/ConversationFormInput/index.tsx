import React, { FC, useEffect } from 'react';
import { useFormikContext, useField } from 'formik';
import { IConversationFormInput } from '../../../types';
import { useTypedSelector } from '../../../hooks';
import TextareaAutosize from 'react-textarea-autosize';
import styles from './ConversationFormInput.module.scss';

const ConversationFormInput: FC<IConversationFormInput> = ({
  name,
  textArea,
  setIsTyping,
  setIsTouched,
}) => {
  const {
    currentDialog,
    editMessageMode,
    replyMessageMode,
    forwardMessageMode,
  } = useTypedSelector(({ chats }) => chats);
  const { setFieldValue, handleReset, handleSubmit } = useFormikContext();
  const [field] = useField(name);
  useEffect(() => {
    if (editMessageMode.isEdit) {
      setFieldValue(name, editMessageMode.message.body);
    }
  }, [editMessageMode.message]);
  useEffect(() => {
    handleReset();
    setIsTyping(false);
    setIsTouched(false);
  }, [currentDialog?.conversationId]);
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSubmit();
    }
  };
  const onInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (
      !editMessageMode.isEdit &&
      !replyMessageMode.isReply &&
      !forwardMessageMode.isForward
    ) {
      setIsTouched(true);
      event.target.value === '' ? setIsTyping(false) : setIsTyping(true);
    }
  };
  return (
    <TextareaAutosize
      {...field}
      ref={textArea}
      maxRows={10}
      placeholder='Write a message...'
      onKeyDown={handleKeyDown}
      onInput={onInput}
      className={styles['message_input']}
    />
  );
};

export default ConversationFormInput;
