import { profileSettings } from './shapes';
import { userProfileData } from './shapes';

const ProfilePropTypes = {
  userData: userProfileData.isRequired,
  profileSettings: profileSettings.isRequired,
};

export default ProfilePropTypes;
