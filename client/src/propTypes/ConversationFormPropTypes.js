import PropTypes from 'prop-types';
import { currentDialog } from './shapes';

const ConversationFormPropTypes = {
  currentDialog,
  textArea: PropTypes.shape({
    current: PropTypes.instanceOf(HTMLTextAreaElement),
  }).isRequired,
  setIsTyping: PropTypes.func.isRequired,
  setIsTouched: PropTypes.func.isRequired,
};

export default ConversationFormPropTypes;
