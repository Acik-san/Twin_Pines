import CONSTANTS from '../constants';

const createPropsMenu = (
  contextMenuTarget,
  currentDialog,
  setEditMessageMode,
  setDeleteMessageMode,
  setReplyMessageMode,
  setForwardMessageMode,
  hideContextMenu
) => {
  const contextMenuMap = new Map();
  [
    {
      id: 1,
      handleClick: () => {
        setReplyMessageMode({
          isReply: true,
          message: {
            messageId: contextMenuTarget.messageId,
            sender: contextMenuTarget.sender,
            interlocutorId: currentDialog.interlocutorId,
            conversationId: currentDialog.conversationId,
            body: contextMenuTarget.body,
            forwardedFrom: contextMenuTarget.forwardedFrom,
            isRead: contextMenuTarget.isRead,
          },
        });
        hideContextMenu();
      },
    },
    {
      id: 2,
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
      id: 3,
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
    {
      id: 4,
      handleClick: () => {
        setForwardMessageMode({
          isChatListOpen: true,
          isForward: false,
          message: {
            messageId: contextMenuTarget.messageId,
            sender: contextMenuTarget.sender,
            interlocutorId: currentDialog.interlocutorId,
            conversationId: currentDialog.conversationId,
            body: contextMenuTarget.body,
            forwardedFrom: contextMenuTarget.forwardedFrom,
            isRead: contextMenuTarget.isRead,
            isForwarded: contextMenuTarget.isForwarded,
          },
        });
        hideContextMenu();
      },
    },
    {
      id: 5,
      handleClick: () => {
        setDeleteMessageMode({
          isDelete: true,
          message: {
            messageId: contextMenuTarget.messageId,
            prevMessage: contextMenuTarget.prevMessage,
            numberOfMessages: contextMenuTarget.numberOfMessages,
            sender: contextMenuTarget.sender,
            interlocutorId: currentDialog.interlocutorId,
            conversationId: currentDialog.conversationId,
            body: contextMenuTarget.body,
            isRead: contextMenuTarget.isRead,
            isOriginal: contextMenuTarget.isOriginal,
            isForwarded: contextMenuTarget.isForwarded,
          },
        });
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
