import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = {
  hasNextPage: false,
  firstSearchExecuted: false,
  allowCleanCache: false,
};

export const discountSearchbarGeneralStatesSlice = createSlice({
  name: 'discountSearchbarGeneralStates',
  initialState: INITIAL_STATE,
  reducers: {
    setHasNextPage: (state, action) => {
      state.hasNextPage = action.payload;
    },
    setFirstSearchExecuted: (state, action) => {
      state.firstSearchExecuted = action.payload;
    },
    setAllowCleanCache: (state, action) => {
      state.allowCleanCache = action.payload;
    },
  },
});

export const { setHasNextPage, setFirstSearchExecuted, setAllowCleanCache } =
  discountSearchbarGeneralStatesSlice.actions;

export const selectDiscountSearchbarGeneralStates = (state) =>
  state.discountSearchbarGeneralStates;

export default discountSearchbarGeneralStatesSlice.reducer;
