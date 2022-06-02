import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { feedAPI } from "../services/feedService";
import userReducer from "./reducers/userSlice";
import searchReducer from "./reducers/search/searchSlice";
import { blogAPI } from "../services/blogService";

const rootReducer = combineReducers({
  userReducer,
  searchReducer,
  [feedAPI.reducerPath]: feedAPI.reducer,
  [blogAPI.reducerPath]: blogAPI.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(feedAPI.middleware, blogAPI.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
