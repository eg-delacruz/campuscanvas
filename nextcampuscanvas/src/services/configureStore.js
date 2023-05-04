//Redux config file. Here we import the reducers and pass them to the store.
import { configureStore } from '@reduxjs/toolkit';

//Reducers
import jobsReducer from '@redux/jobsSlice';
import postsReducer from '@redux/postsSlice';
import usersReducer from '@redux/usersSlice';
import userSidebarGlobalStateReducer from '@redux/userSidebarGlobalStateSlice';
import homeBannersReducer from '@redux/homeBannersSlice';
import homeSectionsCountReducer from '@redux/homeSectionsDiscountsCountSlice';
import showFirstInCategoryCountReducer from '@redux/showDiscountFirstInCategorySlice';
import discountSearchBarCacheReducer from '@redux/discountSearchBarCacheSlice';
import adminDiscountsTablePaginationGlobalStateReducer from '@redux/adminDiscountsTablePaginationGlobalStateSlice';

export const store = configureStore({
  //We pass the reducer to the store. This names have to be the same as the exported selector of the slice.js files to correctly access the desired state.
  reducer: {
    jobs: jobsReducer,
    posts: postsReducer,
    user: usersReducer,
    userSidebarGlobalState: userSidebarGlobalStateReducer,
    home_banners: homeBannersReducer,
    homeSectionsCount: homeSectionsCountReducer,
    showFirstInCategoryCount: showFirstInCategoryCountReducer,
    discountSearchBarCache: discountSearchBarCacheReducer,
    adminDiscountsTablePaginationGlobalState:
      adminDiscountsTablePaginationGlobalStateReducer,
  },
});

//https://redux-toolkit.js.org/tutorials/quick-start
