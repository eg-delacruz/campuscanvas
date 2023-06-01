import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = {
  value: '',
};

//State that stores the value of the searchbar to avoid that the searchbar value is lost when the user navigates to another page
export const discountSearchbarInputStateSlice = createSlice({
  name: 'discountSearchbarInputState',
  initialState: INITIAL_STATE,
  reducers: {
    setSearchbarValue: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setSearchbarValue } = discountSearchbarInputStateSlice.actions;

export const selectDiscountSearchbarInputState = (state) =>
  state.discountSearchbarInputState;

export default discountSearchbarInputStateSlice.reducer;
