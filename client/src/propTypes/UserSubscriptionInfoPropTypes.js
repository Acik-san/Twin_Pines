import PropTypes from 'prop-types';
import { userProfileData } from './shapes';

const UserSubscriptionInfoPropTypes = {
  userData: userProfileData,
  handleProfileEdit: PropTypes.func.isRequired,
  handleSubscriptionOpen: PropTypes.func.isRequired,
};

export default UserSubscriptionInfoPropTypes;
