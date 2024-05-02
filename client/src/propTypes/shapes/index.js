import PropTypes from 'prop-types';

export const userData = PropTypes.shape({
  id: PropTypes.number.isRequired,
  userName: PropTypes.string.isRequired,
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

export const profileSettings = PropTypes.shape({
  isEdit: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  editProfile: PropTypes.func.isRequired,
  handleSetting: PropTypes.func.isRequired,
});

export const userProfileData = PropTypes.shape({
  avatar: PropTypes.string.isRequired,
  bio: PropTypes.string,
  email: PropTypes.string,
  userName: PropTypes.string.isRequired,
  name: PropTypes.string,
  id: PropTypes.number.isRequired,
  onlineStatus: PropTypes.string.isRequired,
  lastSeen: PropTypes.string.isRequired,
  followers: PropTypes.number.isRequired,
  following: PropTypes.number.isRequired,
  isFollowed: PropTypes.bool,
  createdAt: PropTypes.string,
  updatedAt: PropTypes.string,
});
