// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer'; // Import the combined reducer
import listenerMiddleware from '../features/slices/listenerMiddleware';

const store = configureStore({
  reducer: rootReducer, // Use the combined rootReducer
  /**
   *
   */
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(listenerMiddleware.middleware), // Attach middleware
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
