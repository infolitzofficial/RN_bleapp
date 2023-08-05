import {createSlice} from '@reduxjs/toolkit';

interface OtherState {
  showBottomNav: boolean;
}

const initialState: OtherState = {
  showBottomNav: true,
};

const otherSlice = createSlice({
  name: 'other',
  initialState,
  reducers: {
    show(state) {
      state.showBottomNav = true;
    },
    hide(state) {
      state.showBottomNav = false;
    },
  },
});

export const {show, hide} = otherSlice.actions;
export default otherSlice.reducer;
