import { io } from 'socket.io-client';
import store from '../../store';
import * as UserCreator from '../../actions/userCreators';
import * as ChatCreator from '../../actions/chatsCreator';
import CONSTANTS from '../../constants';

const socket = io(CONSTANTS.WS_BASE_URL, {
  transports: ['websocket', 'polling'],
});

socket.io.on('reconnect', () => {
  const {
    users: { user, userProfile },
    chats: { messagesPreview, currentDialog, messages, limit, offset },
  } = store.getState();
  if (user) {
    store.dispatch(ChatCreator.getChatsOnReconnectRequest());
    store.dispatch(
      ChatCreator.subscribeChatsRequest({
        userId: user.id,
        conversations: messagesPreview.map(
          ({
            _id,
            interlocutor: { id },
          }: {
            _id: string;
            interlocutor: { id: number };
          }) => ({
            conversationId: _id,
            interlocutorId: id,
          })
        ),
      })
    );
    store.dispatch(
      UserCreator.setOnlineStatusRequest({
        userId: user.id,
        status: 'online',
      })
    );
    if (userProfile) {
      store.dispatch(UserCreator.getUserRequest(userProfile.userName));
      store.dispatch(UserCreator.subscribeUserProfileRequest(userProfile.id));
    }
    if (currentDialog) {
      store.dispatch(
        UserCreator.getOnlineStatusRequest(currentDialog.interlocutorId)
      );
      if (messages.length === 0) {
        store.dispatch(
          ChatCreator.getMessagesRequest({
            id: currentDialog.interlocutorId,
            limit,
            offset,
          })
        );
      } else {
        store.dispatch(
          ChatCreator.getMessagesOnReconnectRequest({
            id: currentDialog.interlocutorId,
            lastMessageDate: messages[messages.length - 1].createdAt,
          })
        );
      }
    }
  }
});

socket.on('disconnect', () => {
  const {
    users: { user },
  } = store.getState();
  if (user) {
    store.dispatch(
      UserCreator.setOnlineStatus({ userId: user.id, status: 'offline' })
    );
    store.dispatch(ChatCreator.setTypingStatus({ status: false }));
  }
});

socket.on(CONSTANTS.SOCKET_EVENTS.ONLINE_STATUS, data => {
  store.dispatch(UserCreator.setOnlineStatus(data));
});

socket.on(CONSTANTS.SOCKET_EVENTS.GET_ONLINE_STATUS_INFO, data => {
  store.dispatch(UserCreator.getOnlineStatus(data));
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
  store.dispatch(ChatCreator.setSeenMessageSuccess(data));
});

socket.on(CONSTANTS.SOCKET_EVENTS.EDITED_MESSAGE, data => {
  store.dispatch(ChatCreator.editMessageSuccess(data));
});

socket.on(CONSTANTS.SOCKET_EVENTS.DELETED_MESSAGE, data => {
  store.dispatch(ChatCreator.deleteMessageSuccess(data));
});

socket.on(CONSTANTS.SOCKET_EVENTS.REPLIED_MESSAGE, data => {
  store.dispatch(ChatCreator.replyMessageSuccess(data));
});

socket.on(CONSTANTS.SOCKET_EVENTS.FORWARDED_MESSAGE, data => {
  store.dispatch(ChatCreator.forwardMessageSuccess(data));
});

export default socket;
