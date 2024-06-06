import { useRef, useState } from 'react';
import { useDataForContextMenu } from '../hooks';

const useContextMenu = () => {
  const [contextMenuVisible, setContextMenuVisible] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({
    x: 0,
    y: 0,
  });
  const contextMenuRef = useRef(null);

  const showContextMenu = (e:React.MouseEvent )=> {
    e.preventDefault();
    const x = e.pageX;
    const y = e.pageY;
    const menuWidth = 250;
    const menuHeight = 256; // +1 = +48
    const documentWidth = document.body.clientWidth;
    const documentHeight = document.body.clientHeight;
    if (x + menuWidth > documentWidth && x >= menuWidth) {
      setContextMenuPosition({
        x: x - menuWidth,
        y: y + menuHeight > documentHeight ? documentHeight - menuHeight : y,
      });
    } else if (x - menuWidth < 0 && x > 50 && x < menuWidth) {
      setContextMenuPosition({
        x: 30,
        y: y + menuHeight > documentHeight ? documentHeight - menuHeight : y,
      });
    } else if (y + menuHeight > documentHeight) {
      setContextMenuPosition({
        x: x + menuWidth > documentWidth ? documentWidth - menuWidth : x,
        y: documentHeight - menuHeight,
      });
    } else {
      setContextMenuPosition({ x, y });
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
