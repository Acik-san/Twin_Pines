import httpClient from './interceptor';
import FormData from 'form-data';
import qs from 'query-string';

export const signIn = data => {
  return httpClient.post('auth/sign-in', data);
};
export const signUp = data => {
  return httpClient.post('auth/sign-up', data);
};
export const refresh = refreshToken =>
  httpClient.post('auth/refresh', { refreshToken });
export const getAuthUser = () => httpClient.get('auth');

export const updateUser = data => {
  const form = new FormData();
  form.append(Object.keys(data.values)[0], Object.values(data.values)[0]);
  return httpClient.patch('profile', form, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const getChats = () => httpClient.get('chats');
export const getUsers = () => httpClient.get('chats/users');
export const getMessages = ({ id, limit, offset }) =>
  httpClient.get(`chats/chat/${id}?${qs.stringify({ limit, offset })}`);
