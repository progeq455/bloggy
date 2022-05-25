import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { feedAPI } from "../services/feedService";
import userReducer from "./reducers/userSlice";

const rootReducer = combineReducers({
  userReducer,
  [feedAPI.reducerPath]: feedAPI.reducer
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(feedAPI.middleware)
  })
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
