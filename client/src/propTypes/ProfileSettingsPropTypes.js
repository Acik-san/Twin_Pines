import PropTypes from 'prop-types';
import { profileSettings } from './shapes';

const ProfileSettings = {
  handleProfileEdit: PropTypes.func.isRequired,
  settings: profileSettings.isRequired,
};

export default ProfileSettings;
