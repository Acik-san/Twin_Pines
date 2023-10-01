import PropTypes from 'prop-types';

const ConversationMessagesListItemPropTypes = {
  body: PropTypes.string.isRequired,
  sender: PropTypes.number.isRequired,
  createdAt: PropTypes.string.isRequired,
  typingStatus: PropTypes.bool,
  isRead: PropTypes.bool.isRequired,
  isEdited: PropTypes.bool.isRequired,
  i: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  conversationId: PropTypes.string.isRequired,
  observer: PropTypes.instanceOf(IntersectionObserver).isRequired,
  showContextMenu: PropTypes.func.isRequired,
};

export default ConversationMessagesListItemPropTypes;
