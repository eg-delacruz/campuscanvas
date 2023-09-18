//Redux config file. Here we import the reducers and pass them to the store.
import { configureStore } from '@reduxjs/toolkit';

//Reducers
import jobsReducer from '@redux/jobsSlice';
import usersReducer from '@redux/usersSlice';
import userSidebarGlobalStateReducer from '@redux/userSidebarGlobalStateSlice';
import homeSectionsCountReducer from '@redux/homeSectionsDiscountsCountSlice';
import showFirstInCategoryCountReducer from '@redux/showDiscountFirstInCategorySlice';
import discountSearchBarCacheReducer from '@redux/discountsSearchbar/discountSearchBarCacheSlice';
import adminDiscountsTablePaginationGlobalStateReducer from '@redux/adminDiscountsTablePaginationGlobalStateSlice';
import discountSearchbarInputStateReducer from '@redux/discountsSearchbar/discountSearchbarInputStateSlice';
import discountSearchbarGeneralStatesReducer from '@redux/discountsSearchbar/discountSearchbarGeneralStatesSlice';
import adminDiscountsTableSearchValueReducer from '@redux/adminDiscountsTableSearchValueSlice';
import blogPaginationReducer from '@redux/blogPaginationSlice';

export const store = configureStore({
  //We pass the reducer to the store. This names have to be the same as the exported selector of the slice.js files to correctly access the desired state.
  reducer: {
    jobs: jobsReducer,
    user: usersReducer,
    userSidebarGlobalState: userSidebarGlobalStateReducer,
    homeSectionsCount: homeSectionsCountReducer,
    showFirstInCategoryCount: showFirstInCategoryCountReducer,
    discountSearchBarCache: discountSearchBarCacheReducer,
    adminDiscountsTablePaginationGlobalState:
      adminDiscountsTablePaginationGlobalStateReducer,
    blogPagination: blogPaginationReducer,
    discountSearchbarInputState: discountSearchbarInputStateReducer,
    discountSearchbarGeneralStates: discountSearchbarGeneralStatesReducer,
    adminDiscountsTableSearchValue: adminDiscountsTableSearchValueReducer,
  },
});

//https://redux-toolkit.js.org/tutorials/quick-start
