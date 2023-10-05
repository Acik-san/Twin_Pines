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
  deleteMessageMode: PropTypes.shape({
    isDelete: PropTypes.bool.isRequired,
    message: PropTypes.shape({
      messageId: PropTypes.string,
      prevMessage: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        sender: PropTypes.number.isRequired,
        body: PropTypes.string.isRequired,
        conversation: PropTypes.string.isRequired,
        isRead: PropTypes.bool.isRequired,
        isEdited: PropTypes.bool.isRequired,
        createdAt: PropTypes.string.isRequired,
        updatedAt: PropTypes.string.isRequired,
      }),
      numberOfMessages: PropTypes.number,
      sender: PropTypes.number,
      interlocutorId: PropTypes.number,
      conversationId: PropTypes.string,
      body: PropTypes.string,
      isRead: PropTypes.bool,
    }).isRequired,
  }).isRequired,
};

export default ConversationEditMessagePropTypes;
