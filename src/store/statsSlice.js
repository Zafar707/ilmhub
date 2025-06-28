import { createSlice } from '@reduxjs/toolkit';

const statsSlice = createSlice({
  name: 'stats',
  initialState: {
    students: 500,
    courses: 15,
    certificates: 300,
  },
  reducers: {
    increment: (state) => {
      state.students += 1;
      state.certificates += 1;
    },
  },
});

export const { increment } = statsSlice.actions;
export default statsSlice.reducer;