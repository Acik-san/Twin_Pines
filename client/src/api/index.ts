import FormData from 'form-data';
import qs from 'query-string';
import httpClient from './interceptor';
import { FormValues } from '../types';

export const signIn = (data: { email: string; password: string }) => {
  return httpClient.post('auth/sign-in', data);
};
export const signUp = (data: FormValues) => {
  return httpClient.post('auth/sign-up', data);
};
export const refresh = (refreshToken: string) =>
  httpClient.post('auth/refresh', { refreshToken });
export const getAuthUser = () => httpClient.get('auth');

export const getUserProfile = (userName: string) =>
  httpClient.get(`profile/${userName}`);
export const getUserFollowers = ({
  userName,
  subscriptionsLimit,
  subscriptionsOffset,
}: {
  userName: string;
  subscriptionsLimit: number;
  subscriptionsOffset: number;
}) =>
  httpClient.get(
    `profile/${userName}/followers?${qs.stringify({
      subscriptionsLimit,
      subscriptionsOffset,
    })}`
  );
export const getUserFollowing = ({
  userName,
  subscriptionsLimit,
  subscriptionsOffset,
}: {
  userName: string;
  subscriptionsLimit: number;
  subscriptionsOffset: number;
}) =>
  httpClient.get(
    `profile/${userName}/following?${qs.stringify({
      subscriptionsLimit,
      subscriptionsOffset,
    })}`
  );
export const subscribeUser = (targetId: number) =>
  httpClient.post(`profile/${targetId}/subscribe`);
export const unsubscribeUser = (targetId: number) =>
  httpClient.delete(`profile/${targetId}/subscribe`);

export const updateUser = (data: {
  id: number;
  values: { [key: string]: string | {} };
}) => {
  const form = new FormData();
  form.append(Object.keys(data.values)[0], Object.values(data.values)[0]);
  return httpClient.patch('profile', form, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const getChats = () => httpClient.get('chats');
export const startDialog = (userId: number, interlocutorId: number) =>
  httpClient.get(`chats/chat?${qs.stringify({ userId, interlocutorId })}`);
export const getUsers = () => httpClient.get('chats/users');
export const getMessages = ({
  id,
  limit,
  offset,
}: {
  id: number;
  limit: number;
  offset: number;
}) => httpClient.get(`chats/chat/${id}?${qs.stringify({ limit, offset })}`);
export const getMessagesOnReconnect = ({
  id,
  lastMessageDate,
}: {
  id: number;
  lastMessageDate: string;
}) =>
  httpClient.get(
    `chats/chat/${id}/reconnect?${qs.stringify({ lastMessageDate })}`
  );
