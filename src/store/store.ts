import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../slices/userSlice';
import lineReducer from '../slices/lineSlices';

export const store = configureStore({
  reducer: {
    user: userReducer,
    lines: lineReducer,
  },
});
