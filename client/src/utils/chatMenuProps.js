import CONSTANTS from '../constants';

const createChatMenuProps = (currentDialog, navigate) => {
  const chatMenuMap = new Map();
  [
    {
      id: 1,
      handleClick: () => {
        navigate(`/profile/${currentDialog.userName}`);
      },
    },
    ...CONSTANTS.CHAT_INFO,
  ].forEach(prop => {
    if (!chatMenuMap.has(prop.id)) {
      chatMenuMap.set(prop.id, {});
    }
    Object.assign(chatMenuMap.get(prop.id), prop);
  });
  const chatMenuProps = Array.from(chatMenuMap.values());
  return chatMenuProps;
};

export default createChatMenuProps;
