import axios from "axios";
import FormData from "form-data";
import qs from "query-string";

const httpClient = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const createUser = (data) => {
  const form = new FormData();
  form.append("login", data.login);
  form.append("password", data.password);
  form.append("avatar", data.avatar);
  return httpClient.post("/users", form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
export const getUsers = ({ limit = 5, offset = 0 }) =>
  httpClient.get(`/users?${qs.stringify({ limit, offset })}`);

export const getUser = (id) => httpClient.get(`/users/${id}`);
export const deleteUser = (id) => httpClient.delete(`/users/${id}`);
export const updateUser = (data) => {
  const form = new FormData();
  form.append("login", data.values.login);
  form.append("password", data.values.password);
  form.append("avatar", data.values.avatar);
  return httpClient.patch(`/users/${data.id}`, form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
export const getSumUsers = () => httpClient.get("/users/sum");

export const createTask = (data) =>
  httpClient.post(`/users/${data.id}/tasks`, data.values);
export const getUserTasks = (id) => httpClient.get(`/users/${id}/tasks`);
export const getUserTask = (data) =>
  httpClient.get(`/users/${data.userId}/tasks/${data.taskId}`);
export const updateTask = (data) =>
  httpClient.patch(`/users/${data.userId}/tasks/${data.taskId}`, data.values);
export const deleteTask = (data) =>
  httpClient.delete(`/users/${data.userId}/tasks/${data.taskId}`);
export const getAllTasks = ({ limit = 5, offset = 0 }) =>
  httpClient.get(`/tasks?${qs.stringify({ limit, offset })}`);
export const getSumTasks = () => httpClient.get("/tasks/sum");
