//CLARIFICATION: Handle a global state with a single varieable like this is fine, no need to create more slices for each different state
import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = {
  openSidebar: '',
};

export const globalStateSlice = createSlice({
  name: 'globalState',
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

export const { openSidebar, closeSidebar } = globalStateSlice.actions;

//Gives us access to the state value that we want to use
export const selectGlobalState = (state) => state.globalState;

//We export this to be able to connect the slice to the store
export default globalStateSlice.reducer;
