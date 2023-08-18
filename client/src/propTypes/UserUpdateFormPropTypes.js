import PropTypes from 'prop-types';

const UserUpdateFormPropTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  editProfile: PropTypes.func.isRequired,
};

export default UserUpdateFormPropTypes;
