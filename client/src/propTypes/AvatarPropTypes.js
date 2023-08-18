import { isValidElement } from 'react';
import PropTypes from 'prop-types';

const AvatarPropTypes = {
  login: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  onlineBadge: (props, propName, componentName) => {
    if (
      !isValidElement(props[propName]) ||
      props[propName].type.name !== 'OnlineBadge'
    ) {
      return new Error(
        `Invalid prop \`${propName}\` of type \`${typeof props[
          propName
        ]}\` supplied to \`${componentName}\`, expected a single ReactElement with name \`OnlineBadge\`.`
      );
    }
  },
  classes: PropTypes.exact({
    photoWrapper: PropTypes.string.isRequired,
    photoInner: PropTypes.string.isRequired,
    photoInnerImg: PropTypes.string.isRequired,
  }).isRequired,
};

export default AvatarPropTypes;
