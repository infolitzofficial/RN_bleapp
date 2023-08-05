import service from '../utils/service';
import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';
import { getUniqueId } from 'react-native-device-info';
import Config from 'react-native-config';

const AuthService = {
  login: async (params: any = {}) => {
    try {
      const res: any = await service.post('user_login', params);
      if (res?.data) {
        await EncryptedStorage.setItem(
          'auth-access-token',
          res?.data?.accesstoken,
        );
        await EncryptedStorage.setItem(
          'auth-refresh-token',
          res?.data?.refreshToken,
        );
        await EncryptedStorage.setItem('user', JSON.stringify(res?.data?.user));
      }
      return res?.data;
    } catch (error) {
      return error;
    }
  },
  register: async (params: any = {}) => {
    try {
      const res = await service.post("register", params);
      if (res?.data) {
        return res.data;
      } else {
        throw new Error('something went wrong');
      }
    } catch (error) {
      return error;
    }
  },
  logout: async () => {
    try {
      const res = await service.post("/logout");
      if (res?.data) {
        return res.data;
      } else {
        throw new Error('something went wrong');
      }
    } catch (error) {
      return error;
    }
  },
  forgotPassword: async (params: any = {}) => {
    try {
      const res = await service.post("forgotPassword", params);
      if (res?.data) {
        return res.data;
      } else {
        throw new Error('something went wrong');
      }
    } catch (error) {
      return error;
    }
  },
  resetPassword: async (params: any = {}, token: string) => {
    try {
      let uniqueId = await getUniqueId();
      let res = await axios.post(
        `${Config.API_BASE_URL}${Config.RESET_PASSWORD}`,
        params,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Device-Id': uniqueId || '',
            'App-Type': 'web',
          },
        },
      );
      if (res.data) {
        return res.data;
      } else {
        throw new Error('something went wrong');
      }
    } catch (error) {
      return error;
    }
  },
  validateResetPassword: async (token: string) => {
    let uniqueId = await getUniqueId();
    try {
      const res = await axios.post(
        `${Config.API_BASE_URL}${Config.VALIDATE_RESET_PASSWORD}`,
        undefined,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Device-Id': uniqueId || '',
            'App-Type': 'web',
          },
        },
      );
      if (res?.data) {
        return res.data;
      }
    } catch (error) {
      return error;
    }
  },
  refreshToken: async () => {
    try {
      const token = await EncryptedStorage.getItem('auth-refresh-token');
      const res = await axios.post(
        `${Config.API_BASE_URL}${Config.REFRESH_TOKEN}`,
        undefined,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (res?.data?.statusCode === 200) {
        EncryptedStorage.setItem(
          'auth-access-token',
          res?.headers['auth-access-token'],
        );
        EncryptedStorage.setItem(
          'auth-refresh-token',
          res?.headers['auth-refresh-token'],
        );
        service.defaults.headers.common.Authorization =
          'Bearer ' + res?.headers['auth-access-token'];
      }
      return res.data;
    } catch (error) {
      return error;
    }
  },
  // getProfile: async () => {
  //   try {
  //     const res = await service.get(Config.PROFILE);
  //     if (res?.data) {
  //       return res.data;
  //     } else {
  //       throw new Error('Something went wrong');
  //     }
  //   } catch (error) {
  //     return error;
  //   }
  // },
  updateProfile: async (params: any = {}) => {
    try {
      const res = await service.put("profile", params);
      if (res?.data) {
        return res.data;
      } else {
        throw new Error('something went wrong');
      }
    } catch (error) {
      return error;
    }
  },
  changePassword: async (params: any = {}) => {
    try {
      const res = await service.put("profile", params);
      if (res?.data) {
        return res.data;
      } else {
        throw new Error('something went wrong');
      }
    } catch (error) {
      return error;
    }
  },
  getFormValues: async () => {
    try {
      const res = await service.get('formValues');
      if (res?.data) {
        return res.data;
      } else {
        throw new Error('Something went wrong');
      }
    } catch (error) {
      return error;
    }
  },
};

export default AuthService;
