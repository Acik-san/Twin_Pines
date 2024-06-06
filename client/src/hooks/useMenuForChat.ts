import { useNavigate } from 'react-router-dom';
import useTypedSelector from './useTypedSelector';
import { ICurrentDialog } from '../types';
import createChatMenuProps from '../utils/chatMenuProps';

const useMenuForChat = () => {
  const { currentDialog } = useTypedSelector(({ chats }) => chats);
  const chatMenuProps = createChatMenuProps(
    currentDialog as ICurrentDialog,
    useNavigate()
  );
  return chatMenuProps;
};

export default useMenuForChat;
