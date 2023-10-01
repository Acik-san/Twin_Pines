import CONSTANTS from '../constants';

const createPropsMenu = (
  contextMenuTarget,
  currentDialog,
  setEditMessageMode,
  hideContextMenu
) => {
  const contextMenuMap = new Map();
  [
    {
      id: 1,
      handleClick: () => {
        setEditMessageMode({
          isEdit: true,
          message: {
            messageId: contextMenuTarget.messageId,
            sender: contextMenuTarget.sender,
            interlocutorId: currentDialog.interlocutorId,
            conversationId: currentDialog.conversationId,
            body: contextMenuTarget.body,
            isRead: contextMenuTarget.isRead,
          },
        });
        hideContextMenu();
      },
    },
    {
      id: 2,
      handleClick: () => {
        const textArea = document.createElement('textarea');
        textArea.value = contextMenuTarget.body;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        hideContextMenu();
      },
    },
    ...CONSTANTS.CONTEXT_MENU_SETTINGS,
  ].forEach(prop => {
    if (!contextMenuMap.has(prop.id)) {
      contextMenuMap.set(prop.id, {});
    }
    Object.assign(contextMenuMap.get(prop.id), prop);
  });
  const userPropsMenu = Array.from(contextMenuMap.values());
  const interlocutorPropsMenu = userPropsMenu.filter(prop => !prop.onlyForUser);
  return { userPropsMenu, interlocutorPropsMenu };
};

export default createPropsMenu;
