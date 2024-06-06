import React, { FC } from 'react';
import { useClickOutside } from '../../hooks';
import { IContextMenu } from '../../types';
import styles from './ContextMenu.module.scss';

const ContextMenu: FC<IContextMenu> = ({
  contextMenuRef,
  contextMenuPosition,
  hideContextMenu,
  propsMenu,
}) => {
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
        <li
          key={id}
          className={styles.menu_list_item}
          onClick={e => {
            e.stopPropagation();
            handleClick();
          }}
        >
          <img src={propIcon} />
          <p>{propName.charAt(0).toUpperCase() + propName.slice(1)}</p>
        </li>
      ))}
    </ul>
  );
};

export default ContextMenu;
