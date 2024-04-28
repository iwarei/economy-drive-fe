/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type LineType = {
  id: number;
  lineName: string;
  lineNameKana: string;
};

type LineState = {
  lineTypes: LineType[];
};

const initialState: LineState = {
  lineTypes: [],
};

const lineSlice = createSlice({
  name: 'lines',
  initialState,
  reducers: {
    setLines: (state, action: PayloadAction<LineType[]>) => {
      state.lineTypes = action.payload;
    },
    clearLines: (state) => {
      state.lineTypes = [];
    },
  },
});

export const { setLines, clearLines } = lineSlice.actions;
export default lineSlice.reducer;
