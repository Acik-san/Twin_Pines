import PropTypes from 'prop-types';

const ButtonPropTypes = {
  buttonName: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  sx: PropTypes.object,
};

export default ButtonPropTypes;
