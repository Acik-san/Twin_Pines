import PropTypes from 'prop-types';

const AuthInputPropTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
};

export default AuthInputPropTypes;
