import PropTypes from 'prop-types';

const OnlineBadgePropTypes = {
  currentStatus: PropTypes.string.isRequired,
  isMessageRead: PropTypes.bool.isRequired,
  messageSender: PropTypes.number.isRequired,
  classes: PropTypes.exact({
    onlineWrapper: PropTypes.string.isRequired,
    onlineWrapperNotRead: PropTypes.string.isRequired,
    online: PropTypes.string.isRequired,
    zoomIn: PropTypes.string.isRequired,
    zoomOut: PropTypes.string.isRequired,
  }).isRequired,
};

export default OnlineBadgePropTypes;
