import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "../reducers";
import { api } from "shared/api/api";
import { authApi } from "shared/api/authApi";
import { setupListeners } from "@reduxjs/toolkit/query";

export function createReduxStore(initialState = {}) {
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        api.middleware,
        authApi.middleware,
      ),
    preloadedState: initialState,
  });

  // Необходимо для корректной работы refetchOnFocus, refetchOnReconnect и т.д.
  setupListeners(store.dispatch);

  return store;
}
