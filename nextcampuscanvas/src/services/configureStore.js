import { configureStore } from '@reduxjs/toolkit';

//Reducers
import jobsReducer from '@redux/jobsSlice';
import postsReducer from '@redux/postsSlice';
import usersReducer from '@redux/usersSlice';
import globalStateReducer from '@redux/globalStateSlice';
import brandsReducer from '@redux/brandsSlice';
import discountsReducer from '@redux/discountsSlice';
import homeBannersReducer from '@redux/homeBannersSlice';
import homeSectionsCountReducer from '@redux/homeSectionsDiscountsCountSlice';
import showFirstInCategoryCountReducer from '@redux/showDiscountFirstInCategorySlice';

export const store = configureStore({
  //We pass the reducer to the store. This names have to be the same as the exported selector of the slice.js files to correctly access the desired state.
  reducer: {
    jobs: jobsReducer,
    posts: postsReducer,
    user: usersReducer,
    globalState: globalStateReducer,
    brands: brandsReducer,
    discounts: discountsReducer,
    home_banners: homeBannersReducer,
    homeSectionsCount: homeSectionsCountReducer,
    showFirstInCategoryCount: showFirstInCategoryCountReducer,
  },
});

//https://redux-toolkit.js.org/tutorials/quick-start
