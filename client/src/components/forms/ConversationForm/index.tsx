import React, { FC, memo, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Formik, Form, FormikHelpers } from 'formik';
import { IConversationForm } from '../../../types';
import { useTypedSelector } from '../../../hooks';
import ConversationMessageMode from '../../ConversationMessageMode';
import ConversationFormInput from '../ConversationFormInput';
import * as ActionChat from '../../../actions/chatsCreator';
import Schems from '../../../utils/validateSchemas';
import styles from './ConversationForm.module.scss';

interface FormValues {
  conversations: Array<string>;
  interlocutor: number;
  messageBody: string;
  userId: number;
}

const ConversationForm: FC<IConversationForm> = memo(
  ({ currentDialog, textArea, setIsTouched, setIsTyping }) => {
    const { user } = useTypedSelector(({ users }) => users);
    const {
      messagesPreview,
      editMessageMode,
      replyMessageMode,
      forwardMessageMode,
    } = useTypedSelector(({ chats }) => chats);
    const {
      createMessageRequest,
      setEditMessageMode,
      editMessageRequest,
      setReplyMessageMode,
      replyMessageRequest,
      setForwardMessageMode,
      forwardMessageRequest,
    } = bindActionCreators(ActionChat, useDispatch());
    const onSubmit = (
      values: FormValues,
      formikBag: FormikHelpers<FormValues>
    ) => {
      values.interlocutor = currentDialog.interlocutorId;
      if (editMessageMode.isEdit) {
        editMessageRequest({
          messageId: editMessageMode.message.messageId!,
          conversationId: editMessageMode.message.conversationId!,
          editedBody: values.messageBody,
        });
        setEditMessageMode({ isEdit: false, message: {} });
      } else if (replyMessageMode.isReply) {
        replyMessageRequest({
          userId: user?.id!,
          interlocutorId: replyMessageMode.message.interlocutorId!,
          messageId: replyMessageMode.message.messageId!,
          forwardedFrom: replyMessageMode.message.forwardedFrom!,
          conversationId: replyMessageMode.message.conversationId!,
          body: values.messageBody,
        });
        setReplyMessageMode({ isReply: false, message: {} });
      } else if (forwardMessageMode.isForward) {
        forwardMessageRequest({
          userId: user?.id!,
          interlocutorId: currentDialog.interlocutorId!,
          messageId: forwardMessageMode.message.messageId!,
          forwardedFrom: forwardMessageMode.message?.forwardedFrom,
          conversationId: currentDialog.conversationId,
          body: values.messageBody,
          forwardedBody: forwardMessageMode.message.body!,
          isForwarded: forwardMessageMode.message.isForwarded!,
        });
        setForwardMessageMode({
          isChatListOpen: false,
          isForward: false,
          message: {},
        });
      } else {
        createMessageRequest(values);
      }
      setIsTyping(false);
      formikBag.resetForm();
    };
    useEffect(() => {
      textArea?.current?.focus();
    }, [
      currentDialog,
      editMessageMode.isEdit,
      replyMessageMode.isReply,
      forwardMessageMode.isForward,
    ]);

    return (
      user && (
        <Formik
          initialValues={{
            userId: user.id,
            interlocutor: currentDialog.interlocutorId,
            conversations:
              messagesPreview.length > 0
                ? messagesPreview.map(({ _id }) => _id)
                : [],
            messageBody: '',
          }}
          validationSchema={
            forwardMessageMode.isForward
              ? Schems.ForwardMessageSchem
              : Schems.ChatSchem
          }
          onSubmit={onSubmit}
        >
          <Form className={styles['message_form']}>
            {editMessageMode.isEdit ||
            replyMessageMode.isReply ||
            forwardMessageMode.isForward ? (
              <ConversationMessageMode setIsTyping={setIsTyping} />
            ) : null}
            <div className={styles.input_container}>
              <ConversationFormInput
                name='messageBody'
                textArea={textArea}
                setIsTyping={setIsTyping}
                setIsTouched={setIsTouched}
              />
              <button type='submit' className={styles.send_message} />
            </div>
          </Form>
        </Formik>
      )
    );
  }
);

export default ConversationForm;
