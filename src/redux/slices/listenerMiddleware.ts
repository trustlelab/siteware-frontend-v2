import { createListenerMiddleware } from '@reduxjs/toolkit';
import { setId, fetchAgentData } from './agent-slice';
import { fetchUserProfile } from './profile-slice';

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  actionCreator: setId,
  effect: async (action, listenerApi) => {
    const id = action.payload;
    // Dispatch fetchAgentData thunk
    listenerApi.dispatch(fetchAgentData(id));
    // Dispatch fetchUserProfile thunk
    listenerApi.dispatch(fetchUserProfile());
  },
});

export default listenerMiddleware;