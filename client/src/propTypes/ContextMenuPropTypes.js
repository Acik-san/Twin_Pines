import PropTypes from 'prop-types';

const ContextMenuPropTypes = {
  contextMenuRef: PropTypes.shape({
    current: PropTypes.instanceOf(HTMLUListElement),
  }),
  contextMenuPosition: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
  hideContextMenu: PropTypes.func.isRequired,
  propsMenu: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      propName: PropTypes.string.isRequired,
      propIcon: PropTypes.string.isRequired,
      onlyForUser: PropTypes.bool.isRequired,
      handleClick: PropTypes.func.isRequired,
    }).isRequired
  ).isRequired,
};

export default ContextMenuPropTypes;
