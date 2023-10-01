import React, { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Formik, Form } from 'formik';
import { ConversationFormPropTypes } from '../../../propTypes';
import ConversationEditMessage from '../../ConversationEditMessage';
import ConversationFormInput from '../ConversationFormInput';
import * as ActionChat from '../../../actions/chatsCreator';
import Schems from '../../../utils/validateSchemas';
import styles from './ConversationForm.module.scss';

const ConversationForm = memo(props => {
  const { currentDialog, textArea, setIsTyping, setIsTouched } = props;
  const { user } = useSelector(({ users }) => users);
  const { messagesPreview, editMessageMode } = useSelector(
    ({ chats }) => chats
  );
  const { createMessageRequest, setEditMessageMode, editMessageRequest } =
    bindActionCreators(ActionChat, useDispatch());
  const onSubmit = (values, formikBag) => {
    values.interlocutor = currentDialog.interlocutorId;
    if (!editMessageMode.isEdit) {
      createMessageRequest(values);
    } else {
      editMessageRequest({
        messageId: editMessageMode.message.messageId,
        conversationId: editMessageMode.message.conversationId,
        editedBody: values.messageBody,
      });
      setEditMessageMode({ isEdit: false, message: {} });
    }
    setIsTyping(false);
    formikBag.resetForm();
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
      <Form className={styles['message_form']}>
        {editMessageMode.isEdit ? (
          <ConversationEditMessage
            editMessageMode={editMessageMode}
            setEditMessageMode={setEditMessageMode}
          />
        ) : null}
        <ConversationFormInput
          name='messageBody'
          textArea={textArea}
          setIsTyping={setIsTyping}
          setIsTouched={setIsTouched}
        />
      </Form>
    </Formik>
  );
});

ConversationForm.propTypes = ConversationFormPropTypes;

export default ConversationForm;
