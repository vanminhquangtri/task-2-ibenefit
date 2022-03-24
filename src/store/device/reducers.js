import { createSlice } from '@reduxjs/toolkit';

const Reducer = createSlice({
  name: 'Device',
  initialState: { data: {} },
  reducers: {
    setDevice: (state, action) => ({
      ...state,
      data: action.payload,
    }),
  },
});

export const { setDevice } = Reducer.actions;

export default Reducer.reducer;
