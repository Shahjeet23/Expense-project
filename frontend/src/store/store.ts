import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import expenseReducer from "../features/expenseslice";

const userPersistConfig = {
  key: "user",
  storage,
};

export const store = configureStore({
  reducer: {
    expense: persistReducer(userPersistConfig, expenseReducer),
  },
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
