/* eslint-disable prettier/prettier */
// src/app/rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';
import agentReducer from '../features/slices/agentSlice';
import userProfileReducer from '../features/slices/profileSlice';

// Combining all feature reducers here
const rootReducer = combineReducers({
  agent: agentReducer,
  userProfile: userProfileReducer,
   
  // Add more feature reducers as needed
});

export default rootReducer;
