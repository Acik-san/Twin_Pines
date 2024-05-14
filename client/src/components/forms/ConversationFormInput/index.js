import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useFormikContext, useField } from 'formik';
import { ConversationFormInputPropTypes } from '../../../propTypes';
import TextareaAutosize from 'react-textarea-autosize';
import styles from './ConversationFormInput.module.scss';

const ConversationFormInput = props => {
  const { name, textArea, setIsTyping, setIsTouched } = props;
  const { currentDialog, editMessageMode } = useSelector(
    ({ chats }) => chats
  );
  const { setFieldValue, handleReset, handleSubmit } = useFormikContext();
  const [field] = useField(name);
  useEffect(() => {
    if (editMessageMode.isEdit) {
      setFieldValue(name, editMessageMode.message.body);
    }
  }, [editMessageMode.message]);
  useEffect(() => {
    handleReset();
  }, [currentDialog]);
  const handleKeyDown = event => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSubmit();
    }
  };
  const onInput = event => {
    if (!editMessageMode.isEdit) {
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

ConversationFormInput.propTypes = ConversationFormInputPropTypes;

export default ConversationFormInput;
