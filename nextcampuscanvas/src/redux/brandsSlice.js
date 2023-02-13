import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

//Endpoints
import endPoints from '@services/api';

//Services
import axiosFetcher from '@services/axiosFetcher';

const INITIAL_STATE = {
  brands: [],
  loading: false,
  error: '',
};

//This is an async action
export const getBrands = createAsyncThunk(
  //Action types
  'brands/getBrands',
  async () => {
    const response = await axiosFetcher({
      url: endPoints.discounts.brands,
      method: 'get',
      extraHeaders: {
        required_info: 'all_brands',
      },
    });

    if (response.error) {
      console.log(response.error);
      return 'Error al traer marcas' + response.error;
    }

    return response.body;
  }
);

export const brandsReducer = createSlice({
  name: 'brands',
  initialState: INITIAL_STATE,
  //These reducers will handle the global state of the slice. They can´t be async.
  reducers: {},
  //Used to handle the state according to the promise status of the createAsyncThunk function.
  extraReducers: (builder) => {
    //We can add a case for the action type generated by createAsyncThunk
    builder
      //In this case, getBrands will generate 3 action types: getBrands/pending, getBrands/fulfilled, getBrands/rejected. We can add a case for each one of them.
      .addCase(getBrands.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getBrands.fulfilled, (state, action) => {
        state.loading = false;
        state.brands = action.payload;
      })
      .addCase(getBrands.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const selectBrand = (state) => state.brands;

export default brandsReducer.reducer;
