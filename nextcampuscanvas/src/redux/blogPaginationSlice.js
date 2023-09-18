//Reducer used to store the current page of the blog posts table pagination so that when we check an entry and go back to the table, the page is the same as before and doesn't reset to the first page.

import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = {
  currentPage: 1,
};

export const blogPaginationSlice = createSlice({
  name: 'blogPagination',
  initialState: INITIAL_STATE,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
});

export const { setCurrentPage } = blogPaginationSlice.actions;

//Gives us access to the state value that we want to use
export const selectBlogPagination = (state) => state.blogPagination;

//We export this to be able to connect the slice to the store
export default blogPaginationSlice.reducer;
