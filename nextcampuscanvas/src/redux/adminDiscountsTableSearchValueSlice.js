import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = {
  value: '',
};

export const adminDiscountsTableSearchValueSlice = createSlice({
  name: 'adminDiscountsTableSearchValue',
  initialState: INITIAL_STATE,
  reducers: {
    setAdminDiscountsTableSearchValue: (state, action) => {
      state.value = action.payload;
    },
  },
});

//This is like the setState
export const { setAdminDiscountsTableSearchValue } =
  adminDiscountsTableSearchValueSlice.actions;

//This is like the state
export const selectAdminDiscountsTableSearchValue = (state) =>
  state.adminDiscountsTableSearchValue;

export default adminDiscountsTableSearchValueSlice.reducer;
