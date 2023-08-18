import PropTypes from 'prop-types';
import { userData } from './shapes';

const ChatsPreviewPropTypes = {
  conversationId: PropTypes.string.isRequired,
  sender: PropTypes.number.isRequired,
  interlocutor: userData,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  isTyping: PropTypes.bool.isRequired,
  isRead: PropTypes.bool.isRequired,
};

export default ChatsPreviewPropTypes;
