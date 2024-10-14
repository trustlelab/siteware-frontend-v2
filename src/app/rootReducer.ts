// src/app/rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';
import agentReducer from '../features/slices/agentSlice';
import userProfileReducer from '../features/slices/profileSlice';
import phoneNumberReducer from '../features/slices/phonenumberSlice';
import authReducer from '../features/slices/authSlice'
// Combining all feature reducers here
const rootReducer = combineReducers({
  agent: agentReducer,
  userProfile: userProfileReducer,
  phoneNumber: phoneNumberReducer, // Add the phoneNumber reducer here
  auth:authReducer
  // Add more feature reducers as needed
});

export default rootReducer;
