import PropTypes from 'prop-types';

const ConversationMessagesListItemPropTypes = {
  body: PropTypes.string.isRequired,
  sender: PropTypes.number.isRequired,
  createdAt: PropTypes.string.isRequired,
  typingStatus: PropTypes.bool.isRequired,
  isRead: PropTypes.bool.isRequired,
  i: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  observer: PropTypes.instanceOf(IntersectionObserver).isRequired,
};

export default ConversationMessagesListItemPropTypes;
