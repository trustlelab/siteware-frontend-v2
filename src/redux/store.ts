import { configureStore } from '@reduxjs/toolkit';
import agentReducer from './slices/agent-slice';
import listenerMiddleware from './slices/listenerMiddleware';

const store = configureStore({
  reducer: {
    agent: agentReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(listenerMiddleware.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
