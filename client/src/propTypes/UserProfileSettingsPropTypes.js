import PropTypes from 'prop-types';
import { userData } from './shapes';

const UserProfileSettingsPropTypes = {
  user: userData,
  settings: PropTypes.shape({
    isEdit: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    editProfile: PropTypes.func.isRequired,
    handleSetting: PropTypes.func.isRequired,
  }).isRequired,
};

export default UserProfileSettingsPropTypes;
