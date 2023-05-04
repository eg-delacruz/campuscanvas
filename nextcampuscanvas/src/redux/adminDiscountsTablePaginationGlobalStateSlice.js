//Reducer used to store the current page of the admin discounts table pagination so that when we check a discount and go back to the table, the page is the same as before and doesn't reset to the first page.

import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = {
  currentPage: 1,
};

export const adminDiscountsTablePaginationGlobalStateSlice = createSlice({
  name: 'adminDiscountsTablePaginationGlobalState',
  initialState: INITIAL_STATE,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
});

export const { setCurrentPage } =
  adminDiscountsTablePaginationGlobalStateSlice.actions;

//Gives us access to the state value that we want to use
export const selectAdminDiscountsTablePaginationGlobalState = (state) =>
  state.adminDiscountsTablePaginationGlobalState;

//We export this to be able to connect the slice to the store
export default adminDiscountsTablePaginationGlobalStateSlice.reducer;
