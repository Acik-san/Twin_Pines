import PropTypes from 'prop-types';
import { currentDialog, textAreaRef } from './shapes';

const ConversationFormPropTypes = {
  currentDialog,
  textArea: textAreaRef,
  setIsTyping: PropTypes.func.isRequired,
  setIsTouched: PropTypes.func.isRequired,
};

export default ConversationFormPropTypes;
