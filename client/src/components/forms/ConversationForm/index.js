import React, { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Formik, Form, Field } from 'formik';
import TextareaAutosize from 'react-textarea-autosize';
import * as ActionChat from '../../../actions/chatsCreator';
import Schems from '../../../utils/validateSchemas';
import styles from './ConversationForm.module.scss';

const ConversationForm = memo(props => {
  const { currentDialog, textArea, setIsTyping, setIsTouched } = props;
  const { user } = useSelector(({ users }) => users);
  const { messagesPreview } = useSelector(({ chats }) => chats);
  const { createMessageRequest } = bindActionCreators(
    ActionChat,
    useDispatch()
  );
  const onSubmit = (values, formikBag) => {
    values.interlocutor = currentDialog.interlocutorId;
    createMessageRequest(values);
    setIsTyping(false);
    formikBag.resetForm();
  };

  const handleKeyDown = (event, formikProps) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      formikProps.handleSubmit();
    }
  };
  const onInput = event => {
    setIsTouched(true);
    event.target.value === '' ? setIsTyping(false) : setIsTyping(true);
  };
  return (
    <Formik
      initialValues={{
        userId: user.id,
        interlocutor: currentDialog?.interlocutorId,
        conversations:
          messagesPreview.length > 0
            ? messagesPreview.map(({ _id }) => _id)
            : [],
        messageBody: '',
      }}
      validationSchema={Schems.ChatSchem}
      onSubmit={onSubmit}
    >
      {formikProps => (
        <Form className={styles['message_form']}>
          <Field name='messageBody'>
            {({ field }) => (
              <TextareaAutosize
                {...field}
                ref={textArea}
                maxRows={10}
                placeholder='Write a message...'
                onKeyDown={event => handleKeyDown(event, formikProps)}
                onInput={onInput}
                className={styles['message_input']}
              />
            )}
          </Field>
        </Form>
      )}
    </Formik>
  );
});

export default ConversationForm;
