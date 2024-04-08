import PropTypes from 'prop-types';

export const userData = PropTypes.shape({
  id: PropTypes.number.isRequired,
  userName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
}).isRequired;

export const currentDialog = PropTypes.shape({
  avatar: PropTypes.string.isRequired,
  conversationId: PropTypes.string,
  interlocutorId: PropTypes.number.isRequired,
  userName: PropTypes.string.isRequired,
}).isRequired;

export const textAreaRef = PropTypes.shape({
  current: PropTypes.instanceOf(HTMLTextAreaElement),
}).isRequired;

export const checkSpecialComponentPropTypes = Component =>
  PropTypes.shape({
    type: PropTypes.oneOf([Component]),
  });
