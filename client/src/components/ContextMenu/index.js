import React from 'react';
import { useClickOutside } from '../../hooks';
import { ContextMenuPropTypes } from '../../propTypes';
import styles from './ContextMenu.module.scss';

const ContextMenu = props => {
  const { contextMenuRef, contextMenuPosition, hideContextMenu, propsMenu } =
    props;
  useClickOutside(contextMenuRef, hideContextMenu);
  return (
    <ul
      ref={contextMenuRef}
      className={styles.menu_list}
      style={{
        left: contextMenuPosition.x + 'px',
        top: contextMenuPosition.y + 'px',
      }}
      onContextMenu={e => e.preventDefault()}
    >
      {propsMenu.map(({ id, propName, propIcon, handleClick }) => (
        <li key={id} className={styles.menu_list_item} onClick={handleClick}>
          <img src={propIcon} />
          <p>{propName.charAt(0).toUpperCase() + propName.slice(1)}</p>
        </li>
      ))}
    </ul>
  );
};

ContextMenu.propTypes = ContextMenuPropTypes;

export default ContextMenu;
