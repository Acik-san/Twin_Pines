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
  repliedMessage: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    sender: PropTypes.number,
    body: PropTypes.string,
    conversation: PropTypes.string,
    isRead: PropTypes.bool,
    isEdited: PropTypes.bool,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
  }),
  replyOn: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])]),
  setReplyOn: PropTypes.func.isRequired,
  replyObserver: PropTypes.instanceOf(IntersectionObserver).isRequired,
};

export default ConversationMessagesListItemPropTypes;
