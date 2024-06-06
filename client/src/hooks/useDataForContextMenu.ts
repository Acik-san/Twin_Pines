import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import useTypedSelector from './useTypedSelector';
import createPropsMenu from '../utils/contextMenuProps';
import * as ActionChat from '../actions/chatsCreator';

const useDataForContextMenu = (hideContextMenu: () => void) => {
  const { user } = useTypedSelector(({ users }) => users);
  const { contextMenuTarget, currentDialog } = useTypedSelector(
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
    user?.id === contextMenuTarget?.sender
      ? userPropsMenu
      : interlocutorPropsMenu;

  return propsMenu;
};

export default useDataForContextMenu;
