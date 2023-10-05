import PropTypes from 'prop-types';
import { checkSpecialComponentPropTypes } from './shapes';
import ConfirmButton from '../components/ConfirmButton';

const ConfirmPropTypes = {
  messageText: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    checkSpecialComponentPropTypes(ConfirmButton),
    PropTypes.arrayOf(checkSpecialComponentPropTypes(ConfirmButton)),
  ]).isRequired,
};

export default ConfirmPropTypes;
