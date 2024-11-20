import { createListenerMiddleware } from '@reduxjs/toolkit';
import { setId, fetchAgentData } from './agentSlice';
import { fetchUserProfile } from './profileSlice';
import { fetchPhoneNumbers } from './phonenumberSlice';

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  actionCreator: setId,
  /**
   *
   */
  effect: async (action, listenerApi) => {
    const id = action.payload;
    // Dispatch fetchAgentData thunk
    listenerApi.dispatch(fetchAgentData(id));
    // Dispatch fetchUserProfile thunk
    listenerApi.dispatch(fetchUserProfile());
    listenerApi.dispatch(fetchPhoneNumbers());
  },
});

export default listenerMiddleware;
