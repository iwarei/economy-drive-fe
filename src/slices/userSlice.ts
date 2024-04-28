/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type UserInfo = {
  id: number;
  name: string;
  email: string;
};

export type StateType = {
  userInfo?: UserInfo | undefined;
  isAuthed: boolean;
};

const initialState: StateType = {
  isAuthed: false,
  userInfo: undefined,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<UserInfo>) => {
      state.userInfo = action.payload;
    },
    clearUserInfo: (state) => {
      state.userInfo = undefined;
    },
    setIsAuthed: (state, action: PayloadAction<boolean>) => {
      state.isAuthed = action.payload;
    },
  },
});

export const { setUserInfo, clearUserInfo, setIsAuthed } = userSlice.actions;
export default userSlice.reducer;
