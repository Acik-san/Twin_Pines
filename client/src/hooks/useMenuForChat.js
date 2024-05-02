import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import createChatMenuProps from '../utils/chatMenuProps';

const useMenuForChat = () => {
  const { currentDialog } = useSelector(({ chats }) => chats);
  const navigate = useNavigate();
  const chatMenuProps = createChatMenuProps(currentDialog, navigate);
  return chatMenuProps;
};

export default useMenuForChat;
