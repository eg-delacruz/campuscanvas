//CLARIFICATION: Handle a global state with a single varieable like this is fine, no need to create more slices for each different state
import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = {
  cachedResults: {},
};

export const discountSearchBarCacheSlice = createSlice({
  name: 'discountSearchBarCache',
  initialState: INITIAL_STATE,
  reducers: {
    updateCache: (state, action) => {
      state.cachedResults[action.payload.searchValue] = action.payload.results;
    },
    cleanCache: (state) => {
      state.cachedResults = {};
    },
  },
});

export const { updateCache, cleanCache } = discountSearchBarCacheSlice.actions;

//Gives us access to the state value that we want to use
export const selectDiscountSearchBarCache = (state) =>
  state.discountSearchBarCache;

//We export this to be able to connect the slice to the store
export default discountSearchBarCacheSlice.reducer;
