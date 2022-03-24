import { createSlice } from '@reduxjs/toolkit';

const Reducer = createSlice({
  name: 'User',
  initialState: {},
  reducers: {
    setUser: (state, action) => action.payload,
  },
});

export const { setUser } = Reducer.actions;

export default Reducer.reducer;
