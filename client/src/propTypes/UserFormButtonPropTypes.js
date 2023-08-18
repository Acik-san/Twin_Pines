import PropTypes from 'prop-types';

const UserFormButtonPropTypes = {
  fieldName: PropTypes.string.isRequired,
  type: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func,
  isValidatable: PropTypes.bool,
  children: PropTypes.string.isRequired,
};

export default UserFormButtonPropTypes;
