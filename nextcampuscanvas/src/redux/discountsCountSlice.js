import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

//services
import axiosFetcher from '@services/axiosFetcher';

//Endpoints
import endPoints from '@services/api';

const INITIAL_STATE = {
  count: 0,
  initial_render_loaded: false,
};

export const countDiscounts = createAsyncThunk(
  'discounts/countDiscounts',
  async () => {
    const response = await axiosFetcher({
      url: endPoints.discounts.index,
      method: 'get',
      extraHeaders: {
        needed_info: 'discounts_count',
      },
    });
    return response;
  }
);

export const countDiscountsReducer = createSlice({
  name: 'countDiscounts',
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(countDiscounts.fulfilled, (state, action) => {
      state.initial_render_loaded = true;
      if (action.payload.error) {
        state.error = action.payload.error;
        return;
      }
      state.count = action.payload.body.count;
    });
  },
});

export const selectCountDiscounts = (state) => state.countDiscounts;

export default countDiscountsReducer.reducer;
