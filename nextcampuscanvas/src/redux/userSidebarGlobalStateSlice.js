import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = {
  openSidebar: '',
};

export const userSidebarGlobalStateSlice = createSlice({
  name: 'userSidebarGlobalState',
  initialState: INITIAL_STATE,
  reducers: {
    openSidebar: (state) => {
      state.openSidebar = true;
    },
    closeSidebar: (state) => {
      state.openSidebar = false;
    },
  },
});

export const { openSidebar, closeSidebar } =
  userSidebarGlobalStateSlice.actions;

//Gives us access to the state value that we want to use
export const selectUserSidebarGlobalState = (state) =>
  state.userSidebarGlobalState;

//We export this to be able to connect the slice to the store
export default userSidebarGlobalStateSlice.reducer;
