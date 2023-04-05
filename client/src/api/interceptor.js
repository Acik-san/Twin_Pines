import axios from 'axios';
import CONSTANTS from '../constants';

const httpClient = axios.create({
  baseURL: CONSTANTS.BASE_URL,
});

let accessToken = null;

httpClient.interceptors.request.use(
  config => {
    if (window.localStorage.getItem(CONSTANTS.REFRESH_TOKEN) === null) {
      accessToken = null;
    }
    if (accessToken) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${accessToken}`,
      };
    }
    return config;
  },
  err => Promise.reject(err)
);

httpClient.interceptors.response.use(
  response => {
    if (response?.data?.data?.tokenPair) {
      const {
        data: {
          data: {
            tokenPair: { access, refresh },
          },
        },
      } = response;
      window.localStorage.setItem(CONSTANTS.REFRESH_TOKEN, refresh);
      accessToken = access;
    }
    return response;
  },
  async err => {
    const refreshToken = window.localStorage.getItem(CONSTANTS.REFRESH_TOKEN);
    if (
      (err.response.status === 408 && refreshToken) ||
      (err.response.status === 401 && refreshToken)
    ) {
      const {
        data: {
          data: {
            tokenPair: { access, refresh },
          },
        },
      } = await httpClient.post('auth/refresh', { refreshToken });
      window.localStorage.setItem(CONSTANTS.REFRESH_TOKEN, refresh);
      accessToken = access;
      err.config.headers = {
        ...err.config.headers,
        Authorization: `Bearer ${accessToken}`,
      };
      return axios.request(err.config);
      // err.config.headers.Authorization=`Bearer ${accessToken}`;
      // return axios.request(err.config);
    }
    return Promise.reject(err);
  }
);

export default httpClient;
