import PropTypes from 'prop-types';

const ConversationEditMessagePropTypes = {
  editMessageMode: PropTypes.shape({
    isEdit: PropTypes.bool.isRequired,
    message: PropTypes.shape({
      messageId: PropTypes.string.isRequired,
      sender: PropTypes.number.isRequired,
      interlocutorId: PropTypes.number.isRequired,
      conversationId: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      isRead: PropTypes.bool.isRequired,
    }).isRequired,
  }).isRequired,
  setEditMessageMode: PropTypes.func.isRequired,
};

export default ConversationEditMessagePropTypes;
