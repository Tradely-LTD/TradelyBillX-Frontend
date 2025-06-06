import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { baseApi } from "./baseApi";
import { authSlice, AuthState } from "@/pages/auth/authSlice";
import { StateProps, StateSlice } from "@/pages/waybill/waybill.slice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: [authSlice.name, StateSlice.name],
};

const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  [authSlice.name]: authSlice.reducer,
  [StateSlice.name]: StateSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),
});

export const persistor = persistStore(store);

export type RootState = {
  auth: AuthState;
  state: StateProps;
  [baseApi.reducerPath]: ReturnType<typeof baseApi.reducer>;
};

export type AppDispatch = typeof store.dispatch;
