import { combineReducers } from "@reduxjs/toolkit";
import { api } from "shared/api/api";
import { authApi } from "shared/api/authApi";

export const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  [authApi.reducerPath]: authApi.reducer,
});
