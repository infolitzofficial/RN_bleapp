import {configureStore} from '@reduxjs/toolkit';
import userReducer from './slices/user';
import otherReducer from './slices/other';

export const store = configureStore({
  reducer: {
    user: userReducer,
    other: otherReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
