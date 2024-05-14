import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import createPropsMenu from '../utils/contextMenuProps';
import * as ActionChat from '../actions/chatsCreator';

const useDataForContextMenu = hideContextMenu => {
  const { user } = useSelector(({ users }) => users);
  const { contextMenuTarget, currentDialog } = useSelector(
    ({ chats }) => chats
  );
  const {
    setEditMessageMode,
    setDeleteMessageMode,
    setReplyMessageMode,
    setForwardMessageMode,
  } = bindActionCreators(ActionChat, useDispatch());
  const { userPropsMenu, interlocutorPropsMenu } = createPropsMenu(
    contextMenuTarget,
    currentDialog,
    setEditMessageMode,
    setDeleteMessageMode,
    setReplyMessageMode,
    setForwardMessageMode,
    hideContextMenu
  );
  if (contextMenuTarget?.forwardedFrom) {
    userPropsMenu.splice(1, 1);
  }
  const propsMenu =
    user.id === contextMenuTarget?.sender
      ? userPropsMenu
      : interlocutorPropsMenu;

  return propsMenu;
};

export default useDataForContextMenu;
