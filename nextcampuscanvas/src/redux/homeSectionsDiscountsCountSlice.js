import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

//Endpoints
import endPoints from '@services/api';

//Services
import axiosFetcher from '@services/axiosFetcher';

const INITIAL_STATE = {
  homeSectionsCount: [],
  loading: false,
  error: '',
};

//This is an async action
export const getHomeSectionsCount = createAsyncThunk(
  //Action types
  'homeSectionsCount/getHomeSectionsCount',
  async () => {
    const response = await axiosFetcher({
      url: endPoints.admin.discounts.getHomeSectionsCardsCount,
      method: 'get',
      extraHeaders: {
        required_info: 'home_sections_cards_count',
      },
    });
    return response;
  }
);

export const homeSectionsCountReducer = createSlice({
  name: 'homeSectionsCount',
  initialState: INITIAL_STATE,
  //These reducers will handle the global state of the slice. They can´t be async.
  reducers: {},
  //Used to handle the state according to the promise status of the createAsyncThunk function.
  extraReducers: (builder) => {
    //We can add a case for the action type generated by createAsyncThunk
    builder
      //In this case, getHomeSectionsCount will generate 3 action types: getHomeSectionsCount/pending, getHomeSectionsCount/fulfilled, getHomeSectionsCount/rejected. We can add a case for each one of them.
      .addCase(getHomeSectionsCount.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getHomeSectionsCount.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.error) {
          state.error = action.payload.error;
          return;
        }
        state.homeSectionsCount = action.payload.body;
      })
      .addCase(getHomeSectionsCount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const selectHomeSectionsCount = (state) => state.homeSectionsCount;

export default homeSectionsCountReducer.reducer;
