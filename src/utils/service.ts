import axios from 'axios';
import { getUniqueId } from 'react-native-device-info';
import EncryptedStorage from 'react-native-encrypted-storage';
import Config from 'react-native-config';

import { logout } from '../store/slices/user';
import showToast from './showToast';
import { publicEndpoints } from '../config/api';
import { store } from '../store/store';

const service = axios.create({ baseURL: Config.API_BASE_URL, timeout: 60000 });
service.interceptors.request.use(
  async (config: any) => {
    // console.log(
    //   `REQUEST ${config.method} ${config.baseURL} ${config.url}`,
    //   config.data ?? 'No req data',
    // );
    let uniqueId = await getUniqueId();
    const token = await EncryptedStorage.getItem('auth-access-token');
    const reftoken = await EncryptedStorage.getItem('auth-refresh-token');
    config.headers.Accept = 'application/json';
    config.headers['Device-Id'] = uniqueId;
    config.headers['App-Type'] = 'app';
    config.headers['x-refresh-token'] = reftoken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: any) => {
    Promise.reject(error);
  },
);
service.interceptors.response.use(
  (response: any) => {
    // console.log(
    //   `RESPONSE : ${response?.request?.responseURL}`,
    //   response.data,
    // );
    return response;
  },
  async (error: any) => {
    // console.log("RESPONSE ERROR", error)
    let originalRequest = error.config;
    if (
      error?.response?.status === 401 &&
      !originalRequest._retry &&
      !publicEndpoints.includes(originalRequest.url)
    ) {
      originalRequest._retry = true;
      const token = await EncryptedStorage.getItem('auth-refresh-token');
      let uniqueId = getUniqueId();
      return axios
        .post(Config.REFRESH_TOKEN || "", undefined, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            Authorization: `Bearer ${token}`,
            'Device-Id': uniqueId && uniqueId.toString(),
            'App-Type': 'mob',
            'x-refresh-token': token
          },
        })
        .then(res => {
          if (res?.data?.status === 200) {
            EncryptedStorage.setItem(
              'auth-access-token',
              res?.data?.accesstoken,
            );
            EncryptedStorage.setItem(
              'auth-refresh-token',
              res?.data?.refreshToken,
            );
            service.defaults.headers.common.Authorization =
              'Bearer ' + res?.headers['auth-access-token'];
          }
          return res.data;
        })
        .then((response: any) => {
          if (response.status === 200) {
            return axios(originalRequest);
          } else {
            throw new Error(response.message || '');
          }
        })
        .catch((err: any) => {
          showToast(err.message || 'something went wrong');
          store.dispatch(logout() as any);
          return Promise.reject(error.config ? error.response.data : error);
        });
    } else {
      return error?.response;
    }
  },
);

export default service;
