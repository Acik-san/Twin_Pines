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
  form.append('login', data.values.login);
  form.append('password', data.values.password);
  form.append('avatar', data.values.avatar);
  return httpClient.patch('profile', form, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const getUserTasks = () => httpClient.get('profile/tasks');
export const createTask = (data) => httpClient.post('profile/tasks', data.values);
export const getUserTask = data =>
  httpClient.get(`profile/tasks/${data.taskId}`);
export const updateTask = data =>
  httpClient.patch(`profile/tasks/${data.taskId}`, data.values);
export const deleteTask = data =>
  httpClient.delete(`profile/tasks/${data.taskId}`);
