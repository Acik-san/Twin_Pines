import { useRef, useState } from 'react';
import { useDataForContextMenu } from '../hooks';

const useContextMenu = () => {
  const [contextMenuVisible, setContextMenuVisible] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({
    x: 0,
    y: 0,
  });
  const contextMenuRef = useRef(null);

  const showContextMenu = e => {
    e.preventDefault();
    const x = e.clientX;
    const y = e.clientY;
    const windowWidth = window.innerWidth;

    setContextMenuPosition({ x, y });
    if (x + 250 > windowWidth && x >= 250) {
      setContextMenuPosition({ x: x - 250, y });
    }
    if (x - 250 < 0 && x > 70 && x < 250) {
      setContextMenuPosition({ x: 30, y });
    }
    setContextMenuVisible(true);
  };

  const hideContextMenu = () => {
    setContextMenuVisible(false);
  };
  
  const propsMenu = useDataForContextMenu(hideContextMenu);

  return {
    contextMenuRef,
    contextMenuVisible,
    contextMenuPosition,
    showContextMenu,
    hideContextMenu,
    propsMenu,
  };
};

export default useContextMenu;
