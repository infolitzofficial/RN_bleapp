import service from '../utils/service';
import Config from 'react-native-config';

const SurveyService = {
  getDistricts: async () => {
    try {
      const res = await service.get('form-value/district');
      if (res?.data) {
        return res.data;
      } else {
        throw new Error('something went wrong');
      }
    } catch (error) {
      return error;
    }
  },
  getLocal: async (districtId: string) => {
    const path = `form-value/localbody?districtId=${districtId}`;
    try {
      const res = await service.get(path);
      if (res?.data) {
        return res.data;
      } else {
        throw new Error('something went wrong');
      }
    } catch (error) {
      return error;
    }
  },
  survey: async () => {
    try {
      const res = await service.post('survey');
      if (res?.data) {
        return res.data;
      } else {
        throw new Error('something went wrong');
      }
    } catch (error) {
      return error;
    }
  },
  surveyList: async (params: any = {}) => {
    try {
      const res = await service.get('survey', {
        params,
      });
      if (res?.data) {
        return res.data;
      } else {
        throw new Error('something went wrong');
      }
    } catch (error) {
      return error;
    }
  },
  surveyDetails: async (params: any) => {
    try {
      const res = await service.get(`survey/${params}`);
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
      const res = await service.post(Config.LOGOUT);
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
      const res = await service.post('auth/forgot-password', params);
      if (res?.data) {
        return res.data;
      } else {
        throw new Error('something went wrong');
      }
    } catch (error) {
      return error;
    }
  },
  resetPassword: async (params: any = {}) => {
    try {
      let res = await service.post('auth/reset-password', params);
      if (res.data) {
        return res.data;
      } else {
        throw new Error('something went wrong');
      }
    } catch (error) {
      return error;
    }
  },
  validateResetPassword: async () => {
    try {
      const res = await service.post(Config.VALIDATE_RESET_PASSWORD);
      if (res?.data) {
        return res.data;
      }
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
      const res = await service.put(Config.PROFILE_UPDATE, params);
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
      const res = await service.put(Config.CHANGE_PASSWORD, params);
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
      const res = await service.get(Config.AUTH_FORM_VALUES);
      if (res?.data) {
        return res.data;
      } else {
        throw new Error('Something went wrong');
      }
    } catch (error) {
      return error;
    }
  },
  createSurvey: async (params: any) => {
    try {
      const res = await service.post(Config.SURVEY, params, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        transformRequest: formData => formData,
      });
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

export default SurveyService;
