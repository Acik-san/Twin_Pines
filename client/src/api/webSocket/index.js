import { io } from 'socket.io-client';
import store from '../../store';
import * as UserCreator from '../../actions/userCreators';
import * as ChatCreator from '../../actions/chatsCreator';
import CONSTANTS from '../../constants';

const socket = io(CONSTANTS.WS_BASE_URL, {
  transports: ['websocket', 'polling'],
});

socket.io.on('reconnect', () => {
  const { users, chats } = store.getState();
  store.dispatch(
    ChatCreator.subscribeChatsRequest({
      userId: users.user.id,
      conversations: chats.messagesPreview.map(({ _id }) => _id),
    })
  );
  store.dispatch(
    UserCreator.setOnlineStatusRequest({
      userId: users.user.id,
      status: 'online',
    })
  );
  store.dispatch(UserCreator.getOnlineUsersRequest());
});

socket.on('disconnect', () => {
  store.dispatch(UserCreator.setOnlineStatus({ status: 'offline' }));
  store.dispatch(ChatCreator.setTypingStatus({ status: false }));
});

socket.on(CONSTANTS.SOCKET_EVENTS.ONLINE_STATUS, data => {
  store.dispatch(UserCreator.setOnlineStatus(data));
});

socket.on(CONSTANTS.SOCKET_EVENTS.ONLINE_USERS, users => {
  store.dispatch(UserCreator.getOnlineUsers(users));
});

socket.on(CONSTANTS.SOCKET_EVENTS.NEW_MESSAGE, data => {
  store.dispatch(ChatCreator.createMessageSuccess(data));
});

socket.on(CONSTANTS.SOCKET_EVENTS.TYPING_STATUS, data => {
  store.dispatch(ChatCreator.setTypingStatus(data));
});

socket.on(CONSTANTS.SOCKET_EVENTS.SEEN_MESSAGE, data => {
  store.dispatch(ChatCreator.setSeenMessageSuccess(data))
});

export default socket;
