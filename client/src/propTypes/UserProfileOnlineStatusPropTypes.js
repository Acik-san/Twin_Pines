import PropTypes from 'prop-types';

const UserProfileOnlineStatusPropTypes = {
  userData: PropTypes.shape({
    onlineStatus: PropTypes.string.isRequired,
    lastSeen: PropTypes.string.isRequired,
  }),
};

export default UserProfileOnlineStatusPropTypes;
