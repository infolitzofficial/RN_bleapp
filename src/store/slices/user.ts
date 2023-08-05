import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import EncryptedStorage from 'react-native-encrypted-storage';
import AuthService from '../../services/auth.services';
import Survey from '../../services/survey';
import showToast from '../../utils/showToast';
import ROUTE from '../../route';
import { navigate, onAuthSuccess, onLogout } from '../../routes/authRoute';

interface UserState {
  isAuthenticated: boolean;
  isAppInitialized: boolean;
  user: any;
  error: string;
  loading: boolean;
  profile: any;
  profileLoading: boolean;
}

const initialState: UserState = {
  isAuthenticated: false,
  isAppInitialized: false,
  user: {},
  error: '',
  loading: false,
  profile: {},
  profileLoading: false,
};

export const login = createAsyncThunk(
  'auth/login',
  async (params: any, {rejectWithValue}) => {
    try {
      const response: any = await AuthService.login(params);
      if (response?.user) {
        // dispatch(getProfile());
        onAuthSuccess();
        return response;
      } else {
        showToast('Invalid Username or Password');
        throw new Error(response?.message || '');
      }
    } catch (err: any) {
      return rejectWithValue(err.message || 'Something went wrong');
    }
  },
);

export const logout = createAsyncThunk(
  'user/logout',
  async (_, {rejectWithValue}) => {
    try {
      const response = await AuthService.logout();
      if (response.statusCode === 200 || response.statusCode === 401) {
        await EncryptedStorage.clear();
        onLogout();
        showToast('You are logged out Successfully');
        return true;
      } else {
        throw new Error(response?.message || '');
      }
    } catch (err: any) {
      return rejectWithValue(err.message || 'Something went wrong');
    }
  },
);

export const checkAuthorization = createAsyncThunk(
  'user/checkAuthorization',
  async (_, {rejectWithValue}) => {
    try {
      const tmpAT = (await EncryptedStorage.getItem('auth-access-token')) ?? '';
      const tmpRT =
        (await EncryptedStorage.getItem('auth-refresh-token')) ?? '';
      const tmpUserStr = (await EncryptedStorage.getItem('user')) ?? '';
      if (tmpAT && tmpRT && tmpUserStr) {
        // dispatch(getProfile());
        onAuthSuccess();
        let usr = JSON.parse(tmpUserStr);
        return usr;
      } else {
        // navigate(ROUTE.LOGIN, {});
        throw new Error();
      }
    } catch (err: any) {
      rejectWithValue(err.message || 'Something went wrong');
    }
  },
);

export const forgotPass = createAsyncThunk(
  'auth/forgot-password',
  async (params: any, {rejectWithValue}) => {
    try {
      const response: any = await Survey.forgotPassword(params);
      if (response?.statusCode === 200) {
        return response.data;
      } else {
        throw new Error(response?.message || '');
      }
    } catch (err: any) {
      return rejectWithValue(err.message || 'Something went wrong');
    }
  },
);
export const resetPass = createAsyncThunk(
  'auth/reset-password',
  async (params: any, {rejectWithValue}) => {
    try {
      const response: any = await Survey.resetPassword(params);
      if (response?.statusCode === 200) {
        return response.data;
      } else {
        throw new Error(response?.message || '');
      }
    } catch (err: any) {
      return rejectWithValue(err.message || 'Something went wrong');
    }
  },
);
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    saveCurrentUser(state, action: PayloadAction<any>) {
      state.isAuthenticated = true;
      state.isAppInitialized = true;
      state.user = action.payload.user;
      state.loading = false;
      state.error = '';
    },
    clearError(state) {
      state.error = '';
    },
  },
  extraReducers: builder => {
    builder.addCase(checkAuthorization.pending, state => {
      state.isAuthenticated = false;
      state.isAppInitialized = false;
    });
    builder.addCase(checkAuthorization.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isAppInitialized = true;
    });
    builder.addCase(checkAuthorization.rejected, (state, action) => {
      state.isAuthenticated = false;
      state.isAppInitialized = true;
      state.error =
        (action.payload as string) || (action.error.message as string);
    });
    builder.addCase(login.pending, state => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload.data || {};
      state.error = '';
      state.isAuthenticated = true;
      state.isAppInitialized = true;
      state.loading = false;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.error = (action?.payload as string) || '';
      state.isAppInitialized = true;
      state.isAuthenticated = false;
      state.loading = false;
    });
    // builder.addCase(getProfile.pending, state => {
    //   state.profileLoading = true;
    //   state.error = '';
    // });
    // builder.addCase(getProfile.fulfilled, (state, action) => {
    //   state.profile = action.payload || {};
    //   state.error = '';
    //   state.profileLoading = false;
    // });
    // builder.addCase(getProfile.rejected, (state, action) => {
    //   state.error = (action?.payload as string) || '';
    //   state.profile = {};
    //   state.profileLoading = false;
    // });
    builder.addCase(logout.fulfilled, state => {
      state.isAuthenticated = false;
      state.user = {};
      state.profile = {};
    });
    builder.addCase(logout.rejected, state => {
      state.error = 'something went wrong';
    });
  },
});

export const {saveCurrentUser, clearError} = userSlice.actions;
export default userSlice.reducer;
