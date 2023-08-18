import PropTypes from 'prop-types';

const UserProfileSettingPropTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  iconName: PropTypes.string.isRequired,
  propertyName: PropTypes.string.isRequired,
  propertyValue: PropTypes.string,
  handleSetting: PropTypes.func.isRequired,
};

export default UserProfileSettingPropTypes;
