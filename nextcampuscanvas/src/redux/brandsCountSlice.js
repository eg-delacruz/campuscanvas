import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

//services
import axiosFetcher from '@services/axiosFetcher';

//Endpoints
import endPoints from '@services/api';

const INITIAL_STATE = {
  count: 0,
  initial_render_loaded: false,
};

export const countBrands = createAsyncThunk('brands/countBrands', async () => {
  const response = await axiosFetcher({
    url: endPoints.discounts.brands,
    method: 'get',
    extraHeaders: {
      required_info: 'brands_count',
    },
  });
  return response;
});

export const countBrandsReducer = createSlice({
  name: 'countBrands',
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(countBrands.fulfilled, (state, action) => {
      state.initial_render_loaded = true;
      if (action.payload.error) {
        state.error = action.payload.error;
        return;
      }
      state.count = action.payload.body.count;
    });
  },
});

export const selectCountBrands = (state) => state.countBrands;

export default countBrandsReducer.reducer;
