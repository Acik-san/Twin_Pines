import PropTypes from 'prop-types';
import { textAreaRef } from './shapes';

const ConversationFormInputPropTypes = {
  name: PropTypes.string.isRequired,
  textArea: textAreaRef,
  setIsTyping: PropTypes.func.isRequired,
  setIsTouched: PropTypes.func.isRequired,
};

export default ConversationFormInputPropTypes;
